import React, { useState } from 'react'
import Link from 'next/link'
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import HomeIcon from '@material-ui/icons/Home'
import ProfileIcon from '@material-ui/icons/Person'

export default function MobileMenu() {
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
