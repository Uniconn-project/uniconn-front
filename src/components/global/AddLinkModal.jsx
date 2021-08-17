import React, { useState, useContext } from 'react'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import TextField from '@material-ui/core/TextField'
import { AuthContext } from '../../contexts/Auth'

export default function AddLinkModal({
  project = null,
  className = '',
  successCallback,
  setErrorMsg,
  children
}) {
  const postDataInitialState = {
    name: '',
    href: ''
  }

  const { getToken } = useContext(AuthContext)

  const [isOpen, setIsOpen] = useState(false)
  const [postData, setPostData] = useState(postDataInitialState)

  const handleChange = key => e => {
    setPostData({ ...postData, [key]: e.target.value })
  }

  const handleClose = () => {
    setPostData(postDataInitialState)
    setIsOpen(false)
  }

  const handleSubmit = async () => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/${
        project ? 'projects' : 'profiles'
      }/create-link${project ? `/${project.id}` : ''}`,
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
          successCallback && successCallback()
          setPostData(postDataInitialState)
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
      <div className={className} onClick={() => setIsOpen(true)}>
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
                label="URL"
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
    </>
  )
}
