import React, { useState, useContext } from 'react'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'
import { AuthContext } from '../../../../../../contexts/Auth'

export default function AddLinkModal({ project, refetchProject, children }) {
  const postDataInitialState = {
    name: '',
    href: '',
    is_public: false
  }

  const { getToken } = useContext(AuthContext)

  const [isOpen, setIsOpen] = useState(false)
  const [postData, setPostData] = useState(postDataInitialState)
  const [errorMsg, setErrorMsg] = useState({
    isOpen: false,
    message: ''
  })

  const handleChange = key => e => {
    setPostData({ ...postData, [key]: e.target.value })
  }

  const handleClose = () => {
    setPostData(postDataInitialState)
    setIsOpen(false)
  }

  const handleSubmit = async () => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/projects/create-link/${project.id}`,
      {
        method: 'POST',
        headers: {
          Authorization: 'JWT ' + (await getToken()),
          'Content-type': 'application/json'
        },
        body: JSON.stringify(postData)
      }
    )
      .then(response => response.json())
      .then(data => {
        setIsOpen(false)
        if (data === 'success') {
          refetchProject('add-link')
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
        className="p-2 pl-4 mb-4 cursor-pointer bg-transparent bg-hover rounded-md shadow-lg"
        onClick={() => setIsOpen(true)}
      >
        {children}
      </div>
      <Modal
        className="flex justify-center items-center"
        open={isOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={isOpen}>
          <div className="bg-dark rounded-md shadow-lg">
            <div className="flex justify-center items-center p-2 b-bottom-transparent">
              <h5>Adicionar Link</h5>
            </div>
            <div className="p-4 pt-0 b-bottom-transparent">
              <TextField
                label="Nome"
                className="w-full"
                value={postData.name}
                inputProps={{ maxLength: 100 }}
                onChange={handleChange('name')}
              />
              <TextField
                label="Href"
                className="w-full"
                value={postData.href}
                inputProps={{ maxLength: 1000 }}
                onChange={handleChange('href')}
              />
            </div>
            <div className="flex justify-end items-center p-2">
              <button className="btn-primary" onClick={handleSubmit}>
                Confirmar
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
