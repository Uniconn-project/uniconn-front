import React, { useState, useContext } from 'react'
import PeopleIcon from '@material-ui/icons/People'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import TextField from '@material-ui/core/TextField'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import { AuthContext } from '../../../../../../contexts/Auth'

export default function AskToJoinProjectModal({
  type,
  project,
  refetchProject
}) {
  const { getToken } = useContext(AuthContext)

  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [errorMsg, setErrorMsg] = useState({
    isOpen: false,
    message: ''
  })

  const handleSubmit = async () => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/projects/ask-to-join-project/${project.id}`,
      {
        method: 'POST',
        headers: {
          Authorization: 'JWT ' + (await getToken()),
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          message: message
        })
      }
    )
      .then(response => response.json())
      .then(data => {
        setIsOpen(false)
        if (data === 'success') {
          refetchProject('ask-to-join-project')
        } else {
          setErrorMsg({
            isOpen: true,
            message: data
          })
        }
      })
  }

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
          <div className="bg-dark rounded-md shadow-lg">
            <div className="w-full px-4 py-2">
              <TextField
                label="Mensagem"
                helperText="Breve texto dizendo o motivo de querer entrar no projeto"
                className="w-full"
                value={message}
                multiline
                onChange={e => setMessage(e.target.value)}
              />
            </div>
            <div className="w-full flex justify-end px-4 py-2">
              <button className="btn-primary" onClick={handleSubmit}>
                Enviar
              </button>
            </div>
          </div>
        </Fade>
      </Modal>
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
