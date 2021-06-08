import React, { useContext } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import ProfileListItem from '../../../global/ProfileListItem'
import { MyProfileContext } from '../../../../contexts/MyProfile'
import AddMembersModal from '../AddMembersModal'

export default function Members({ type, project, profiles }) {
  const { myProfile } = useContext(MyProfileContext)

  if (!myProfile || !project) {
    return (
      <div className="w-full flex justify-center">
        <CircularProgress size={30} />
      </div>
    )
  }

  return (
    <div className="w-full p-4 pt-0">
      <div>
        {profiles.map(profile => (
          <ProfileListItem key={profile.id} profile={profile} />
        ))}
      </div>
      {project.students.map(profile => profile.id).includes(myProfile.id) && (
        <AddMembersModal type={type} project={project} />
      )}
    </div>
  )
}
