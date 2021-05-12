import React from 'react'

export default function Header({ page }) {
  return (
    <div className="w-full h-20 flex items-center px-8 py-2 mb-10">
      <div>
        <h1>Uniconn</h1>
      </div>
      <div className="flex ml-32">
        <div
          className="p-3"
          style={{ borderBottom: '2px solid var(--primary-color)' }}
        >
          Home
        </div>
        <div className="p-3 ml-4">Perfil</div>
      </div>
    </div>
  )
}
