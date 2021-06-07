import React, { useState, useContext } from 'react'
import Link from 'next/link'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import HomeIcon from '@material-ui/icons/Home'
import ProfileIcon from '@material-ui/icons/Person'
import GroupIcon from '@material-ui/icons/Group'
import CircularProgress from '@material-ui/core/CircularProgress'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { MyProfileContext } from '../../../contexts/MyProfile'
import Logout from '../../helpers/Logout'

export default function MobileMenu() {
  const { myProfile } = useContext(MyProfileContext)

  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false)

  if (!myProfile) {
    return <CircularProgress size={30} />
  }

  return (
    <div>
      <img
        src={process.env.NEXT_PUBLIC_API_HOST + myProfile.photo}
        className="profile-img-sm mr-2 cursor-pointer"
        onClick={() => setMobileMenuIsOpen(!mobileMenuIsOpen)}
      />
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
            <Link href="/users">
              <ListItem button>
                <ListItemIcon>
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText primary={'Usuários'} />
              </ListItem>
            </Link>
            <ListItem button>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <Logout>
                <ListItemText primary={'Sair'} />
              </Logout>
            </ListItem>
          </List>
        </div>
      </Drawer>
    </div>
  )
}
