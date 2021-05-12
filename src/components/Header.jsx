import React from 'react'
import Link from 'next/link'

export default function Header({ page }) {
  return (
    <header className="fixed top-0 w-full h-20 flex items-center px-8 py-2 header">
      <div>
        <h1>Uniconn</h1>
      </div>
      <div className="flex ml-32">
        <Link href="/home">
          <div
            className={`p-3 mr-2 nav-link ${page === 'home' ? 'active' : ''}`}
          >
            Home
          </div>
        </Link>
        <Link href="/profile">
          <div
            className={`p-3 ml-2 nav-link ${
              page === 'profile' ? 'active' : ''
            }`}
          >
            Perfil
          </div>
        </Link>
      </div>
    </header>
  )
}
