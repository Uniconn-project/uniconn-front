import React, { useContext } from 'react'
import CloseIcon from '@material-ui/icons/Close'
import ProfileListItemWithIcon from '../../../../../../global/ProfileListItemWithIcon'
import SettingsPopover from '../components/SettingsPopover'
import { MyProfileContext } from '../../../../../../../contexts/MyProfile'
import { AuthContext } from '../../../../../../../contexts/Auth'

export default function MembersList({
  type,
  project,
  refetchProject,
  projectStudentsId,
  projectMembersId,
  setErrorMsg
}) {
  const { myProfile } = useContext(MyProfileContext)
  const { getToken } = useContext(AuthContext)

  const handleCancelProjectInvitation = async (e, type, username) => {
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
      {project[type].map(profile => profile.id).includes(myProfile.id) && (
        <ProfileListItemWithIcon profile={myProfile}>
          <SettingsPopover
            profile={myProfile}
            project={project}
            refetchProject={refetchProject}
            setErrorMsg={setErrorMsg}
          />
        </ProfileListItemWithIcon>
      )}
      {project[type]
        .filter(profile => profile.id !== myProfile.id)
        .map(profile => (
          <ProfileListItemWithIcon key={profile.id} profile={profile}>
            {projectStudentsId.includes(myProfile.id) && (
              <SettingsPopover
                profile={profile}
                project={project}
                refetchProject={refetchProject}
                setErrorMsg={setErrorMsg}
              />
            )}
          </ProfileListItemWithIcon>
        ))}
      {projectMembersId.includes(myProfile.id) && (
        <>
          {project[`pending_invited_${type}`].map(profile => (
            <ProfileListItemWithIcon
              key={profile.id}
              profile={profile}
              className="filter brightness-50"
            >
              {projectStudentsId.includes(myProfile.id) && (
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
