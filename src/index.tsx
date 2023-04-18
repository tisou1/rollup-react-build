import React from "react"
import { createRoot } from "react-dom/client"
import "index.css"

export default function App() {
  return <div>hello word</div>
}
console.log("....ddd")
const root = createRoot(document.querySelector("#root")!)
root.render(<App />)
