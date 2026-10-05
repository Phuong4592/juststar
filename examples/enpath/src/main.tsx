import { ToastProvider, TooltipProvider } from "@enosta/en-ui"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import { AppShell } from "./app-shell"
import { MyCareerPage } from "./my-career/my-career-page"

import "./app.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TooltipProvider>
      <ToastProvider position="bottom-right">
        <AppShell>
          <MyCareerPage />
        </AppShell>
      </ToastProvider>
    </TooltipProvider>
  </StrictMode>,
)
