import React, { useState, useContext, useEffect } from 'react'
import SchoolIcon from '@material-ui/icons/School'
import AssignmentIcon from '@material-ui/icons/Assignment'
import EditProjectDataModal from './EditProjectDataModal'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import StarIcon from '@material-ui/icons/Star'
import CircularProgress from '@material-ui/core/CircularProgress'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import StarsProfilesModal from '../../global/StarsProfilesModal'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { mutate } from 'swr'
import { MyProfileContext } from '../../../contexts/MyProfile'
import { AuthContext } from '../../../contexts/Auth'

export default function ProjectInfo({ project, setPage, refetchProject }) {
  const { myProfile } = useContext(MyProfileContext)
  const { getToken } = useContext(AuthContext)

  const [starred, setStarred] = useState(false)
  const [starCount, setStarCount] = useState(project.stars.length)
  const [starsModalIsOpen, setStarsModalIsOpen] = useState(false)
  const [errorMsg, setErrorMsg] = useState({
    isOpen: false,
    message: ''
  })

  useEffect(() => {
    if (!myProfile) return
    setStarred(
      project.stars.map(star => star.profile.id).includes(myProfile.id)
    )
  }, [myProfile]) //eslint-disable-line

  const starProject = async () => {
    setStarCount(starCount + 1)
    setStarred(true)

    fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/projects/star-project/${project.id}`,
      {
        method: 'POST',
        headers: {
          Authorization: 'JWT ' + (await getToken()),
          'Content-type': 'application/json'
        }
      }
    )
      .then(response => response.json())
      .then(data => {
        if (data === 'success') {
          mutate(`projects/get-project/${project.id}`)
        } else {
          setErrorMsg({
            isOpen: true,
            message: data
          })
          setStarCount(starCount - 1)
          setStarred(false)
        }
      })
  }

  const unstarProject = async () => {
    setStarCount(starCount - 1)
    setStarred(false)

    fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/projects/unstar-project/${project.id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: 'JWT ' + (await getToken()),
          'Content-type': 'application/json'
        }
      }
    )
      .then(response => response.json())
      .then(data => {
        if (data === 'success') {
          mutate(`projects/get-project/${project.id}`)
        } else {
          setErrorMsg({
            isOpen: true,
            message: data
          })
          setStarCount(starCount + 1)
          setStarred(true)
        }
      })
  }

  if (!myProfile) {
    return <CircularProgress />
  }

  return (
    <div
      className="relative bg-transparent h-4/5 rounded-md shadow-lg w-full md:max-w-2xl lg:w-60"
      style={{ maxHeight: '50rem' }}
    >
      <div className="b-bottom-light">
        {window.history.length > 1 && (
          <div
            className="absolute top-1 left-1 p-1 rounded-3xl cursor-pointer bg-primary bg-hover color-bg-light"
            onClick={() => window.history.back()}
          >
            <ArrowBackIcon className="icon-sm" />
          </div>
        )}
        <div className="w-full flex justify-center p-2">
          <img
            src={project.image}
            className="w-full h-52 rounded-md object-cover"
          />
        </div>
        <div className="w-full pl-4 pb-4 break-words">
          <h3 className="mt-2">{project.name}</h3>
        </div>
        <div className="w-full flex items-center pl-4 pb-2 cursor-pointer">
          {starred ? (
            <StarIcon
              className="icon-sm mr-1 color-primary"
              onClick={unstarProject}
            />
          ) : (
            <StarBorderIcon
              className="icon-sm mr-1 color-primary-hover"
              onClick={starProject}
            />
          )}{' '}
          <span
            className="hover:underline"
            onClick={() => setStarsModalIsOpen(true)}
          >
            {starCount}
          </span>
        </div>
      </div>
      <div className="w-full pl-4 pr-2 py-6 b-bottom-light">
        <p className="break-words mb-2">{project.slogan}</p>
        <div className={`text-sm px-2 w-max color-${project.category.value}`}>
          {project.category.readable}
        </div>
      </div>
      <div className="w-full pl-4 pr-1 pt-6 pb-2">
        <ul>
          <li className="mb-2">
            <SchoolIcon className="color-primary" />{' '}
            <span
              className="cursor-pointer hover:underline"
              onClick={() => setPage('students')}
            >
              <strong>{project.students.length}</strong>{' '}
              {project.students.length === 1
                ? 'universitário'
                : 'universitários'}
            </span>
          </li>
          <li className="mb-2">
            <AssignmentIcon className="color-secondary" />{' '}
            <span
              className="cursor-pointer hover:underline"
              onClick={() => setPage('mentors')}
            >
              <strong>{project.mentors.length}</strong>{' '}
              {project.mentors.length === 1 ? 'mentor' : 'mentores'}
            </span>
          </li>
        </ul>
      </div>
      <StarsProfilesModal
        useIsOpen={() => [starsModalIsOpen, setStarsModalIsOpen]}
        profiles={project.stars.map(star => star.profile)}
      />
      {project.students.map(profile => profile.id).includes(myProfile.id) && (
        <EditProjectDataModal
          project={project}
          refetchProject={refetchProject}
        />
      )}
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
    </div>
  )
}
