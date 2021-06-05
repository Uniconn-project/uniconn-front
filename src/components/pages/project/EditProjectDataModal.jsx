import React, { useContext, useEffect, useState } from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import EditIcon from '@material-ui/icons/Edit'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import CircularProgress from '@material-ui/core/CircularProgress'
import Chip from '@material-ui/core/Chip'
import TextField from '@material-ui/core/TextField'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import AddAPhotoOutlinedIcon from '@material-ui/icons/AddAPhotoOutlined'
import ProjectBaseForm from '../../global/ProjectBaseForm'
import useFetch, { fetcher } from '../../../hooks/useFetch'
import { MyProfileContext } from '../../../contexts/MyProfile'
import { AuthContext } from '../../../contexts/Auth'

export default function EditProjectDataModal({ project, refetchProject }) {
  const postDataInitialState = {
    image: null,
    name: project.name,
    category: project.category,
    slogan: project.slogan,
    markets: project.markets.map(market => market.name),
    students: [],
    mentors: []
  }

  const { myProfile } = useContext(MyProfileContext)
  const { getToken } = useContext(AuthContext)

  const [isOpen, setIsOpen] = useState(false)
  const [postData, setPostData] = useState(postDataInitialState)

  const [studentsSearch, setStudentsSearch] = useState('')
  const [mentorsSearch, setMentorsSearch] = useState('')
  const [filteredStudents, setFilteredStudents] = useState([])
  const [filteredMentors, setFilteredMentors] = useState([])

  const { data: categories } = useFetch('projects/get-projects-categories-list')
  const { data: markets } = useFetch('projects/get-markets-name-list')

  useEffect(() => {
    if (!studentsSearch.length) {
      setFilteredStudents([])
      return
    }

    ;(async () => {
      const data = await fetcher(
        `profiles/get-filtered-profiles/${studentsSearch}`
      )
      setFilteredStudents(data)
    })()
  }, [studentsSearch])

  useEffect(() => {
    if (!mentorsSearch.length) {
      setFilteredMentors([])
      return
    }

    ;(async () => {
      const data = await fetcher(
        `profiles/get-filtered-profiles/${mentorsSearch}`
      )
      setFilteredMentors(data)
    })()
  }, [mentorsSearch])

  const handleClose = () => {
    setIsOpen(false)
    setPostData(postDataInitialState)
  }

  const handleProfileImageChange = e => {
    const reader = new FileReader()
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPostData({ ...postData, image: reader.result })
      }
    }
    try {
      reader.readAsDataURL(e.target.files[0])
    } catch {
      window.alert('Ocorreu um erro')
    }
  }

  const handleSubmit = async () => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/projects/edit-project/${project.id}`,
      {
        method: 'PUT',
        headers: {
          Authorization: 'JWT ' + (await getToken()),
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          ...postData,
          students: postData.students.map(student => student.user.username),
          mentors: postData.mentors.map(mentor => mentor.user.username)
        })
      }
    )
      .then(response => response.json())
      .then(data => {
        if (data === 'Project edited with success') {
          refetchProject()
        }
      })
  }

  if (!myProfile || !categories || !markets) {
    return <CircularProgress size={30} />
  }

  return (
    <div>
      <div
        className="absolute bottom-2 right-2 p-2 rounded-3xl cursor-pointer bg-secondary bg-hover color-bg-light"
        onClick={() => setIsOpen(true)}
      >
        <Tooltip title="Editar projeto" placement="top" arrow>
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
              <h2>Editar projeto</h2>
            </div>
            <div className="relative w-full flex justify-center items-center p-4 b-bottom-transparent">
              <img
                src={
                  postData.image ||
                  process.env.NEXT_PUBLIC_API_HOST + project.image
                }
                className="w-60 h-52 rounded-md object-cover filter brightness-75"
              />
              <label
                htmlFor="project-image"
                className="absolute cursor-pointer color-headline-hover"
              >
                <AddAPhotoOutlinedIcon />
              </label>
              <input
                type="file"
                accept="image/png, image/jpg, image/jpeg, image/webp"
                className="hidden"
                id="project-image"
                onChange={handleProfileImageChange}
              />
            </div>
            <div className="w-full max-h-72 overflow-y-auto pb-10 b-bottom-transparent">
              <div className="w-full p-4">
                <ProjectBaseForm
                  usePostData={() => [postData, setPostData]}
                  markets={markets}
                  categories={categories}
                />
              </div>
              <div className="w-full">
                <div className="w-full px-4 mb-2">
                  <TextField
                    label="Convidar universitários"
                    className="w-full"
                    value={studentsSearch}
                    onChange={e => setStudentsSearch(e.target.value)}
                  />
                  <List dense className="w-full">
                    {filteredStudents
                      .filter(
                        profile =>
                          profile.user.username !== myProfile.user.username &&
                          profile.type === 'student' &&
                          !postData.students
                            .map(s => s.user.username)
                            .includes(profile.user.username)
                      )
                      .map(student => {
                        return (
                          <ListItem
                            key={student.id}
                            button
                            onClick={() => {
                              setPostData({
                                ...postData,
                                students: [...postData.students, student]
                              })
                              setFilteredStudents([])
                              setStudentsSearch('')
                            }}
                          >
                            <ListItemAvatar>
                              <Avatar
                                alt={student.user.username}
                                src={
                                  process.env.NEXT_PUBLIC_API_HOST +
                                  student.photo
                                }
                              />
                            </ListItemAvatar>
                            <ListItemText
                              primary={`${student.first_name} ${student.last_name}`}
                              secondary={`@${student.user.username}`}
                            />
                          </ListItem>
                        )
                      })}
                  </List>
                  <div className="flex">
                    {postData.students.map(student => (
                      <Chip
                        key={student.id}
                        label={student.user.username}
                        className="b-primary mr-1"
                        avatar={
                          <Avatar
                            alt={student.user.username}
                            src={
                              process.env.NEXT_PUBLIC_API_HOST + student.photo
                            }
                          />
                        }
                        onDelete={() =>
                          setPostData({
                            ...postData,
                            students: postData.students.filter(
                              s => s.id !== student.id
                            )
                          })
                        }
                      />
                    ))}
                  </div>
                </div>
                <div className="w-full px-4">
                  <TextField
                    label="Convidar mentores"
                    className="w-full"
                    value={mentorsSearch}
                    onChange={e => setMentorsSearch(e.target.value)}
                  />
                  <List dense className="w-full">
                    {filteredMentors
                      .filter(
                        profile =>
                          profile.user.username !== myProfile.user.username &&
                          profile.type === 'mentor' &&
                          !postData.mentors
                            .map(m => m.user.username)
                            .includes(profile.user.username)
                      )
                      .map(mentor => {
                        return (
                          <ListItem
                            key={mentor.id}
                            button
                            onClick={() => {
                              setPostData({
                                ...postData,
                                mentors: [...postData.mentors, mentor]
                              })
                              setFilteredMentors([])
                              setMentorsSearch('')
                            }}
                          >
                            <ListItemAvatar>
                              <Avatar
                                alt={mentor.user.username}
                                src={
                                  process.env.NEXT_PUBLIC_API_HOST +
                                  mentor.photo
                                }
                              />
                            </ListItemAvatar>
                            <ListItemText
                              primary={`${mentor.first_name} ${mentor.last_name}`}
                              secondary={`@${mentor.user.username}`}
                            />
                          </ListItem>
                        )
                      })}
                  </List>
                  {postData.mentors.map(mentor => (
                    <Chip
                      key={mentor.id}
                      label={mentor.user.username}
                      className="b-secondary mr-1"
                      avatar={
                        <Avatar
                          alt={mentor.user.username}
                          src={process.env.NEXT_PUBLIC_API_HOST + mentor.photo}
                        />
                      }
                      onDelete={() =>
                        setPostData({
                          ...postData,
                          mentors: postData.mentors.filter(
                            s => s.id !== mentor.id
                          )
                        })
                      }
                    />
                  ))}
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
    </div>
  )
}
