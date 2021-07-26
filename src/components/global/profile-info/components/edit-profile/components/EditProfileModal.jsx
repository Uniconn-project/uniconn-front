import React from 'react'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import TextField from '@material-ui/core/TextField'
import CloseIcon from '@material-ui/icons/Close'
import AddAPhotoOutlinedIcon from '@material-ui/icons/AddAPhotoOutlined'
import UniversityMajorSkillsForm from '../../../../UniversityMajorSkillsForm'

export default function EditProfileModal({
  profile,
  useIsOpen,
  usePostData,
  postDataInitialState,
  handleProfilePhotoChange,
  handleSubmit
}) {
  const [isOpen, setIsOpen] = useIsOpen()
  const [postData, setPostData] = usePostData()

  const handleClose = () => {
    setIsOpen(false)
    setPostData(postDataInitialState)
  }

  const handleChange = key => e => {
    setPostData({ ...postData, [key]: e.target.value })
  }

  return (
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
          <div className="flex justify-between items-center w-full b-bottom p-4">
            <h2>Editar perfil</h2>
            <div className="p-1 cursor-pointer" onClick={handleClose}>
              <CloseIcon className="color-red" />
            </div>
          </div>
          <div className="relative w-full flex justify-center items-center p-4 b-bottom-transparent">
            <div className="flex flex-col items-center">
              <img
                src={postData.photo || profile.photo}
                className="profile-img-lg"
              />
              <span className="mt-2">{profile.user.email}</span>
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
                  className="w-2/5"
                  label="Nome"
                  value={postData.first_name}
                  inputProps={{ maxLength: 30 }}
                  onChange={handleChange('first_name')}
                />
                <TextField
                  className="w-2/5"
                  label="Sobrenome"
                  value={postData.last_name}
                  inputProps={{ maxLength: 30 }}
                  onChange={handleChange('last_name')}
                />
              </div>
              <div className="w-full flex items-center mb-2">
                <TextField
                  className="w-full"
                  label="Bio"
                  value={postData.bio}
                  inputProps={{ maxLength: 150 }}
                  multiline
                  onChange={handleChange('bio')}
                />
              </div>
              <div className="w-full flex justify-between items-center mb-2">
                <TextField
                  className="w-2/5"
                  label="nome de usuário"
                  value={postData.username}
                  inputProps={{ maxLength: 25 }}
                  onChange={handleChange('username')}
                />
                <TextField
                  className="w-2/5"
                  label="LinkedIn"
                  value={postData.linkedIn}
                  inputProps={{ maxLength: 50 }}
                  onChange={handleChange('linkedIn')}
                />
              </div>
              <UniversityMajorSkillsForm
                className="justify-between"
                usePostData={usePostData}
              />
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
  )
}
