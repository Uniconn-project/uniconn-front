import React, { useContext, useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import CloseIcon from '@material-ui/icons/Close'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import ProfileListItemWithIcon from '../../../../../global/ProfileListItemWithIcon'
import AddMembersModal from './components/AddMembersModal'
import AskToJoinProjectModal from './components/AskToJoinProjectModal'
import SettingsPopover from './components/SettingsPopover'
import { MyProfileContext } from '../../../../../../contexts/MyProfile'
import { AuthContext } from '../../../../../../contexts/Auth'
import DescriptiveHeader from '../../../../../global/DescriptiveHeader'

export default function Members({ project, refetchProject }) {
  const { myProfile } = useContext(MyProfileContext)
  const { getToken } = useContext(AuthContext)

  const [errorMsg, setErrorMsg] = useState({
    isOpen: false,
    message: ''
  })

  const projectStudentsId = project.students.map(profile => profile.id)

  const projectMembersId = projectStudentsId.concat(
    project.mentors.map(profile => profile.id)
  )

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

  if (!myProfile || !project) {
    return (
      <div className="w-full flex justify-center">
        <CircularProgress size={30} />
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="flex">
        <div className="p-2 w-1/2">
          <DescriptiveHeader
            title={`Universitários (${project.students.length})`}
            description="Os universitários são protagonistas no projeto, aqueles que de fato colocam a mão na massa.
            Somente universitários podem editar os dados e descrição do projeto."
          />
          {projectStudentsId.includes(myProfile.id) ? (
            <AddMembersModal
              type="student"
              project={project}
              refetchProject={refetchProject}
            />
          ) : (
            <>
              {myProfile.type === 'student' && (
                <AskToJoinProjectModal
                  type="student"
                  project={project}
                  refetchProject={refetchProject}
                />
              )}
            </>
          )}
          {project.students.map(profile => (
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
              {project.pending_invited_students.map(profile => (
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
        </div>
        <div className="p-2 w-1/2">
          <DescriptiveHeader
            title={`Mentores (${project.mentors.length})`}
            description="Os mentores são usuários que possuem conhecimento e experiência em áreas específicas,
             podendo assim direcionar e auxiliar os universitários do projeto."
          />
          {projectStudentsId.includes(myProfile.id) ? (
            <AddMembersModal
              type="mentor"
              project={project}
              refetchProject={refetchProject}
            />
          ) : (
            <>
              {myProfile.type === 'mentor' && (
                <AskToJoinProjectModal
                  type="mentor"
                  project={project}
                  refetchProject={refetchProject}
                />
              )}
            </>
          )}
          {project.mentors.map(profile => (
            <ProfileListItemWithIcon key={profile.id} profile={profile}>
              {(projectStudentsId.includes(myProfile.id) ||
                profile.id === myProfile.id) && (
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
              {project.pending_invited_mentors.map(profile => (
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
        </div>
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
