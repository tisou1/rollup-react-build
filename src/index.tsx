import React from "react"
import { createRoot } from "react-dom/client"

export default function App() {
  return <div>ccccs</div>
}

const root = createRoot(document.querySelector("#root")!)
root.render(<App />)
