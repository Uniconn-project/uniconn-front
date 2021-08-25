import React, { useState, useContext, useRef } from 'react'
import Link from 'next/link'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import Badge from '@material-ui/core/Badge'
import NotificationsIcon from '@material-ui/icons/Notifications'
import CircularProgress from '@material-ui/core/CircularProgress'
import { MyProfileContext } from '../../../contexts/MyProfile'
import { NotificationsContext } from '../../../contexts/Notifications'
import Logout from '../../helpers/Logout'
import Image from 'next/image'

export default function DesktopMenu() {
  const { myProfile } = useContext(MyProfileContext)
  const { notificationsNumber } = useContext(NotificationsContext)

  const [isOpen, setIsOpen] = useState(false)

  const anchorRef = useRef(null)

  return (
    <div className="flex">
      {myProfile.id !== null && (
        <div ref={anchorRef} className="profile-img-xs mr-2 cursor-pointer">
          <Image
            src={myProfile.photo}
            layout="fill"
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>
      )}
      {notificationsNumber !== null ? (
        <Link href="/notifications">
          <Badge
            badgeContent={notificationsNumber}
            className="cursor-pointer color-paragraph color-hover"
          >
            <NotificationsIcon />
          </Badge>
        </Link>
      ) : (
        <CircularProgress size={25} />
      )}
      <Popper
        open={isOpen}
        anchorEl={anchorRef.current}
        className="z-20"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom'
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={() => setIsOpen(false)}>
                <MenuList>
                  <MenuItem
                    style={{ padding: '0' }}
                    onClick={() => setIsOpen(false)}
                  >
                    <Logout className="px-4 py-1.5" />
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  )
}
