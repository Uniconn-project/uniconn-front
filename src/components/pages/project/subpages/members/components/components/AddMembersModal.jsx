import React, { useContext, useEffect, useState } from 'react'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import Chip from '@material-ui/core/Chip'
import TextField from '@material-ui/core/TextField'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import { fetcher } from '../../../../../../../hooks/useFetch'
import { MyProfileContext } from '../../../../../../../contexts/MyProfile'
import { AuthContext } from '../../../../../../../contexts/Auth'

export default function AddMembersModal({ type, project, refetchProject }) {
  const { myProfile } = useContext(MyProfileContext)
  const { getToken } = useContext(AuthContext)

  const [isOpen, setIsOpen] = useState(false)
  const [profilesSearch, setProfilesSearch] = useState('')
  const [filteredProfiles, setFilteredProfiles] = useState([])
  const [selectedProfiles, setSelectedProfiles] = useState([])
  const [errorMsg, setErrorMsg] = useState({
    isOpen: false,
    message: ''
  })

  useEffect(() => {
    if (!profilesSearch.length) {
      setFilteredProfiles([])
      return
    }

    ;(async () => {
      const data = await fetcher(
        `profiles/get-filtered-profiles/${profilesSearch}`
      )
      setFilteredProfiles(data)
    })()
  }, [profilesSearch])

  const handleClose = () => {
    setSelectedProfiles([])
    setIsOpen(false)
  }

  const handleSubmit = async () => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/projects/invite-${type}s-to-project/${project.id}`,
      {
        method: 'PUT',
        headers: {
          Authorization: 'JWT ' + (await getToken()),
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          [`${type}s`]: selectedProfiles.map(profile => profile.user.username)
        })
      }
    )
      .then(response => response.json())
      .then(data => {
        if (data === 'success') {
          refetchProject('invite-user')
          setIsOpen(false)
        } else {
          handleClose()
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
        className="w-full flex items-center p-2 pl-4 mb-2 cursor-pointer bg-transparent bg-hover rounded-md shadow-lg"
        onClick={() => setIsOpen(true)}
      >
        {type === 'student' ? (
          <>
            <PersonAddIcon className="color-primary mr-2" />
            <strong className="color-primary">Convidar universitário</strong>
          </>
        ) : (
          <>
            <PersonAddIcon className="color-secondary mr-2" />
            <strong className="color-secondary">Convidar mentor</strong>
          </>
        )}
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
            <div className="w-full px-4 py-2">
              <TextField
                label={
                  type === 'student'
                    ? 'Pesquisar universitários...'
                    : 'Pesquisar mentores...'
                }
                className="w-full"
                value={profilesSearch}
                onChange={e => setProfilesSearch(e.target.value)}
              />
              <List dense className="w-full">
                {filteredProfiles
                  .filter(
                    profile =>
                      profile.user.username !== myProfile.user.username &&
                      profile.type === type &&
                      !selectedProfiles.map(s => s.id).includes(profile.id) &&
                      !project[`${type}s`]
                        .map(s => s.id)
                        .includes(profile.id) &&
                      !project[`pending_invited_${type}s`]
                        .map(s => s.id)
                        .includes(profile.id)
                  )
                  .map(profile => {
                    return (
                      <ListItem
                        key={profile.id}
                        button
                        onClick={() => {
                          setSelectedProfiles([...selectedProfiles, profile])
                          setFilteredProfiles([])
                          setProfilesSearch('')
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar
                            alt={profile.user.username}
                            src={profile.photo}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={`${profile.first_name} ${profile.last_name}`}
                          secondary={`@${profile.user.username}`}
                        />
                      </ListItem>
                    )
                  })}
              </List>
            </div>
            <div className="flex px-4 py-2 b-bottom-light">
              {selectedProfiles.map(profile => (
                <Chip
                  key={profile.id}
                  label={profile.user.username}
                  className={`b-${
                    type === 'student' ? 'primary' : 'secondary'
                  } mr-1`}
                  avatar={
                    <Avatar alt={profile.user.username} src={profile.photo} />
                  }
                  onDelete={() =>
                    setSelectedProfiles(
                      selectedProfiles.filter(s => s.id !== profile.id)
                    )
                  }
                />
              ))}
            </div>
            <div className="w-full p-4 flex items-center">
              <button
                className={`btn-${
                  type === 'student' ? 'primary' : 'secondary'
                } ml-auto`}
                onClick={handleSubmit}
              >
                Convidar
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
