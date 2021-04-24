import React, { useContext } from 'react'
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
  }
}))

export default function PrimarySearchAppBar() {
  const { myProfile } = useContext(MyProfileContext)

  const [anchorEl, setAnchorEl] = React.useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)

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

  const menuId = 'primary-search-account-menu'
  const menu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Link href="/profile">Perfil</Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Logout />
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
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notificações</p>
      </MenuItem>
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
            <div className="ml-auto">
              <IconButton
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={17} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
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
              aria-controls={menuId}
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
      {menu}
    </div>
  )
}
