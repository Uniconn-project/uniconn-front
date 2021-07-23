import React, { useContext, useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import CloseIcon from '@material-ui/icons/Close'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import ProfileListItem from '../../../../../global/ProfileListItem'
import ProfileListItemWithIcon from '../../../../../global/ProfileListItemWithIcon'
import AddMembersModal from '../components/AddMembersModal'
import AskToJoinProjectModal from '../components/AskToJoinProjectModal'
import SettingsPopover from '../components/SettingsPopover'
import LeaveProject from '../components/LeaveProject'
import { MyProfileContext } from '../../../../../../contexts/MyProfile'
import { AuthContext } from '../../../../../../contexts/Auth'

export default function Members({ project, refetchProject }) {
  const { myProfile } = useContext(MyProfileContext)
  const { getToken } = useContext(AuthContext)

  const [errorMsg, setErrorMsg] = useState({
    isOpen: false,
    message: ''
  })

  const projectStudentsId = project.students.map(profile => profile.id)

  const projectMentorsId = project.mentors.map(profile => profile.id)

  const projectMembersId = projectStudentsId.concat(
    project.mentors.map(profile => profile.id)
  )

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

  if (!myProfile || !project) {
    return (
      <div className="w-full flex justify-center">
        <CircularProgress size={30} />
      </div>
    )
  }

  return (
    <div className="w-full flex py-4 pt-0">
      <div className="p-2 flex-grow">
        {projectStudentsId.includes(myProfile.id) && (
          <AddMembersModal
            type="student"
            project={project}
            refetchProject={refetchProject}
          />
        )}
        {projectMembersId.includes(myProfile.id) ? (
          <LeaveProject
            project={project}
            refetchProject={refetchProject}
            setErrorMsg={setErrorMsg}
          />
        ) : (
          <AskToJoinProjectModal
            type="student"
            project={project}
            refetchProject={refetchProject}
          />
        )}
        {projectStudentsId.includes(myProfile.id) ? (
          <>
            {project.students.map(profile => (
              <>
                <ProfileListItemWithIcon key={profile.id} profile={profile}>
                  {profile.id !== myProfile.id && (
                    <SettingsPopover
                      profile={profile}
                      project={project}
                      refetchProject={refetchProject}
                      setErrorMsg={setErrorMsg}
                    />
                  )}
                </ProfileListItemWithIcon>
              </>
            ))}
          </>
        ) : (
          <>
            {project.students.map(profile => (
              <ProfileListItem key={profile.id} profile={profile} />
            ))}
          </>
        )}
        {projectMembersId.includes(myProfile.id) && (
          <>
            {project.pending_invited_students.map(profile => (
              <>
                {projectStudentsId.includes(myProfile.id) ? (
                  <ProfileListItemWithIcon
                    key={profile.id}
                    profile={profile}
                    className="filter brightness-50"
                  >
                    <CloseIcon
                      className="icon-sm color-red-hover"
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
      <div className="p-2 flex-grow">
        {projectStudentsId.includes(myProfile.id) && (
          <AddMembersModal
            type="mentor"
            project={project}
            refetchProject={refetchProject}
          />
        )}
        {projectMembersId.includes(myProfile.id) ? (
          <LeaveProject
            project={project}
            refetchProject={refetchProject}
            setErrorMsg={setErrorMsg}
          />
        ) : (
          <AskToJoinProjectModal
            type="mentor"
            project={project}
            refetchProject={refetchProject}
          />
        )}
        {projectStudentsId.includes(myProfile.id) ? (
          <>
            {project.mentors.map(profile => (
              <>
                <ProfileListItemWithIcon key={profile.id} profile={profile}>
                  {profile.id !== myProfile.id && (
                    <SettingsPopover
                      profile={profile}
                      project={project}
                      refetchProject={refetchProject}
                      setErrorMsg={setErrorMsg}
                    />
                  )}
                </ProfileListItemWithIcon>
              </>
            ))}
          </>
        ) : (
          <>
            {project.mentors.map(profile => (
              <ProfileListItem key={profile.id} profile={profile} />
            ))}
          </>
        )}
        {projectMentorsId.includes(myProfile.id) && (
          <>
            {project.pending_invited_mentors.map(profile => (
              <>
                {project.includes(myProfile.id) ? (
                  <ProfileListItemWithIcon
                    key={profile.id}
                    profile={profile}
                    className="filter brightness-50"
                  >
                    <CloseIcon
                      className="icon-sm color-red-hover"
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
      <Snackbar
        open={errorMsg.isOpen}
        autoHideDuration={6000}
        onClose={() =>
          setErrorMsg({
            isOpen: false,
            message: ''
          })
        }
      >
        <Alert severity="error">{errorMsg.message}</Alert>
      </Snackbar>
    </div>
  )
}
