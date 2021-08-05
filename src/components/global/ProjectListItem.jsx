import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Tooltip from '@material-ui/core/Tooltip'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined'
import CommentIcon from '@material-ui/icons/Comment'
import ProjectCategory from './ProjectCategory'
import { MyProfileContext } from '../../contexts/MyProfile'
import { AuthContext } from '../../contexts/Auth'

export default function ProjectListItem({
  project,
  setStarsModal,
  setErrorMsg
}) {
  const { myProfile } = useContext(MyProfileContext)
  const { getToken } = useContext(AuthContext)

  const [starred, setStarred] = useState(false)
  const [starCount, setStarCount] = useState(project.stars.length)

  useEffect(() => {
    if (!myProfile) return

    setStarred(
      project.stars.map(star => star.profile.id).includes(myProfile.id)
    )
    setStarCount(project.stars.length)
  }, [myProfile, project])

  const starProject = async e => {
    e.stopPropagation()
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
        if (data !== 'success') {
          setErrorMsg({
            isOpen: true,
            message: data
          })
          setStarCount(starCount - 1)
          setStarred(false)
        }
      })
  }

  const unstarProject = async e => {
    e.stopPropagation()
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
        if (data !== 'success') {
          setErrorMsg({
            isOpen: true,
            message: data
          })
          setStarCount(starCount + 1)
          setStarred(true)
        }
      })
  }

  return (
    <Link href={`/project/${project.id}?page=description`}>
      <div className="w-full mb-4 rounded-md shadow-lg cursor-pointer bg-transparent bg-hover">
        <div className="flex justify-between px-4 pt-4">
          <div style={{ maxWidth: '60%' }}>
            <h4 className="break-words">{project.name}</h4>
          </div>
          <div className="flex items-center">
            {project.members_profiles.slice(0, 3).map(profile => (
              <Link href={`/user/${profile.user.username}`} key={profile.id}>
                <Tooltip title={profile.user.username} arrow>
                  <div className="profile-img-sm mx-0.5 cursor-pointer">
                    <Image src={profile.photo} layout="fill" />
                  </div>
                </Tooltip>
              </Link>
            ))}
          </div>
        </div>
        <div className="b-bottom-transparent px-4 pb-4">
          <p className="max-h-20 whitespace-nowrap overflow-ellipsis overflow-hidden mb-2">
            {project.slogan}
          </p>
          <div className="relative w-80 h-52 mb-2">
            <Image
              src={project.image}
              layout="fill"
              className="rounded-md object-cover"
            />
          </div>
          <ProjectCategory category={project.category} />
        </div>
        <div className="p-2 flex items-center">
          <Tooltip title="Curtidas" placement="bottom" arrow>
            <div className="flex items-center mr-2 cursor-pointer">
              {starred ? (
                <div
                  className="p-1 rounded-3xl bg-transparent-hover cursor-pointer"
                  onClick={unstarProject}
                >
                  <ThumbUpAltIcon className="icon-sm color-primary" />
                </div>
              ) : (
                <div
                  className="p-1 rounded-3xl bg-transparent-hover cursor-pointer"
                  onClick={starProject}
                >
                  <ThumbUpOutlinedIcon className="icon-sm color-primary-hover" />
                </div>
              )}{' '}
              <span
                className="hover:underline"
                onClick={e => {
                  e.stopPropagation()
                  setStarsModal({
                    isOpen: true,
                    profiles: project.stars.map(star => star.profile)
                  })
                }}
              >
                {starCount}
              </span>
            </div>
          </Tooltip>
          <Tooltip title="Discussões" placement="bottom" arrow>
            <div>
              <CommentIcon className="icon-xs" /> {project.discussions_length}
            </div>
          </Tooltip>
        </div>
      </div>
    </Link>
  )
}
