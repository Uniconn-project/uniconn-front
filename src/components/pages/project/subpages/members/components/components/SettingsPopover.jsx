import React, { useState, useRef, useContext } from 'react'
import SettingsIcon from '@material-ui/icons/Settings'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import Popover from '@material-ui/core/Popover'
import { AuthContext } from '../../../../../../../contexts/Auth'

export default function SettingsPopover({
  profile,
  project,
  refetchProject,
  setErrorMsg
}) {
  const { getToken } = useContext(AuthContext)

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

    if (window.confirm(`Remover ${profile.first_name} do projeto?`)) {
      fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/api/projects/remove-${profile.type}-from-project/${project.id}`,
        {
          method: 'PUT',
          headers: {
            Authorization: 'JWT ' + (await getToken()),
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            username: profile.user.username
          })
        }
      )
        .then(response => response.json())
        .then(data => {
          if (data === 'success') {
            refetchProject('remove-user')
          } else {
            setIsOpen(false)
            setErrorMsg({
              isOpen: true,
              message: data
            })
          }
        })
    }
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
