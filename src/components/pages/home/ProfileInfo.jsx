import React, { useContext } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import SchoolIcon from '@material-ui/icons/School'
import AssignmentIcon from '@material-ui/icons/Assignment'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import Tooltip from '@material-ui/core/Tooltip'
import EditIcon from '@material-ui/icons/Edit'
import { MyProfileContext } from '../../../contexts/MyProfile'

function ProfileMetrics() {
  const { myProfile } = useContext(MyProfileContext)

  if (!myProfile) {
    return <CircularProgress />
  }

  const major = myProfile.type === 'student' && myProfile.student.major.name

  return (
    <div
      className="relative bg-transparent h-4/5 rounded-md shadow-lg pt-4"
      style={{ width: 225 }}
    >
      <div className="b-bottom-light pb-6">
        <div className="w-full flex justify-center">
          <div className="relative">
            <img
              src={process.env.NEXT_PUBLIC_API_HOST + myProfile.photo}
              className={`profile-img-lg img-${myProfile.type}`}
            />
            {myProfile.type === 'student' ? (
              <SchoolIcon className="icon" />
            ) : (
              <AssignmentIcon className="icon" />
            )}
          </div>
        </div>
        <div className="w-full pl-10">
          <h4 className="mt-2">
            {myProfile.first_name} {myProfile.last_name}
          </h4>
          <p className="self-start break-all color-secondary">
            @{myProfile.user.username}
          </p>
        </div>
      </div>
      <div className="w-full pl-4 pr-2 py-6 b-bottom-light">
        <p className="break-all">{myProfile.bio}</p>
      </div>
      <div className="w-full pl-4 pr-1 pt-6 ">
        <ul>
          <li className="pb-2">
            <SchoolIcon className="icon-sm" />{' '}
            {major[0].toUpperCase() + major.slice(1)}
          </li>
          {myProfile.linkedIn !== '' && (
            <li className="pb-2">
              <LinkedInIcon className="icon-sm" /> {myProfile.linkedIn}
            </li>
          )}
        </ul>
      </div>
      <div className="absolute bottom-2 right-2 p-2 rounded-3xl cursor-pointer bg-secondary bg-hover color-bg-light">
        <Tooltip title="Editar perfil" placement="top" arrow>
          <EditIcon className="icon-sm" />
        </Tooltip>
      </div>
    </div>
  )
}

export default ProfileMetrics
