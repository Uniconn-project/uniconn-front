import React, { useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import ProjectListItem from './ProjectListItem'
import StarsProfilesModal from './StarsProfilesModal'

export default function ProjectList({ projects }) {
  const [starsModal, setStarsModal] = useState({
    isOpen: false,
    profiles: []
  })
  const [errorMsg, setErrorMsg] = useState({
    isOpen: false,
    message: ''
  })

  if (!projects) {
    return <CircularProgress />
  }

  return (
    <>
      {projects.map(project => (
        <ProjectListItem
          key={project.id}
          project={project}
          setStarsModal={setStarsModal}
          setErrorMsg={setErrorMsg}
        />
      ))}
      <StarsProfilesModal
        useIsOpen={() => [
          starsModal.isOpen,
          isOpen => setStarsModal({ ...starsModal, isOpen })
        ]}
        profiles={starsModal.profiles}
      />
      <Snackbar
        open={errorMsg.isOpen}
        autoHideDuration={6000}
        onClose={() =>
          setErrorMsg({
            isOpen: false,
            message: ''
          })
        }
      >
        <Alert severity="error">{errorMsg.message}</Alert>
      </Snackbar>
    </>
  )
}
