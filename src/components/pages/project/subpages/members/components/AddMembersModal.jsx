import React, { useContext, useEffect, useMemo, useState } from 'react'
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
import { fetcher } from '../../../../../../hooks/useFetch'
import { MyProfileContext } from '../../../../../../contexts/MyProfile'
import { AuthContext } from '../../../../../../contexts/Auth'
import { WebSocketsContext } from '../../../../../../contexts/WebSockets'

export default function AddMembersModal({ project, refetchProject }) {
  const { myProfile } = useContext(MyProfileContext)
  const { getToken } = useContext(AuthContext)
  const { socket } = useContext(WebSocketsContext)

  const [isOpen, setIsOpen] = useState(false)
  const [profilesSearch, setProfilesSearch] = useState('')
  const [filteredProfiles, setFilteredProfiles] = useState([])
  const [selectedProfiles, setSelectedProfiles] = useState([])
  const [message, setMessage] = useState(
    'Ei! Acredito que pode contribuir com o projeto.'
  )
  const [errorMsg, setErrorMsg] = useState({
    isOpen: false,
    message: ''
  })

  const selectedProfilesMatrix = useMemo(() => {
    const matrix = []

    for (let i = 0; i < Math.ceil(selectedProfiles.length / 2); i++) {
      matrix.push(selectedProfiles.slice(i * 2, i * 2 + 2))
    }

    return matrix
  }, [selectedProfiles])

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
      `${process.env.NEXT_PUBLIC_API_URL}/api/projects/invite-users-to-project/${project.id}`,
      {
        method: 'POST',
        headers: {
          Authorization: 'JWT ' + (await getToken()),
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          usernames: selectedProfiles.map(profile => profile.user.username),
          message: message
        })
      }
    )
      .then(response => response.json())
      .then(data => {
        if (data === 'success') {
          refetchProject('invite-user')
          setIsOpen(false)
          socket.emit(
            'notification',
            selectedProfiles.map(profile => profile.id)
          )
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
        <PersonAddIcon className="color-primary mr-2" />
        <strong className="color-primary">Convidar usuários</strong>
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
          <div className="bg-dark rounded-md shadow-lg max-w-2xl">
            <div className="w-full px-4 py-2">
              <TextField
                label="Mensagem"
                helperText="Breve texto dizendo o motivo do convite"
                className="w-full"
                value={message}
                multiline
                onChange={e => setMessage(e.target.value)}
              />
              <TextField
                label="Pesquisar usuários"
                className="w-full"
                value={profilesSearch}
                onChange={e => setProfilesSearch(e.target.value)}
              />
            </div>
            <div className="px-4 py-2 b-bottom-light">
              {selectedProfilesMatrix.map((profiles, index) => (
                <div key={index} className="mb-1 overflow-x-hidden">
                  {profiles.map(profile => (
                    <Chip
                      key={profile.id}
                      label={profile.user.username}
                      className="b-primary mr-1"
                      avatar={
                        <Avatar
                          alt={profile.user.username}
                          src={profile.photo}
                        />
                      }
                      onDelete={() =>
                        setSelectedProfiles(
                          selectedProfiles.filter(s => s.id !== profile.id)
                        )
                      }
                    />
                  ))}
                </div>
              ))}
              <List dense className="w-full max-h-52 overflow-y-auto">
                {filteredProfiles
                  .filter(
                    profile =>
                      profile.user.username !== myProfile.user.username &&
                      !selectedProfiles.map(s => s.id).includes(profile.id) &&
                      !project.members
                        .map(membership => membership.profile.id)
                        .includes(profile.id) &&
                      !project.pending_invited_profiles
                        .map(profile => profile.id)
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
            <div className="w-full p-4 flex items-center">
              <button className="btn-primary ml-auto" onClick={handleSubmit}>
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
