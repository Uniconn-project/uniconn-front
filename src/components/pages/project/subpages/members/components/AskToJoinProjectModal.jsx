import React, { useState } from 'react'
import PeopleIcon from '@material-ui/icons/People'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'

export default function AskToJoinProjectModal({
  type,
  project,
  refetchProject
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div
        className="w-full flex items-center p-2 pl-4 cursor-pointer bg-transparent bg-hover rounded-md shadow-lg"
        onClick={() => setIsOpen(true)}
      >
        {type === 'student' ? (
          <>
            <PeopleIcon className="color-primary mr-2" />
            <strong className="color-primary">Quero colaborar</strong>
          </>
        ) : (
          <>
            <PeopleIcon className="color-secondary mr-2" />
            <strong className="color-secondary">Quero colaborar</strong>
          </>
        )}
      </div>
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
          <div>..................</div>
        </Fade>
      </Modal>
    </>
  )
}
