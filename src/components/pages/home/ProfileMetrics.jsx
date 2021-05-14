import React, { useContext } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { MyProfileContext } from '../../../contexts/MyProfile'

function ProfileMetrics() {
  const { myProfile } = useContext(MyProfileContext)

  if (!myProfile) {
    return <CircularProgress />
  }

  return (
    <div
      className="bg-transparent h-4/5 rounded-md shadow-lg pt-4"
      style={{ width: 225 }}
    >
      <div className="b-bottom-light pb-6">
        <div className="w-full flex justify-center">
          <img
            src={process.env.NEXT_PUBLIC_API_HOST + myProfile.photo}
            className="profile-img-lg"
          />
        </div>
        <div className="w-full pl-10">
          <h4 className="mt-2">
            {myProfile.first_name} {myProfile.last_name}
          </h4>
          <p className="self-start color-secondary">
            @{myProfile.user.username}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProfileMetrics
