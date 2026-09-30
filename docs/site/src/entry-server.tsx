import { renderToString } from "react-dom/server"

import { ContractCanvasPage } from "./contract-canvas"
import { DesignLanguagePage } from "./design-language"
import { DocsPage } from "./docs"
import { LandingPage } from "./landing"

export function render(pathname: string) {
  if (pathname.startsWith("/canvas")) return renderToString(<ContractCanvasPage />)
  if (pathname.startsWith("/design")) return renderToString(<DesignLanguagePage />)
  if (pathname.startsWith("/docs")) return renderToString(<DocsPage />)
  return renderToString(<LandingPage />)
}
