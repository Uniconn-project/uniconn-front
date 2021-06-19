import React, { useState, useRef } from 'react'
import SettingsIcon from '@material-ui/icons/Settings'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import Popover from '@material-ui/core/Popover'

export default function SettingsPopover() {
  const [isOpen, setIsOpen] = useState(false)

  const anchorRef = useRef(null)

  const handleOpen = e => {
    e.stopPropagation()
    setIsOpen(true)
  }

  const handleClose = e => {
    e.stopPropagation()
    setIsOpen(false)
  }

  const handleRemoveFromProject = async e => {
    e.stopPropagation()
  }

  return (
    <>
      <SettingsIcon
        ref={anchorRef}
        className="icon-sm color-primary-hover"
        onClick={handleOpen}
      />
      <Popover
        open={isOpen}
        anchorEl={anchorRef.current}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        onClose={handleClose}
        disableRestoreFocus
      >
        <ul>
          <li
            className="flex items-center bg-dark bg-hover cursor-pointer rounded-none p-2"
            onClick={handleRemoveFromProject}
          >
            <HighlightOffIcon className="icon-sm mr-2" />
            Remover do projeto
          </li>
        </ul>
      </Popover>
    </>
  )
}
