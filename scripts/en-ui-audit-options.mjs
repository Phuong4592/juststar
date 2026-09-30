function parseViewport(value) {
  const match = /^(\d+)x(\d+)$/.exec(value)
  if (!match) throw new Error(`Invalid viewport "${value}". Use WIDTHxHEIGHT.`)
  return { height: Number(match[2]), width: Number(match[1]) }
}

export function parseAuditArgs(args) {
  const options = {
    output: ".en-ui-audit",
    rootSelector: "main",
    url: "",
    viewports: [],
  }

  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index]
    if (argument === "--output") {
      options.output = args[index + 1] ?? options.output
      index += 1
    } else if (argument === "--root") {
      options.rootSelector = args[index + 1] ?? options.rootSelector
      index += 1
    } else if (argument === "--viewports") {
      options.viewports = (args[index + 1] ?? "").split(",").filter(Boolean).map(parseViewport)
      index += 1
    } else if (!options.url) options.url = argument
    else throw new Error(`Unexpected argument: ${argument}`)
  }

  if (!options.url)
    throw new Error("Usage: en-ui-audit <url> --viewports WIDTHxHEIGHT[,WIDTHxHEIGHT]")
  if (options.viewports.length === 0)
    throw new Error(
      "No viewport matrix supplied. Discover the consumer's supported sizes and pass --viewports.",
    )
  return options
}
