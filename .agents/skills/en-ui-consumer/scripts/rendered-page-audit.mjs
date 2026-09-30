export async function auditRenderedPage(page, options = {}) {
  return page.evaluate(collectRenderedPageFindings, options)
}

export function observePageIssues(page) {
  const findings = []
  const onConsole = (message) => {
    if (message.type() === "error") {
      findings.push({
        ruleId: "console-error",
        severity: "error",
        message: message.text(),
      })
    }
  }
  const onPageError = (error) => {
    findings.push({ ruleId: "page-error", severity: "error", message: error.message })
  }

  page.on("console", onConsole)
  page.on("pageerror", onPageError)

  return {
    findings,
    stop() {
      page.off("console", onConsole)
      page.off("pageerror", onPageError)
      return [...findings]
    },
  }
}

export function collectRenderedPageFindings(options = {}) {
  const settings = {
    ignoreSelectors: Array.isArray(options.ignoreSelectors) ? options.ignoreSelectors : [],
    minBoundedInset: Number.isFinite(options.minBoundedInset) ? options.minBoundedInset : 8,
    maxFindings: Number.isFinite(options.maxFindings) ? options.maxFindings : 100,
    minLongHeadingWidth: Number.isFinite(options.minLongHeadingWidth)
      ? options.minLongHeadingWidth
      : 280,
    minLongTextWidth: Number.isFinite(options.minLongTextWidth) ? options.minLongTextWidth : 240,
    minTargetSize: Number.isFinite(options.minTargetSize) ? options.minTargetSize : 24,
    overflowTolerance: Number.isFinite(options.overflowTolerance) ? options.overflowTolerance : 1,
    primaryFontFamily:
      typeof options.primaryFontFamily === "string" ? options.primaryFontFamily : "Nunito",
    requiredCssVariables: Array.isArray(options.requiredCssVariables)
      ? options.requiredCssVariables
      : ["--color-surface", "--font-size-body-md", "--space-md"],
    rootSelector: typeof options.rootSelector === "string" ? options.rootSelector : "main",
    technicalFontFamily:
      typeof options.technicalFontFamily === "string" ? options.technicalFontFamily : "Geist Mono",
  }

  let root = null
  try {
    root = document.querySelector(settings.rootSelector)
  } catch {
    root = null
  }
  root ??= document.querySelector("main") ?? document.body

  const findings = []
  const push = (ruleId, severity, element, message, details = {}) => {
    if (findings.length >= settings.maxFindings) return
    findings.push({
      ruleId,
      severity,
      selector: element ? elementPath(element) : undefined,
      message,
      details,
    })
  }
  const ignored = (element) =>
    settings.ignoreSelectors.some((selector) => {
      try {
        return Boolean(element.closest(selector))
      } catch {
        return false
      }
    })
  const visibleRect = (element) => {
    const rect = element.getBoundingClientRect()
    const style = getComputedStyle(element)
    if (
      rect.width <= 0 ||
      rect.height <= 0 ||
      style.display === "none" ||
      style.visibility === "hidden" ||
      style.opacity === "0"
    )
      return null
    return rect
  }
  const hasHorizontalScrollOwner = (element) => {
    let parent = element.parentElement
    while (parent && parent !== document.body) {
      const style = getComputedStyle(parent)
      if (
        ["auto", "scroll"].includes(style.overflowX) &&
        parent.scrollWidth > parent.clientWidth + settings.overflowTolerance
      )
        return true
      parent = parent.parentElement
    }
    return false
  }

  function elementPath(element) {
    if (element.id) return `#${element.id}`
    const testId = element.getAttribute("data-testid")
    if (testId) return `[data-testid="${testId}"]`
    const part = element.getAttribute("data-en-part")
    if (part) return `[data-en-part="${part}"]`

    const parts = []
    let current = element
    while (current && current !== root && parts.length < 4) {
      let partName = current.tagName.toLowerCase()
      const siblings = current.parentElement
        ? [...current.parentElement.children].filter((item) => item.tagName === current.tagName)
        : []
      if (siblings.length > 1) partName += `:nth-of-type(${siblings.indexOf(current) + 1})`
      parts.unshift(partName)
      current = current.parentElement
    }
    return parts.join(" > ") || element.tagName.toLowerCase()
  }

  const documentStyle = getComputedStyle(document.documentElement)
  const missingCssVariables = settings.requiredCssVariables.filter(
    (variable) => !documentStyle.getPropertyValue(variable).trim(),
  )
  if (missingCssVariables.length > 0) {
    push(
      "missing-en-ui-styles",
      "error",
      document.documentElement,
      "Core En UI theme variables are missing; verify that the package stylesheet and theme are loaded.",
      { missingCssVariables },
    )
  }

  const documentWidth = document.documentElement.scrollWidth
  if (documentWidth > window.innerWidth + settings.overflowTolerance) {
    push(
      "page-horizontal-overflow",
      "error",
      document.documentElement,
      "Page is wider than the viewport.",
      {
        documentWidth,
        viewportWidth: window.innerWidth,
      },
    )
  }

  const ids = new Map()
  for (const element of document.querySelectorAll("[id]")) {
    const id = element.id
    if (!id) continue
    const existing = ids.get(id)
    if (existing) {
      push("duplicate-id", "error", element, `Duplicate id "${id}" is rendered.`, {
        first: elementPath(existing),
      })
    } else ids.set(id, element)
  }

  const headings = [...root.querySelectorAll("h1, h2, h3, h4, h5, h6, [role='heading']")]
  const headingLevels = headings.map((heading) => {
    const nativeLevel = heading.tagName.match(/^H([1-6])$/)?.[1]
    return Number(nativeLevel ?? heading.getAttribute("aria-level"))
  })
  const h1Count = headingLevels.filter((level) => level === 1).length
  if (h1Count !== 1) {
    push(
      "page-heading-count",
      "error",
      root,
      `Expected one page-level heading in the audited region, found ${h1Count}.`,
    )
  }
  for (let index = 1; index < headingLevels.length; index += 1) {
    if (headingLevels[index] > headingLevels[index - 1] + 1) {
      push(
        "skipped-heading-level",
        "error",
        headings[index],
        `Heading level jumps from ${headingLevels[index - 1]} to ${headingLevels[index]}.`,
      )
    }
  }

  for (const image of root.querySelectorAll("img")) {
    if (!ignored(image) && image.complete && image.naturalWidth === 0) {
      push("broken-image", "error", image, "Image failed to render.")
    }
  }

  for (const element of [root, ...root.querySelectorAll("*")]) {
    if (ignored(element)) continue
    const rect = visibleRect(element)
    if (!rect || hasHorizontalScrollOwner(element)) continue
    if (
      rect.left < -settings.overflowTolerance ||
      rect.right > window.innerWidth + settings.overflowTolerance
    ) {
      push(
        "element-outside-viewport",
        "warning",
        element,
        "Visible element escapes the viewport.",
        {
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          viewportWidth: window.innerWidth,
        },
      )
    }
  }

  const interactiveSelector =
    "a[href], button, input:not([type='hidden']), select, textarea, [role='button'], [role='link'], [role='checkbox'], [role='radio'], [role='switch'], [tabindex]:not([tabindex='-1'])"
  for (const element of root.querySelectorAll(interactiveSelector)) {
    if (ignored(element) || element.hasAttribute("disabled")) continue
    const rect = visibleRect(element)
    if (!rect) continue

    let width = rect.width
    let height = rect.height
    if (
      element instanceof HTMLInputElement &&
      ["checkbox", "radio"].includes(element.type) &&
      element.labels?.length
    ) {
      for (const label of element.labels) {
        const labelRect = visibleRect(label)
        if (labelRect) {
          width = Math.max(width, labelRect.width)
          height = Math.max(height, labelRect.height)
        }
      }
    }
    const style = getComputedStyle(element)
    const inlineTextLink = element.tagName === "A" && style.display === "inline"
    if (!inlineTextLink && (width < settings.minTargetSize || height < settings.minTargetSize)) {
      push(
        "small-interactive-target",
        "advisory",
        element,
        `Interactive target is smaller than ${settings.minTargetSize}px in one dimension.`,
        { height: Math.round(height), width: Math.round(width) },
      )
    }

    if (
      element.matches("button, [role='button']") &&
      element.scrollHeight > element.clientHeight + settings.overflowTolerance
    ) {
      push(
        "control-label-overflow",
        "error",
        element,
        "A control label wraps or escapes its fixed interactive height.",
        { clientHeight: element.clientHeight, scrollHeight: element.scrollHeight },
      )
    }
  }

  for (const element of root.querySelectorAll("dl > div, [data-en-summary-item]")) {
    if (ignored(element)) continue
    const rect = visibleRect(element)
    if (!rect || !element.textContent?.trim()) continue
    const style = getComputedStyle(element)
    const parentStyle = element.parentElement ? getComputedStyle(element.parentElement) : null
    const borderWidths = [
      style.borderTopWidth,
      style.borderRightWidth,
      style.borderBottomWidth,
      style.borderLeftWidth,
      parentStyle?.borderTopWidth,
      parentStyle?.borderRightWidth,
      parentStyle?.borderBottomWidth,
      parentStyle?.borderLeftWidth,
    ].map((value) => Number.parseFloat(value ?? "0") || 0)
    if (!borderWidths.some((value) => value > 0)) continue
    const paddingLeft = Number.parseFloat(style.paddingLeft) || 0
    const paddingRight = Number.parseFloat(style.paddingRight) || 0
    if (paddingLeft < settings.minBoundedInset || paddingRight < settings.minBoundedInset) {
      push(
        "bounded-summary-inset",
        "warning",
        element,
        `Bordered summary cells need at least ${settings.minBoundedInset}px inline padding.`,
        { paddingLeft, paddingRight },
      )
    }
  }

  const responsiveBoundarySelector = [
    "[data-en-responsive-boundary]",
    "[data-en-part='split-layout-primary']",
    "[data-en-part='split-layout-secondary']",
    "[data-en-part='ai-workspace-conversation']",
    "[data-en-part='ai-workspace-preview']",
  ].join(", ")
  for (const element of root.querySelectorAll(responsiveBoundarySelector)) {
    if (ignored(element)) continue
    const rect = visibleRect(element)
    if (!rect || element.clientWidth <= 0) continue
    if (element.scrollWidth > element.clientWidth + settings.overflowTolerance) {
      push(
        "responsive-region-horizontal-overflow",
        "error",
        element,
        "A nested responsive region is wider than its pane. Reflow inner grids and controls against the region width.",
        { clientWidth: element.clientWidth, scrollWidth: element.scrollWidth },
      )
    }
  }

  const chatRegions = root.matches("[data-en-part='ai-chat-page']")
    ? [root, ...root.querySelectorAll("[data-en-part='ai-chat-page']")]
    : [...root.querySelectorAll("[data-en-part='ai-chat-page']")]
  for (const chatRegion of chatRegions) {
    if (ignored(chatRegion)) continue
    const chatRect = visibleRect(chatRegion)
    const composer = chatRegion.querySelector("[data-en-part='ai-chat-page-composer']")
    const messages = chatRegion.querySelector("[data-en-part='ai-chat-page-messages']")
    if (!chatRect || !composer) continue
    const composerRect = visibleRect(composer)
    if (!composerRect) {
      push(
        "ai-chat-composer-hidden",
        "error",
        composer,
        "The AI chat composer is not visible inside its chat panel.",
      )
      continue
    }

    if (getComputedStyle(composer).position === "fixed") {
      push(
        "ai-chat-composer-global-fixed",
        "error",
        composer,
        "The AI chat composer is fixed to the global viewport instead of its chat panel.",
      )
    }

    const visiblePanelBottom = Math.min(chatRect.bottom, window.innerHeight)
    if (
      composerRect.top < chatRect.top - settings.overflowTolerance ||
      composerRect.bottom > visiblePanelBottom + settings.overflowTolerance
    ) {
      push(
        "ai-chat-composer-outside-panel",
        "error",
        composer,
        "The AI chat composer leaves the visible bounds of its chat panel.",
        {
          composerBottom: Math.round(composerRect.bottom),
          composerTop: Math.round(composerRect.top),
          panelBottom: Math.round(visiblePanelBottom),
          panelTop: Math.round(chatRect.top),
        },
      )
    }

    const messagesViewport = messages?.parentElement
    if (messagesViewport) {
      const messagesViewportRect = visibleRect(messagesViewport)
      const overflowY = getComputedStyle(messagesViewport).overflowY
      if (!["auto", "scroll"].includes(overflowY)) {
        push(
          "ai-chat-message-scroll-owner",
          "error",
          messagesViewport,
          "The AI chat message region must own vertical conversation scrolling.",
          { overflowY },
        )
      }
      if (
        messagesViewportRect &&
        messagesViewportRect.bottom > composerRect.top + settings.overflowTolerance
      ) {
        push(
          "ai-chat-composer-overlaps-messages",
          "error",
          composer,
          "The AI chat composer overlaps the visible message region.",
          {
            composerTop: Math.round(composerRect.top),
            messagesBottom: Math.round(messagesViewportRect.bottom),
          },
        )
      }
    }
  }

  const textSelector =
    "h1, h2, h3, h4, h5, h6, p, li, dt, dd, label, button, a, td, th, [role='heading'], [data-en-text], [data-en-prose], [data-en-typography]"
  for (const element of root.querySelectorAll(textSelector)) {
    if (ignored(element)) continue
    const normalizeText = (value) => value?.replace(/\s+/g, " ").trim() ?? ""
    const text = normalizeText(element.textContent)
    const rect = visibleRect(element)
    if (!rect || text.length === 0 || element.clientWidth <= 0) continue

    const style = getComputedStyle(element)
    const technicalText = Boolean(element.closest("[data-en-font='technical'], code, pre, kbd"))
    const expectedFont = technicalText ? settings.technicalFontFamily : settings.primaryFontFamily
    if (style.fontFamily && !style.fontFamily.includes(expectedFont)) {
      push(
        "unexpected-font-family",
        "error",
        element,
        technicalText
          ? `Technical text must use the approved ${settings.technicalFontFamily} role.`
          : `Interface text must use the approved ${settings.primaryFontFamily} family.`,
        { actual: style.fontFamily, expected: expectedFont },
      )
    }
    const clippedX = element.scrollWidth > element.clientWidth + settings.overflowTolerance
    const clippedY = element.scrollHeight > element.clientHeight + settings.overflowTolerance
    const hiddenX = ["hidden", "clip"].includes(style.overflowX) || style.whiteSpace === "nowrap"
    const hiddenY = ["hidden", "clip"].includes(style.overflowY)
    const fullValue = [element.getAttribute("aria-label"), element.getAttribute("title")]
      .filter(Boolean)
      .some((value) => normalizeText(value) === text)
    const lineClamp = Number.parseInt(style.webkitLineClamp, 10)

    if (clippedX && hiddenX && !fullValue) {
      push(
        "text-horizontal-clipping",
        "warning",
        element,
        "Text is horizontally clipped without a complete accessible value.",
        { clientWidth: element.clientWidth, scrollWidth: element.scrollWidth },
      )
    }
    if (clippedY && hiddenY && !fullValue) {
      push(
        "text-vertical-clipping",
        "warning",
        element,
        "Text is vertically clipped without a complete accessible value.",
        { clientHeight: element.clientHeight, scrollHeight: element.scrollHeight },
      )
    }
    if (lineClamp > 0 && clippedY && !fullValue) {
      push(
        "line-clamp-without-full-value",
        "warning",
        element,
        "Multi-line clamping hides content without a complete accessible value.",
        { lineClamp },
      )
    }

    if (
      element.matches("p, dd, li, [data-en-prose]") &&
      text.length >= 80 &&
      element.clientWidth < settings.minLongTextWidth
    ) {
      push(
        "long-text-narrow-block",
        "advisory",
        element,
        "Long-form text is rendered in an unusually narrow block.",
        { clientWidth: element.clientWidth, textLength: text.length },
      )
    }

    if (element.matches("h1, h2, h3, [role='heading']") && text.length >= 45) {
      const fontSize = Number.parseFloat(style.fontSize) || 16
      const lineHeight = Number.parseFloat(style.lineHeight) || fontSize * 1.2
      const lineCount = Math.max(1, Math.round(rect.height / lineHeight))
      if (lineCount >= 3 && element.clientWidth < settings.minLongHeadingWidth) {
        push(
          "long-heading-narrow-block",
          "advisory",
          element,
          "A long heading wraps into several lines because its block is narrow.",
          { clientWidth: element.clientWidth, lineCount, textLength: text.length },
        )
      }
    }

    const unbreakable = text.split(/\s+/).find((token) => token.length >= 32)
    if (
      unbreakable &&
      clippedX &&
      !["anywhere", "break-word"].includes(style.overflowWrap) &&
      !["break-all", "break-word"].includes(style.wordBreak)
    ) {
      push(
        "unbreakable-content",
        "warning",
        element,
        "Long unbreakable content contributes to horizontal overflow.",
        { tokenLength: unbreakable.length },
      )
    }

    if (clippedX && element.parentElement) {
      const parentDisplay = getComputedStyle(element.parentElement).display
      if (
        (parentDisplay.includes("flex") || parentDisplay.includes("grid")) &&
        style.minWidth !== "0px"
      ) {
        push(
          "text-container-min-width",
          "advisory",
          element,
          "Overflowing text is inside flex or grid without an explicit zero minimum width.",
          { minWidth: style.minWidth, parentDisplay },
        )
      }
    }
  }

  const summary = findings.reduce(
    (result, finding) => {
      result[finding.severity] += 1
      result.total += 1
      return result
    },
    { advisory: 0, error: 0, total: 0, warning: 0 },
  )

  return {
    findings,
    rootSelector: elementPath(root),
    summary,
    url: window.location.href,
    viewport: { height: window.innerHeight, width: window.innerWidth },
  }
}
