import React, { useContext } from 'react'
import CloseIcon from '@material-ui/icons/Close'
import ProfileListItemWithIcon from '../../../../../global/ProfileListItemWithIcon'
import SettingsPopover from './SettingsPopover'
import { MyProfileContext } from '../../../../../../contexts/MyProfile'
import { AuthContext } from '../../../../../../contexts/Auth'

export default function MembersList({
  project,
  refetchProject,
  isProjectMember,
  isProjectAdmin,
  setErrorMsg
}) {
  const { myProfile } = useContext(MyProfileContext)
  const { getToken } = useContext(AuthContext)

  const handleCancelProjectInvitation = async (e, type, username) => {
    e.stopPropagation()

    if (window.confirm('Remover convite?')) {
      fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/api/projects/uninvite-user-from-project/${project.id}`,
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
          if (data === 'success') {
            refetchProject('uninvite-user')
          } else {
            setErrorMsg({
              isOpen: true,
              message: data
            })
          }
        })
    }
  }

  return (
    <>
      {isProjectMember && (
        <ProfileListItemWithIcon
          profile={myProfile}
          role={
            project.members.filter(
              membership => membership.profile.id === myProfile.id
            )[0].role.readable
          }
        >
          <SettingsPopover
            profile={myProfile}
            project={project}
            isProjectAdmin={isProjectAdmin}
            refetchProject={refetchProject}
            setErrorMsg={setErrorMsg}
          />
        </ProfileListItemWithIcon>
      )}
      {project.members
        .filter(membership => membership.profile.id !== myProfile.id)
        .map(membership => (
          <ProfileListItemWithIcon
            key={membership.id}
            profile={membership.profile}
            role={membership.role.readable}
          >
            {isProjectAdmin && (
              <SettingsPopover
                profile={membership.profile}
                project={project}
                isProjectAdmin={isProjectAdmin}
                refetchProject={refetchProject}
                setErrorMsg={setErrorMsg}
              />
            )}
          </ProfileListItemWithIcon>
        ))}
      {isProjectMember && (
        <>
          {project.pending_invited_profiles.map(profile => (
            <ProfileListItemWithIcon
              key={profile.id}
              profile={profile}
              className="filter brightness-50"
            >
              {isProjectAdmin && (
                <CloseIcon
                  className="icon-sm color-red-hover"
                  onClick={e =>
                    handleCancelProjectInvitation(
                      e,
                      profile.type,
                      profile.user.username
                    )
                  }
                />
              )}
            </ProfileListItemWithIcon>
          ))}
        </>
      )}
    </>
  )
}
