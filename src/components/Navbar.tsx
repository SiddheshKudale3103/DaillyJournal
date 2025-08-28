import React from "react"

export default function Navbar() {
  return (
    <div className="glass sticky top-0 z-20 mx-4 mt-4 mb-6 px-4 py-3 flex items-center justify-between">
      <div className="text-xl font-semibold tracking-wide">
        <span className="text-neon-pink">Futuristic</span> <span className="text-neon-blue">Journal</span> 🌀
      </div>
      <div className="text-sm opacity-80">
        Built with React + Three.js
      </div>
    </div>
  )
}
