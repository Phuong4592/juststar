import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
  Typography,
  buttonVariants,
} from "@enosta/en-ui"
import { useEffect, useSyncExternalStore } from "react"

import { packageVersion } from "./catalog"

type SiteTheme =
  | "default"
  | "default-dark"
  | "neobrutalism"
  | "glassmorphism"
  | "neumorphism"
  | "bauhaus"
  | "terminal"
  | "editorial"
  | "pop"
  | "high-contrast"

interface SiteShellProps {
  active?: "canvas" | "design" | "docs"
  children: React.ReactNode
  depth?: "root" | "nested"
}

const siteThemes: ReadonlyArray<{ label: string; value: SiteTheme }> = [
  { label: "Default light", value: "default" },
  { label: "Default dark", value: "default-dark" },
  { label: "Neobrutalism", value: "neobrutalism" },
  { label: "Glassmorphism", value: "glassmorphism" },
  { label: "Neumorphism", value: "neumorphism" },
  { label: "Bauhaus", value: "bauhaus" },
  { label: "Terminal", value: "terminal" },
  { label: "Editorial", value: "editorial" },
  { label: "Pop", value: "pop" },
  { label: "High contrast", value: "high-contrast" },
]

const siteThemeValues = new Set<SiteTheme>(siteThemes.map(({ value }) => value))
const siteThemeStorageKey = "en-ui-site-theme"
const siteThemeChangeEvent = "en-ui-site-theme-change"

function isSiteTheme(value: string | null): value is SiteTheme {
  return Boolean(value && siteThemeValues.has(value as SiteTheme))
}

function isDarkTheme(theme: SiteTheme) {
  return theme === "default-dark" || theme === "terminal" || theme === "high-contrast"
}

function getStoredTheme(): SiteTheme {
  try {
    const storedTheme = window.localStorage.getItem(siteThemeStorageKey)
    return isSiteTheme(storedTheme) ? storedTheme : "default"
  } catch {
    return "default"
  }
}

function subscribeToTheme(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange)
  window.addEventListener(siteThemeChangeEvent, onStoreChange)

  return () => {
    window.removeEventListener("storage", onStoreChange)
    window.removeEventListener(siteThemeChangeEvent, onStoreChange)
  }
}

function persistTheme(theme: SiteTheme) {
  try {
    window.localStorage.setItem(siteThemeStorageKey, theme)
  } catch {
    // The active theme still works when storage is unavailable.
  }

  window.dispatchEvent(new Event(siteThemeChangeEvent))
}

function Arrow({ external = false }: { external?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16">
      <path d={external ? "M5 3h8v8M13 3 4 12" : "M3 8h10M9 4l4 4-4 4"} />
    </svg>
  )
}

function EnostaLogo() {
  return (
    <svg aria-hidden="true" width="28" height="28" viewBox="35.75 4.30 21 21" fill="none">
      <path
        d="M46.1193 6.30151C41.4975 6.30151 37.75 10.049 37.75 14.6708C37.75 15.203 37.7992 15.7195 37.8953 16.2248H41.7994C41.6339 15.7329 41.5445 15.2052 41.5445 14.6529C41.5445 12.0212 43.5926 9.88804 46.1193 9.88804C48.646 9.88804 50.6919 12.0212 50.6919 14.6529C50.6919 17.2847 48.6437 19.4156 46.1193 19.4156C45.5737 19.4156 45.0505 19.3172 44.5653 19.1338V22.8925C45.0684 22.9887 45.5894 23.0379 46.1193 23.0379C50.7411 23.0379 54.4864 19.2926 54.4864 14.6708C54.4864 10.049 50.7411 6.30151 46.1193 6.30151Z"
        fill="currentColor"
      />
      <path
        d="M37.752 17.4144V20.7795V20.7997H40.0081V23.0379V23.0558H43.3911V23.0379V17.4144V17.3965H37.752V17.4144Z"
        fill="currentColor"
      />
    </svg>
  )
}

