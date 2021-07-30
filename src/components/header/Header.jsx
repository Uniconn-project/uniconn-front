import React, { useContext } from 'react'
import Link from 'next/link'
import MobileMenu from './components/MobileMenu'
import DesktopMenu from './components/DesktopMenu'
import CircularProgress from '@material-ui/core/CircularProgress'
import NotificationsIcon from '@material-ui/icons/Notifications'
import Badge from '@material-ui/core/Badge'
import { NotificationsContext } from '../../contexts/Notifications'

export default function Header({ page }) {
  const { notificationsNumber } = useContext(NotificationsContext)

  return (
    <header className="fixed z-20 top-0 w-full h-20 flex items-center px-4 py-2 header bg-light shadow-md sm:pl-8 sm:pr-20">
      <div className="sm:hidden">
        <MobileMenu />
      </div>
      <div>
        <Link href="/projects">
          <h2 className="text-3xl cursor-pointer">Uniconn</h2>
        </Link>
      </div>
      <div className="sm:hidden ml-auto mr-2">
        {notificationsNumber !== null ? (
          <Link href="/notifications">
            <Badge
              badgeContent={notificationsNumber}
              className="cursor-pointer"
            >
              <NotificationsIcon />
            </Badge>
          </Link>
        ) : (
          <CircularProgress size={20} />
        )}
      </div>
      <div className="hidden sm:flex sm:ml-32">
        <Link href="/projects">
          <div
            className={`p-3 mr-2 nav-link ${
              page === 'projects' ? 'active' : ''
            }`}
          >
            Projetos
          </div>
        </Link>
        <Link href="/users">
          <div
            className={`p-3 ml-2 nav-link ${page === 'users' ? 'active' : ''}`}
          >
            Usuários
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
        <Link href="/settings">
          <div
            className={`p-3 ml-2 nav-link ${
              page === 'settings' ? 'active' : ''
            }`}
          >
            Configurações
          </div>
        </Link>
      </div>
      <div className="hidden sm:block sm:ml-auto">
        <DesktopMenu />
      </div>
    </header>
  )
}
