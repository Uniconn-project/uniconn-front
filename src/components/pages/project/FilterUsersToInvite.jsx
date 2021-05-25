import React, { useContext, useEffect, useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import TextField from '@material-ui/core/TextField'
import Chip from '@material-ui/core/Chip'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import { fetcher } from '../../../hooks/useFetch'
import { MyProfileContext } from '../../../contexts/MyProfile'

export default function FilterUsersToInvite({ setPostData }) {
  const { myProfile } = useContext(MyProfileContext)

  const [studentsSearch, setStudentsSearch] = useState('')
  const [mentorsSearch, setMentorsSearch] = useState('')
  const [filteredStudents, setFilteredStudents] = useState([])
  const [filteredMentors, setFilteredMentors] = useState([])
  const [selectedStudents, setSelectedStudents] = useState([])
  const [selectedMentors, setSelectedMentors] = useState([])

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

  useEffect(() => {
    setPostData(postData => ({
      ...postData,
      students: selectedStudents.map(student => student.user.username),
      mentors: selectedMentors.map(mentor => mentor.user.username)
    }))
  }, [selectedStudents, selectedMentors, setPostData])

  if (!myProfile) {
    return (
      <div className="w-full flex justify-center">
        <CircularProgress size={35} />
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="w-full mb-2">
        <TextField
          label="Adicionar alunos"
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
                !selectedStudents
                  .map(s => s.user.username)
                  .includes(profile.user.username)
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
                      src={process.env.NEXT_PUBLIC_API_HOST + student.photo}
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
      </div>
      <div className="w-full">
        <TextField
          label="Adicionar mentores"
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
                !selectedMentors
                  .map(m => m.user.username)
                  .includes(profile.user.username)
            )
            .map(mentor => {
              return (
                <ListItem
                  key={mentor.id}
                  button
                  onClick={() => {
                    setSelectedMentors([...selectedMentors, mentor])
                    setFilteredMentors([])
                    setMentorsSearch('')
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      alt={mentor.user.username}
                      src={process.env.NEXT_PUBLIC_API_HOST + mentor.photo}
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
        {selectedMentors.map(mentor => (
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
              setSelectedMentors(
                selectedMentors.filter(m => m.id !== mentor.id)
              )
            }
          />
        ))}
      </div>
    </div>
  )
}
