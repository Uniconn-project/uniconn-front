import React, { useContext, useState } from 'react'
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import HomeIcon from '@material-ui/icons/Home'
import NotificationsIcon from '@material-ui/icons/Notifications'
import SettingsIcon from '@material-ui/icons/Settings'
import MenuIcon from '@material-ui/icons/Menu'
import Logout from './helpers/Logout'
import { MyProfileContext } from '../contexts/MyProfile'

const useStyles = makeStyles(theme => ({
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    },
    cursor: 'pointer'
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  activeMenuItem: {
    fontWeight: 'bold'
  }
}))

export default function Header({ page }) {
  const { myProfile } = useContext(MyProfileContext)

  const [anchorEl, setAnchorEl] = useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null)

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const classes = useStyles()

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const profileImg = (
    <img
      style={{ borderRadius: '50%', width: '40px' }}
      src={`${process.env.NEXT_PUBLIC_API_HOST}${myProfile.photo}`}
    />
  )

  const profileMenuId = 'primary-search-account-menu'
  const profileMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={profileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Link href="/profile">
        <MenuItem onClick={handleMenuClose}>Perfil</MenuItem>
      </Link>
      <MenuItem onClick={handleMenuClose}>
        <Logout className="w-full h-full" />
      </MenuItem>
    </Menu>
  )

  const mobileMenuId = 'primary-search-account-menu-mobile'
  const mobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <Link href="/home">
        <MenuItem>
          <IconButton aria-label="show 11 new notifications" color="inherit">
            <HomeIcon />
          </IconButton>
          <p>Home</p>
        </MenuItem>
      </Link>
      <Link href="/notifications">
        <MenuItem>
          <IconButton aria-label="show 11 new notifications" color="inherit">
            <Badge badgeContent={11} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notificações</p>
        </MenuItem>
      </Link>
      <Link href="/settings">
        <MenuItem>
          <IconButton aria-label="show 11 new notifications" color="inherit">
            <SettingsIcon />
          </IconButton>
          <p>Configurações</p>
        </MenuItem>
      </Link>
    </Menu>
  )

  return (
    <div className="w-full">
      <AppBar position="static">
        <Toolbar>
          <div className={`${classes.sectionDesktop} w-full items-center`}>
            <Link href="/home">
              <h1 className={`${classes.title} cursor-pointer`}>Uniconn</h1>
            </Link>
            <div className="flex items-center ml-12">
              <Link href="/home">
                <div className="mx-4 cursor-pointer">
                  <h3
                    className={`font-medium ${
                      page === 'home' ? classes.activeMenuItem : ''
                    }`}
                  >
                    Home
                  </h3>
                </div>
              </Link>
              <Link href="/profile">
                <div className="mx-4 cursor-pointer">
                  <h3
                    className={`font-medium ${
                      page === 'profile' ? classes.activeMenuItem : ''
                    }`}
                  >
                    Perfil
                  </h3>
                </div>
              </Link>
              <Link href="/settings">
                <div className="mx-4 cursor-pointer">
                  <h3
                    className={`font-medium ${
                      page === 'settings' ? classes.activeMenuItem : ''
                    }`}
                  >
                    Configurações
                  </h3>
                </div>
              </Link>
            </div>
            <div className="ml-auto">
              <Link href="/notifications">
                <IconButton
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
                  <Badge badgeContent={17} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Link>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={profileMenuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                {profileImg}
              </IconButton>
            </div>
          </div>
          <div className={`${classes.sectionMobile} w-full items-center`}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Link href="/home">
              <h1 className={`${classes.title} cursor-pointer`}>Uniconn</h1>
            </Link>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={profileMenuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              style={{ marginLeft: 'auto' }}
            >
              {profileImg}
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {mobileMenu}
      {profileMenu}
    </div>
  )
}
