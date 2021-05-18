import React, { useContext } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import SchoolIcon from '@material-ui/icons/School'
import AssignmentIcon from '@material-ui/icons/Assignment'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import Tooltip from '@material-ui/core/Tooltip'
import EditIcon from '@material-ui/icons/Edit'
import { MyProfileContext } from '../../contexts/MyProfile'

export default function ProfileInfo({ profile }) {
  const { myProfile } = useContext(MyProfileContext)

  if (!myProfile) {
    return <CircularProgress />
  }

  const major = profile.type === 'student' && profile.student.major.name

  return (
    <div className="relative bg-transparent h-4/5 rounded-md shadow-lg pt-4 w-full lg:w-60">
      <div className="b-bottom-light pb-6">
        <div className="w-full flex justify-start pl-10 lg:justify-center lg:pl-0">
          <div className="relative">
            <img
              src={process.env.NEXT_PUBLIC_API_HOST + profile.photo}
              className={`profile-img-lg img-${profile.type}`}
            />
            {profile.type === 'student' ? (
              <SchoolIcon className="icon" />
            ) : (
              <AssignmentIcon className="icon" />
            )}
          </div>
        </div>
        <div className="w-full pl-10">
          <h4 className="mt-2">
            {profile.first_name} {profile.last_name}
          </h4>
          <p className="self-start break-all color-secondary">
            @{profile.user.username}
          </p>
        </div>
      </div>
      <div className="w-full pl-4 pr-2 py-6 b-bottom-light">
        <p className="break-words">{profile.bio}</p>
      </div>
      <div className="w-full pl-4 pr-1 pt-6 ">
        <ul>
          {profile.type === 'student' && (
            <li className="pb-2">
              <SchoolIcon className="icon-sm" />{' '}
              {major[0].toUpperCase() + major.slice(1)}
            </li>
          )}
          {profile.linkedIn && (
            <li className="pb-2 break-all">
              <LinkedInIcon className="icon-sm" /> {profile.linkedIn}
            </li>
          )}
        </ul>
      </div>
      {profile.id === myProfile.id && (
        <div className="absolute bottom-2 right-2 p-2 rounded-3xl cursor-pointer bg-secondary bg-hover color-bg-light">
          <Tooltip title="Editar perfil" placement="top" arrow>
            <EditIcon className="icon-sm" />
          </Tooltip>
        </div>
      )}
    </div>
  )
}
