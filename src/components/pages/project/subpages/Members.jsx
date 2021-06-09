import React, { useContext } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import ProfileListItem from '../../../global/ProfileListItem'
import { MyProfileContext } from '../../../../contexts/MyProfile'
import AddMembersModal from '../AddMembersModal'

export default function Members({ type, project, refetchProject }) {
  const { myProfile } = useContext(MyProfileContext)

  if (!myProfile || !project) {
    return (
      <div className="w-full flex justify-center">
        <CircularProgress size={30} />
      </div>
    )
  }

  return (
    <div className="w-full py-4 pt-0">
      <div>
        {project[`${type}s`].map(profile => (
          <ProfileListItem key={profile.id} profile={profile} />
        ))}
        {project.students
          .concat(project.mentors)
          .map(profile => profile.id)
          .includes(myProfile.id) && (
          <>
            {project[`pending_invited_${type}s`].map(profile => (
              <ProfileListItem
                key={profile.id}
                profile={profile}
                className="filter brightness-50"
              />
            ))}
          </>
        )}
      </div>
      {project.students.map(profile => profile.id).includes(myProfile.id) && (
        <AddMembersModal
          type={type}
          project={project}
          refetchProject={refetchProject}
        />
      )}
    </div>
  )
}
