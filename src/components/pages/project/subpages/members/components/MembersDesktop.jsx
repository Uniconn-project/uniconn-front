import React, { useContext, useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import AddMembersModal from './components/AddMembersModal'
import AskToJoinProjectModal from './components/AskToJoinProjectModal'
import { MyProfileContext } from '../../../../../../contexts/MyProfile'
import DescriptiveHeader from '../../../../../global/DescriptiveHeader'
import MembersList from './components/MembersList'

export default function Members({ project, refetchProject }) {
  const { myProfile } = useContext(MyProfileContext)

  const [errorMsg, setErrorMsg] = useState({
    isOpen: false,
    message: ''
  })

  const projectStudentsId = project.students.map(profile => profile.id)
  const projectMembersId = projectStudentsId.concat(
    project.mentors.map(profile => profile.id)
  )

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
          <MembersList
            type="students"
            project={project}
            refetchProject={refetchProject}
            projectStudentsId={projectStudentsId}
            projectMembersId={projectMembersId}
            setErrorMsg={setErrorMsg}
          />
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
              {!projectMembersId.includes(myProfile.id) &&
                myProfile.type === 'mentor' && (
                  <AskToJoinProjectModal
                    type="mentor"
                    project={project}
                    refetchProject={refetchProject}
                  />
                )}
            </>
          )}
          <MembersList
            type="mentors"
            project={project}
            refetchProject={refetchProject}
            projectStudentsId={projectStudentsId}
            projectMembersId={projectMembersId}
            setErrorMsg={setErrorMsg}
          />
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
