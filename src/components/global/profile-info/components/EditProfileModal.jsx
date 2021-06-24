import React, { useState, useContext } from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import EditIcon from '@material-ui/icons/Edit'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import SchoolIcon from '@material-ui/icons/School'
import AssignmentIcon from '@material-ui/icons/Assignment'
import TextField from '@material-ui/core/TextField'
import AddAPhotoOutlinedIcon from '@material-ui/icons/AddAPhotoOutlined'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import { AuthContext } from '../../../../contexts/Auth'
import { MyProfileContext } from '../../../../contexts/MyProfile'

export default function EditProfileModal({ profile }) {
  const postDataInitialState = {
    username: profile.user.username,
    photo: null,
    first_name: profile.first_name,
    last_name: profile.last_name,
    bio: profile.bio,
    linkedIn: profile.linkedIn
  }

  const { getToken } = useContext(AuthContext)
  const { refetchMyProfile } = useContext(MyProfileContext)

  const [isOpen, setIsOpen] = useState(false)
  const [postData, setPostData] = useState(postDataInitialState)
  const [errorMsg, setErrorMsg] = useState({ isOpen: false, message: '' })
  const [successMsg, setSuccessMsg] = useState({ isOpen: false, message: '' })

  const handleClose = () => {
    setIsOpen(false)
    setPostData(postDataInitialState)
  }

  const handleChange = key => e => {
    setPostData({ ...postData, [key]: e.target.value })
  }

  const handleProfilePhotoChange = e => {
    const reader = new FileReader()
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPostData({ ...postData, photo: reader.result })
      }
    }
    try {
      reader.readAsDataURL(e.target.files[0])
    } catch {
      window.alert('Ocorreu um erro')
    }
  }

  const handleSubmit = async () => {
    fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/profiles/edit-my-profile`, {
      method: 'PUT',
      headers: {
        Authorization: 'JWT ' + (await getToken()),
        'Content-type': 'application/json'
      },
      body: JSON.stringify(postData)
    })
      .then(response => response.json())
      .then(data => {
        if (data === 'success') {
          refetchMyProfile()
          setIsOpen(false)
          setSuccessMsg({
            isOpen: true,
            message: 'Perfil editado com sucesso!'
          })
        } else {
          setIsOpen(false)
          setErrorMsg({
            isOpen: true,
            message: data
          })
        }
      })
  }

  return (
    <div>
      <div
        className="absolute bottom-2 right-2 p-2 rounded-3xl cursor-pointer bg-secondary bg-hover color-bg-light"
        onClick={() => setIsOpen(true)}
      >
        <Tooltip title="Editar perfil" placement="top" arrow>
          <EditIcon className="icon-sm" />
        </Tooltip>
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
          <div className="bg-dark py-2 rounded-md shadow-lg w-full max-w-screen-md">
            <div className="w-full b-bottom p-4">
              <h2>Editar perfil</h2>
            </div>
            <div className="relative w-full flex justify-center items-center p-4 b-bottom-transparent">
              <div className="relative">
                <img
                  src={
                    postData.photo ||
                    process.env.NEXT_PUBLIC_API_HOST + profile.photo
                  }
                  className={`profile-img-lg img-${profile.type}`}
                />
                {profile.type === 'student' ? (
                  <SchoolIcon className="icon" />
                ) : (
                  <AssignmentIcon className="icon" />
                )}
              </div>
              <label
                htmlFor="profile-image"
                className="absolute cursor-pointer color-headline-hover"
              >
                <AddAPhotoOutlinedIcon />
              </label>
              <input
                type="file"
                accept="image/png, image/jpg, image/jpeg, image/webp"
                className="hidden"
                id="profile-image"
                onChange={handleProfilePhotoChange}
              />
            </div>
            <div className="w-full max-h-72 overflow-y-auto pb-10 b-bottom-transparent">
              <div className="w-full p-4">
                <div className="w-full flex justify-between mb-2">
                  <TextField
                    className="w-5/12"
                    label="Nome"
                    value={postData.first_name}
                    onChange={handleChange('first_name')}
                  />
                  <TextField
                    className="w-5/12"
                    label="Sobrenome"
                    value={postData.last_name}
                    onChange={handleChange('last_name')}
                  />
                </div>
                <div className="w-full flex items-center mb-2">
                  <TextField
                    className="w-full"
                    label="Bio"
                    value={postData.bio}
                    multiline
                    onChange={handleChange('bio')}
                  />
                </div>
                <div className="w-full flex justify-between items-center mb-2">
                  <TextField
                    className="w-5/12"
                    label="nome de usuário"
                    value={postData.username}
                    multiline
                    onChange={handleChange('username')}
                  />
                  <TextField
                    className="w-5/12"
                    label="LinkedIn"
                    value={postData.linkedIn}
                    multiline
                    onChange={handleChange('linkedIn')}
                  />
                </div>
              </div>
            </div>
            <div className="w-full p-4">
              <button className="btn-primary ml-auto" onClick={handleSubmit}>
                Confirmar
              </button>
            </div>
          </div>
        </Fade>
      </Modal>
      <Snackbar
        open={successMsg.isOpen}
        autoHideDuration={6000}
        onClose={() => setSuccessMsg({ isOpen: false, message: '' })}
      >
        <Alert severity="success">{successMsg.message}</Alert>
      </Snackbar>
      <Snackbar
        open={errorMsg.isOpen}
        autoHideDuration={6000}
        onClose={() => setErrorMsg({ isOpen: false, message: '' })}
      >
        <Alert severity="error">{errorMsg.message}</Alert>
      </Snackbar>
    </div>
  )
}
