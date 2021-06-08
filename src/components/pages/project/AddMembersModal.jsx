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
import { fetcher } from '../../../hooks/useFetch'
import { MyProfileContext } from '../../../contexts/MyProfile'

export default function AddMembersModal({ type, project }) {
  const { myProfile } = useContext(MyProfileContext)

  const [isOpen, setIsOpen] = useState(false)
  const [studentsSearch, setStudentsSearch] = useState('')
  const [filteredStudents, setFilteredStudents] = useState([])
  const [selectedStudents, setSelectedStudents] = useState([])

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

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <>
      <div
        className="w-full flex items-center p-2 pl-4 cursor-pointer bg-transparent bg-hover rounded-md shadow-lg"
        onClick={() => setIsOpen(true)}
      >
        {type === 'students' ? (
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
                  type === 'students'
                    ? 'Pesquisar universitários...'
                    : 'Pesquisar mentores...'
                }
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
                      !selectedStudents.map(s => s.id).includes(profile.id) &&
                      !project.students.map(s => s.id).includes(profile.id)
                  )
                  .map(student => {
                    return (
                      <ListItem
                        key={student.id}
                        button
                        onClick={() => {
                          setSelectedStudents([...selectedStudents, student])
                          setFilteredStudents([])
                          setStudentsSearch('')
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar
                            alt={student.user.username}
                            src={
                              process.env.NEXT_PUBLIC_API_HOST + student.photo
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
            </div>
            <div className="flex px-4 py-2 b-bottom-light">
              {selectedStudents.map(student => (
                <Chip
                  key={student.id}
                  label={student.user.username}
                  className="b-primary mr-1"
                  avatar={
                    <Avatar
                      alt={student.user.username}
                      src={process.env.NEXT_PUBLIC_API_HOST + student.photo}
                    />
                  }
                  onDelete={() =>
                    setSelectedStudents(
                      selectedStudents.filter(s => s.id !== student.id)
                    )
                  }
                />
              ))}
            </div>
            <div className="w-full p-4 flex items-center">
              <button
                className={`btn-${
                  type === 'students' ? 'primary' : 'secondary'
                } ml-auto`}
              >
                Convidar
              </button>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  )
}
