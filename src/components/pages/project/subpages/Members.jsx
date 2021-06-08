import React, { useContext } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import ProfileListItem from '../../../global/ProfileListItem'
import { MyProfileContext } from '../../../../contexts/MyProfile'

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
        <div className="w-full flex items-center p-2 pl-4 cursor-pointer bg-transparent bg-hover rounded-md shadow-lg">
          {type === 'students' ? (
            <>
              <PersonAddIcon className="color-primary mr-2" />
              <strong className="color-primary">Convidar universitário</strong>
            </>
          ) : (
            <>
              <PersonAddIcon className="color-secondary mr-2" />
              <strong className="color-secondary">Convidar mentor</strong>
            </>
          )}
        </div>
      )}
    </div>
  )
}
