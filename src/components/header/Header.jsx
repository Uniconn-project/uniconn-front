import React, { useEffect, useState, useContext } from 'react'
import Link from 'next/link'
import MobileMenu from './components/MobileMenu'
import DesktopMenu from './components/DesktopMenu'

import { AuthContext } from '../../contexts/Auth'
import { fetcher } from '../../hooks/useFetch'

export default function Header({ page }) {
  const { getToken } = useContext(AuthContext)

  const [notificationsNumber, setNotificationsNumber] = useState(null)

  useEffect(() => {
    fetchNotificationsNumber()

    const interval = setInterval(fetchNotificationsNumber, 10000)

    return () => clearInterval(interval)
  }, []) //eslint-disable-line

  const fetchNotificationsNumber = async () => {
    const number = await fetcher('profiles/get-notifications-number', {
      Authorization: 'JWT ' + (await getToken())
    })

    setNotificationsNumber(number)
  }

  return (
    <header className="px-4 fixed z-10 top-0 w-full h-20 flex items-center py-2 header bg-light sm:pl-8 pr-20">
      <div className="sm:hidden">
        <MobileMenu notificationsNumber={notificationsNumber} />
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
        <Link href="/users">
          <div
            className={`p-3 ml-2 nav-link ${page === 'users' ? 'active' : ''}`}
          >
            Usuários
          </div>
        </Link>
      </div>
      <div className="hidden sm:block sm:ml-auto">
        <DesktopMenu notificationsNumber={notificationsNumber} />
      </div>
    </header>
  )
}
