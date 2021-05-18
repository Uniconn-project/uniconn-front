import React from 'react'
import Link from 'next/link'
import MobileMenu from './components/MobileMenu'
import DesktopMenu from './components/DesktopMenu'

export default function Header({ page }) {
  return (
    <header className="px-4 fixed z-10 top-0 w-full h-20 flex items-center py-2 header bg-light sm:pl-8 pr-20">
      <div className="sm:hidden">
        <MobileMenu />
      </div>
      <div>
        <Link href="/home">
          <h1 className="cursor-pointer">Uniconn</h1>
        </Link>
      </div>
      <div className="hidden sm:flex sm:ml-32">
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
      <div className="hidden sm:block sm:ml-auto">
        <DesktopMenu />
      </div>
    </header>
  )
}
