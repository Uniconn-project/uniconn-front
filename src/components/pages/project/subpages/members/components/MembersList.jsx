import React, { useContext } from 'react'
import CloseIcon from '@material-ui/icons/Close'
import ProfileListItemWithIcon from '../../../../../global/ProfileListItemWithIcon'
import SettingsPopover from './SettingsPopover'
import { MyProfileContext } from '../../../../../../contexts/MyProfile'
import { AuthContext } from '../../../../../../contexts/Auth'
import { WebSocketsContext } from '../../../../../../contexts/WebSockets'

export default function MembersList({
  project,
  refetchProject,
  isProjectMember,
  isProjectAdmin,
  setErrorMsg
}) {
  const { myProfile } = useContext(MyProfileContext)
  const { getToken } = useContext(AuthContext)
  const { socket } = useContext(WebSocketsContext)

  const handleCancelProjectInvitation = async (e, profile) => {
    e.stopPropagation()

    if (window.confirm('Remover convite?')) {
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/projects/uninvite-user-from-project/${project.id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: 'JWT ' + (await getToken()),
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            username: profile.user.username
          })
        }
      )
        .then(response => response.json())
        .then(data => {
          if (data === 'success') {
            refetchProject('uninvite-user')
            socket.emit('notification', [profile.id])
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
                  onClick={e => handleCancelProjectInvitation(e, profile)}
                />
              )}
            </ProfileListItemWithIcon>
          ))}
        </>
      )}
    </>
  )
}
