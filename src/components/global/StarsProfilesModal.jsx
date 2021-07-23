import React from 'react'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import ProfileListItem from './ProfileListItem'

export default function StarsProfilesModal({ useIsOpen, profiles }) {
  const [isOpen, setIsOpen] = useIsOpen()

  return (
    <Modal
      className="flex justify-center items-center"
      open={isOpen}
      onClose={() => setIsOpen(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={isOpen}>
        <div className="w-full max-w-screen-sm bg-dark rounded-md shadow-lg p-4">
          <h3 className="flex items-center">Curtidas ({profiles.length})</h3>
          {profiles.map(profile => (
            <ProfileListItem key={profile.id} profile={profile} />
          ))}
        </div>
      </Fade>
    </Modal>
  )
}
