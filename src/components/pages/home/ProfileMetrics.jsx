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
      className="bg-transparent h-full rounded-md shadow-lg pt-4"
      style={{ width: 225 }}
    >
      <div className="flex flex-col items-center">
        <img
          src={process.env.NEXT_PUBLIC_API_HOST + myProfile.photo}
          className="profile-img-lg"
        />
        <h4 className="mt-2">
          {myProfile.first_name} {myProfile.last_name}
        </h4>
      </div>
    </div>
  )
}

export default ProfileMetrics
