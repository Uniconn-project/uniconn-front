import React, { useContext } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import SchoolIcon from '@material-ui/icons/School'
import AssignmentIcon from '@material-ui/icons/Assignment'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import StudentInfo from './components/StudentInfo'
import MentorInfo from './components/MentorInfo'
import EditProfileModal from './components/EditProfileModal'
import { MyProfileContext } from '../../../contexts/MyProfile'

export default function ProfileInfo({ profile }) {
  const { myProfile } = useContext(MyProfileContext)

  if (!myProfile) {
    return <CircularProgress />
  }

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
      <div className="w-full pl-4 pr-1 pt-6 pb-2">
        <ul>
          {profile.type === 'student' && <StudentInfo profile={profile} />}
          {profile.linkedIn && (
            <li className="pb-2 break-all">
              <LinkedInIcon className="icon-sm" /> {profile.linkedIn}
            </li>
          )}
          {profile.type === 'mentor' && <MentorInfo profile={profile} />}
        </ul>
      </div>
      {profile.id === myProfile.id && <EditProfileModal profile={profile} />}
    </div>
  )
}
