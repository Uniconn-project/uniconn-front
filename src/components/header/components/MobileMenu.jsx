import React, { useState, useContext } from 'react'
import Link from 'next/link'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import CollectionsBookmarkOutlinedIcon from '@material-ui/icons/CollectionsBookmarkOutlined'
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined'
import GroupOutlinedIcon from '@material-ui/icons/GroupOutlined'
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined'
import ChatIcon from '@material-ui/icons/Chat'
import CircularProgress from '@material-ui/core/CircularProgress'
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined'
import { MyProfileContext } from '../../../contexts/MyProfile'
import Logout from '../../helpers/Logout'
import Image from 'next/image'

export default function MobileMenu() {
  const { myProfile } = useContext(MyProfileContext)

  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false)

  if (!myProfile.id) {
    return <CircularProgress size={20} />
  }

  return (
    <div>
      <div className="profile-img-xs mr-2 cursor-pointer">
        <Image
          src={myProfile.photo}
          layout="fill"
          onClick={() => setMobileMenuIsOpen(!mobileMenuIsOpen)}
        />
      </div>
      <Drawer
        anchor="left"
        open={mobileMenuIsOpen}
        onClose={() => setMobileMenuIsOpen(false)}
      >
        <nav
          role="presentation"
          onClick={() => setMobileMenuIsOpen(!mobileMenuIsOpen)}
        >
          <List>
            <Link href="/projects">
              <ListItem button>
                <ListItemIcon className="mr-2">
                  <CollectionsBookmarkOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary={'Projetos'} />
              </ListItem>
            </Link>
            <Link href="/users">
              <ListItem button>
                <ListItemIcon className="mr-2">
                  <GroupOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary={'Usuários'} />
              </ListItem>
            </Link>
            <Link href="/messages">
              <ListItem button>
                <ListItemIcon className="mr-2">
                  <ChatIcon />
                </ListItemIcon>
                <ListItemText primary={'Mensagens'} />
              </ListItem>
            </Link>
            <Link href="/profile">
              <ListItem button>
                <ListItemIcon className="mr-2">
                  <PersonOutlineOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary={'Perfil'} />
              </ListItem>
            </Link>
            <Link href="/settings">
              <ListItem button>
                <ListItemIcon className="mr-2">
                  <SettingsOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary={'Configurações'} />
              </ListItem>
            </Link>
            <Logout>
              <ListItem button>
                <ListItemIcon className="mr-2">
                  <ExitToAppOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary={'Sair'} />
              </ListItem>
            </Logout>
          </List>
        </nav>
      </Drawer>
    </div>
  )
}
