import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.tsx"
// import "./plugins/global-styles/index.ts"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
