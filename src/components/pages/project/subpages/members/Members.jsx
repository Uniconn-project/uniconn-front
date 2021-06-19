import React, { useContext } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import CloseIcon from '@material-ui/icons/Close'
import ProfileListItem from '../../../../global/ProfileListItem'
import ProfileListItemWithIcon from '../../../../global/ProfileListItemWithIcon'
import AddMembersModal from '../../AddMembersModal'
import SettingsPopover from './components/SettingsPopover'
import { MyProfileContext } from '../../../../../contexts/MyProfile'
import { AuthContext } from '../../../../../contexts/Auth'

export default function Members({ type, project, refetchProject }) {
  const { myProfile } = useContext(MyProfileContext)
  const { getToken } = useContext(AuthContext)

  const canRemoveMembers = project.students
    .map(profile => profile.id)
    .includes(myProfile.id)

  const handleCancelProjectInvitation = async (e, username) => {
    e.stopPropagation()

    if (window.confirm('Remover convite?')) {
      fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/api/projects/uninvite-${type}-from-project/${project.id}`,
        {
          method: 'PUT',
          headers: {
            Authorization: 'JWT ' + (await getToken()),
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            username: username
          })
        }
      )
        .then(response => response.json())
        .then(data => {
          if (data === 'Uninvited user from project with success!') {
            refetchProject('uninvite-user')
          }
        })
    }
  }

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
          <>
            {canRemoveMembers ? (
              <ProfileListItemWithIcon key={profile.id} profile={profile}>
                <SettingsPopover />
              </ProfileListItemWithIcon>
            ) : (
              <ProfileListItem key={profile.id} profile={profile} />
            )}
          </>
        ))}
        {project.students
          .concat(project.mentors)
          .map(profile => profile.id)
          .includes(myProfile.id) && (
          <>
            {project[`pending_invited_${type}s`].map(profile => (
              <>
                {canRemoveMembers ? (
                  <ProfileListItemWithIcon
                    key={profile.id}
                    profile={profile}
                    className="filter brightness-50"
                  >
                    <CloseIcon
                      className="icon-sm color-secondary-hover"
                      onClick={e =>
                        handleCancelProjectInvitation(e, profile.user.username)
                      }
                    />
                  </ProfileListItemWithIcon>
                ) : (
                  <ProfileListItem
                    key={profile.id}
                    profile={profile}
                    className="filter brightness-50"
                  />
                )}
              </>
            ))}
          </>
        )}
      </div>
      {canRemoveMembers && (
        <AddMembersModal
          type={type}
          project={project}
          refetchProject={refetchProject}
        />
      )}
    </div>
  )
}
