import React, { useContext } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import SchoolIcon from '@material-ui/icons/School'
import AssignmentIcon from '@material-ui/icons/Assignment'
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
      {console.log(myProfile)}
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
          <p className="self-start color-secondary">
            @{myProfile.user.username}
          </p>
        </div>
      </div>
      <div></div>
    </div>
  )
}

export default ProfileMetrics
