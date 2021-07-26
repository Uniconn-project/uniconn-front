import React, { useState, useContext, useMemo } from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import EditIcon from '@material-ui/icons/Edit'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import EditProfileModal from './components/EditProfileModal'
import { AuthContext } from '../../../../contexts/Auth'
import { MyProfileContext } from '../../../../contexts/MyProfile'
import CropPhotoModal from './components/CropPhotoModal'

export default function EditProfile({ profile }) {
  const postDataInitialState = useMemo(
    () => ({
      username: profile.user.username,
      photo: null,
      first_name: profile.first_name,
      last_name: profile.last_name,
      bio: profile.bio,
      linkedIn: profile.linkedIn || '',
      is_attending_university: profile.is_attending_university,
      university_name: profile.university && profile.university.name,
      major_name: profile.major && profile.major.name,
      skills_names: profile.skills.map(skill => skill.name)
    }),
    [profile]
  )

  const { getToken } = useContext(AuthContext)
  const { refetchMyProfile } = useContext(MyProfileContext)

  const [postData, setPostData] = useState(postDataInitialState)
  const [editModalIsOpen, setEditModalIsOpen] = useState(false)
  const [cropModalIsOpen, setCropModalIsOpen] = useState(false)
  const [successMsg, setSuccessMsg] = useState({ isOpen: false, message: '' })
  const [errorMsg, setErrorMsg] = useState({ isOpen: false, message: '' })

  const handleProfilePhotoChange = e => {
    const reader = new FileReader()
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPostData({ ...postData, photo: reader.result })
        setCropModalIsOpen(true)
      }
    }
    try {
      reader.readAsDataURL(e.target.files[0])
    } catch {
      window.alert('Ocorreu um erro')
    }
  }

  const handleSubmit = async () => {
    if (profile.type === 'student' && !postData.skills.length) {
      setErrorMsg({
        isOpen: true,
        message: 'Selecione pelo menos uma habilidade!'
      })
      return
    }

    if (profile.type === 'mentor' && !postData.markets.length) {
      setErrorMsg({
        isOpen: true,
        message: 'Selecione pelo menos uma expertise!'
      })
      return
    }

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
        setEditModalIsOpen(false)

        if (data === 'success') {
          refetchMyProfile()
          setSuccessMsg({
            isOpen: true,
            message: 'Perfil editado com sucesso!'
          })
        } else {
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
        onClick={() => setEditModalIsOpen(true)}
      >
        <Tooltip title="Editar perfil" placement="top" arrow>
          <EditIcon className="icon-sm" />
        </Tooltip>
      </div>
      <EditProfileModal
        profile={profile}
        useIsOpen={() => [editModalIsOpen, setEditModalIsOpen]}
        usePostData={() => [postData, setPostData]}
        postDataInitialState={postDataInitialState}
        handleProfilePhotoChange={handleProfilePhotoChange}
        handleSubmit={handleSubmit}
      />
      <CropPhotoModal
        useIsOpen={() => [cropModalIsOpen, setCropModalIsOpen]}
        usePostData={() => [postData, setPostData]}
        postDataInitialState={postDataInitialState}
      />
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
