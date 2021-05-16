import React, { useState } from 'react'
import Link from 'next/link'
import Drawer from '@material-ui/core/Drawer'
import Badge from '@material-ui/core/Badge'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import NotificationsIcon from '@material-ui/icons/Notifications'
import ListItemText from '@material-ui/core/ListItemText'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import HomeIcon from '@material-ui/icons/Home'
import ProfileIcon from '@material-ui/icons/Person'

export default function Header({ page }) {
  return (
    <header className="px-0 fixed top-0 w-full h-20 flex items-center py-2 header bg-dark sm:px-8">
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
      <div className="ml-auto">
        <Badge badgeContent={5}>
          <NotificationsIcon />
        </Badge>
      </div>
    </header>
  )
}

function MobileMenu() {
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false)

  return (
    <div>
      <Button onClick={() => setMobileMenuIsOpen(!mobileMenuIsOpen)}>
        <MoreVertIcon
          className="text-4xl"
          style={{ color: 'var(--primary-color)' }}
        />
      </Button>
      <Drawer
        anchor="left"
        open={mobileMenuIsOpen}
        onClose={() => setMobileMenuIsOpen(false)}
      >
        <div
          role="presentation"
          onClick={() => setMobileMenuIsOpen(!mobileMenuIsOpen)}
        >
          <List>
            <Link href="/home">
              <ListItem button>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary={'Home'} />
              </ListItem>
            </Link>
            <Link href="/profile">
              <ListItem button>
                <ListItemIcon>
                  <ProfileIcon />
                </ListItemIcon>
                <ListItemText primary={'Perfil'} />
              </ListItem>
            </Link>
          </List>
        </div>
      </Drawer>
    </div>
  )
}