function ThemeSelect({
  theme,
  onThemeChange,
}: {
  theme: SiteTheme
  onThemeChange: (theme: SiteTheme) => void
}) {
  return (
    <label className="site-theme-field">
      <Typography.Caption as="span">Theme</Typography.Caption>
      <Select
        aria-label="Site theme"
        items={siteThemes}
        onValueChange={(value) => {
          if (isSiteTheme(value)) onThemeChange(value)
        }}
        value={theme}
      >
        <SelectTrigger aria-label="Site theme" size="sm">
          <SelectValue />
        </SelectTrigger>
        <SelectPopup alignItemWithTrigger={false}>
          {siteThemes.map(({ label, value }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectPopup>
      </Select>
    </label>
  )
}

export function SiteShell({ active, children, depth = "root" }: SiteShellProps) {
  const prefix = depth === "nested" ? "../" : "./"
  const getStartedHref = active === "docs" ? "#installation" : `${prefix}docs/#installation`
  const theme = useSyncExternalStore<SiteTheme>(subscribeToTheme, getStoredTheme, () => "default")

  useEffect(() => {
    const root = document.documentElement
    root.dataset.theme = theme
    root.dataset.mode = isDarkTheme(theme) ? "dark" : "light"
    root.style.colorScheme = root.dataset.mode
  }, [theme])

  return (
    <div className="site-root" data-theme={theme}>
      <header className="site-header">
        <div className="site-header-inner">
          <a className="site-brand" href={prefix} aria-label="En UI home">
            <span className="site-brand-mark">
              <EnostaLogo />
            </span>
            <Typography.Label as="span" className="site-brand-name">
              UI
            </Typography.Label>
            <Typography.Caption as="span" className="site-brand-version">
              {packageVersion}
            </Typography.Caption>
          </a>
          <nav className="site-nav" aria-label="Primary navigation">
            <a aria-current={active === "docs" ? "page" : undefined} href={`${prefix}docs/`}>
              <Typography.Label as="span">Documentation</Typography.Label>
            </a>
            <a aria-current={active === "design" ? "page" : undefined} href={`${prefix}design/`}>
              <Typography.Label as="span">Design language</Typography.Label>
            </a>
            <a aria-current={active === "canvas" ? "page" : undefined} href={`${prefix}canvas/`}>
              <Typography.Label as="span">Contract canvas</Typography.Label>
            </a>
            <a href={`${prefix}storybook/`}>
              <Typography.Label as="span">Components</Typography.Label>
            </a>
            <a href="https://github.com/Enosta/en-ui">
              <Typography.Label as="span">Source</Typography.Label>
            </a>
          </nav>
          <div className="site-header-actions">
            <ThemeSelect onThemeChange={persistTheme} theme={theme} />
            <a
              className={`${buttonVariants({ size: "sm" })} site-button-link site-header-cta`}
              href={getStartedHref}
            >
              Get started <Arrow />
            </a>
          </div>
        </div>
      </header>
      {children}
      <footer className="site-footer site-shell">
        <a className="site-brand" href={prefix} aria-label="En UI home">
          <span className="site-brand-mark">
            <EnostaLogo />
          </span>
          <Typography.Label as="span" className="site-brand-name">
            UI
          </Typography.Label>
        </a>
        <Typography.Small>Contract-first React UI for Enosta product teams.</Typography.Small>
        <div className="site-footer-links">
          <a href={`${prefix}docs/`}>
            <Typography.Caption as="span">Docs</Typography.Caption>
          </a>
          <a href={`${prefix}design/`}>
            <Typography.Caption as="span">Design language</Typography.Caption>
          </a>
          <a href={`${prefix}canvas/`}>
            <Typography.Caption as="span">Contract canvas</Typography.Caption>
          </a>
          <a href={`${prefix}storybook/`}>
            <Typography.Caption as="span">Storybook</Typography.Caption>
          </a>
          <a href="https://github.com/Enosta/en-ui">
            <Typography.Caption as="span">Source</Typography.Caption>
          </a>
        </div>
      </footer>
    </div>
  )
}

export { Arrow }
