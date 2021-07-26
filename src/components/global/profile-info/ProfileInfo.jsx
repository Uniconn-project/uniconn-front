import React, { useContext } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import StudentInfo from './components/StudentInfo'
import EditProfile from './components/edit-profile/EditProfile'
import { MyProfileContext } from '../../../contexts/MyProfile'

export default function ProfileInfo({ profile }) {
  const { myProfile } = useContext(MyProfileContext)

  if (!myProfile) {
    return <CircularProgress />
  }

  return (
    <div
      className="relative bg-transparent h-4/5 rounded-md shadow-lg pt-4 w-full md:max-w-2xl lg:w-60"
      style={{ maxHeight: '50rem' }}
    >
      <div className="b-bottom-light pb-6">
        {myProfile.id !== profile.id && window.history.length > 1 && (
          <div
            className="absolute top-1 left-1 p-1 rounded-3xl cursor-pointer bg-primary bg-hover color-bg-light"
            onClick={() => window.history.back()}
          >
            <ArrowBackIcon className="icon-sm" />
          </div>
        )}
        <div className="w-full flex justify-start pl-10 lg:justify-center lg:pl-0">
          <img src={profile.photo} className="profile-img-lg shadow-md" />
        </div>
        <div className="w-full pl-10">
          <h4 className="mt-2 break-words">
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
      <div className="w-full pl-4 pr-1 pt-6 pb-2">
        <ul>
          <StudentInfo profile={profile} />
        </ul>
      </div>
      {profile.id === myProfile.id && <EditProfile profile={profile} />}
    </div>
  )
}
