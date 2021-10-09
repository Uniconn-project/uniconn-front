import React, { useState, useContext, useEffect } from 'react'
import EditProjectDataModal from '../../EditProjectDataModal'
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import CircularProgress from '@material-ui/core/CircularProgress'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import StarsProfilesModal from '../../../../global/StarsProfilesModal'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ProjectCategory from '../../../../global/ProjectCategory'
import { mutate } from 'swr'
import { MyProfileContext } from '../../../../../contexts/MyProfile'
import { AuthContext } from '../../../../../contexts/Auth'

export default function ProjectInfo({
  project,
  isProjectAdmin,
  refetchProject
}) {
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
    if (!myProfile.id) return
    setStarred(
      project.stars.map(star => star.profile.id).includes(myProfile.id)
    )
  }, [myProfile]) //eslint-disable-line

  const starProject = async () => {
    setStarCount(starCount + 1)
    setStarred(true)

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/projects/star-project/${project.id}`,
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
      `${process.env.NEXT_PUBLIC_API_URL}/api/projects/unstar-project/${project.id}`,
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

  if (!myProfile.id) {
    return <CircularProgress />
  }

  return (
    <div
      className="relative bg-transparent h-4/5 rounded-md shadow-lg w-full md:max-w-2xl lg:w-60"
      style={{ maxHeight: '50rem' }}
    >
      <div>
        {window.history.length > 1 && (
          <div
            className="mx-2 mt-2 p-1 w-max rounded-3xl cursor-pointer bg-primary bg-hover color-bg-light"
            onClick={() => window.history.back()}
          >
            <ArrowBackIcon className="icon-sm" />
          </div>
        )}
        <div className="w-full flex justify-center py-2">
          <div
            src={project.image}
            className="flex flex-col w-full h-52 object-cover"
            style={{
              backgroundImage: `url(${project.image})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center'
            }}
          >
            <div
              className="flex flex-col justify-between h-full w-full p-4 break-words"
              style={{
                backgroundColor: 'rgba(0, 0, 0, .75)'
              }}
            >
              <div>
                <h3 className="mt-2">{project.name}</h3>
                <p className="break-words mb-2">{project.slogan}</p>
              </div>
              <ProjectCategory category={project.category} />
            </div>
          </div>
        </div>
        <div className="w-full flex items-center pl-4 pb-2 cursor-pointer">
          {starred ? (
            <div className="p-1 rounded-3xl" onClick={unstarProject}>
              <ThumbUpAltIcon className="icon-sm color-primary" />
            </div>
          ) : (
            <div className="p-1 rounded-3xl" onClick={starProject}>
              <ThumbUpOutlinedIcon className="icon-sm color-primary-hover" />
            </div>
          )}{' '}
          <span
            className="hover:underline"
            onClick={() => setStarsModalIsOpen(true)}
          >
            {starCount}
          </span>
        </div>
      </div>
      <StarsProfilesModal
        useIsOpen={() => [starsModalIsOpen, setStarsModalIsOpen]}
        profiles={project.stars.map(star => star.profile)}
      />
      {isProjectAdmin && (
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
