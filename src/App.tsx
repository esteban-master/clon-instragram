import React from 'react'
import icon from '/favicon.svg'
function App() {
  return (
    <div className="bg-white container mx-auto my-5">
      <img src={icon} className="h-14" alt="Icono vite" />
      <h1 className="text-3xl my-4">Template react with vite</h1>

      <ul>
        <li className="text-lg text-purple-600 font-semibold">
          Jest - Testing Library
        </li>
        <li className="text-lg text-purple-600 font-semibold">
          Mock Service Worker
        </li>
        <li className="text-lg text-purple-600 font-semibold">Typescript</li>
        <li className="text-lg text-purple-600 font-semibold">TailwindCSS</li>
      </ul>
    </div>
  )
}

export default App
