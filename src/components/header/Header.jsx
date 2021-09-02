import React, { useContext, useState, useEffect } from 'react'
import Link from 'next/link'
import MobileMenu from './components/MobileMenu'
import DesktopMenu from './components/DesktopMenu'
import CircularProgress from '@material-ui/core/CircularProgress'
import NotificationsIcon from '@material-ui/icons/Notifications'
import Badge from '@material-ui/core/Badge'
import { NotificationsContext } from '../../contexts/Notifications'
import { WebSocketsContext } from '../../contexts/WebSockets'
import { AuthContext } from '../../contexts/Auth'

export default function Header({ page }) {
  const { notificationsNumber } = useContext(NotificationsContext)
  const { socketEvent } = useContext(WebSocketsContext)
  const { getToken } = useContext(AuthContext)

  const [unvisualizedMessagesNumber, setUnvisualizedMessagesNumber] = useState(
    0
  )

  useEffect(() => {
    fetchUnvisualizedMessagesNumber()
  }, []) // eslint-disable-line

  useEffect(() => {
    if (
      socketEvent.type === 'message' ||
      socketEvent.type === 'message-visualization'
    ) {
      fetchUnvisualizedMessagesNumber()
    }
  }, [socketEvent]) // eslint-disable-line

  const fetchUnvisualizedMessagesNumber = async () => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/chats/get-unvisualized-messages-number`,
      {
        headers: {
          'Content-type': 'application/json',
          Authorization: 'JWT ' + (await getToken())
        }
      }
    ).then(response =>
      response.json().then(data => {
        if (response.ok) {
          setUnvisualizedMessagesNumber(data)
        }
      })
    )
  }

  return (
    <header className="fixed z-20 top-0 w-full h-20 flex items-center px-4 pt-2 header bg-light shadow-md sm:pl-8 sm:pr-20">
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
      <nav className="hidden sm:flex sm:ml-10 lg:ml-32">
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
        <Link href="/messages">
          <div
            className={`relative p-3 ml-2 nav-link ${
              page === 'messages' ? 'active' : ''
            }`}
          >
            Mensagens{' '}
            {unvisualizedMessagesNumber > 0 && (
              <b className="absolute right-0 top-0 w-5 h-5 flex justify-center items-center rounded-3xl text-md bg-primary color-headline">
                {unvisualizedMessagesNumber}
              </b>
            )}
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
      </nav>
      <div className="hidden sm:block sm:ml-auto">
        <DesktopMenu />
      </div>
    </header>
  )
}
