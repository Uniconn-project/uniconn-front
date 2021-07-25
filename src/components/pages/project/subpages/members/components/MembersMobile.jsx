import React, { useContext, useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import AnimateHeight from 'react-animate-height'
import AddMembersModal from './components/AddMembersModal'
import AskToJoinProjectModal from './components/AskToJoinProjectModal'
import { MyProfileContext } from '../../../../../../contexts/MyProfile'
import DescriptiveHeader from '../../../../../global/DescriptiveHeader'
import MembersList from './components/MembersList'

export default function Members({ project, refetchProject }) {
  const { myProfile } = useContext(MyProfileContext)

  const [studentListIsOpen, setStudentListIsOpen] = useState(false)
  const [mentorListIsOpen, setMentorListIsOpen] = useState(false)
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
      <div className="">
        <div className="px-2 pt-2">
          <DescriptiveHeader
            title={`Universitários (${project.students.length})`}
            description="Os universitários são protagonistas no projeto, aqueles que de fato colocam a mão na massa.
            Somente universitários podem editar os dados e descrição do projeto."
            onClick={() => setStudentListIsOpen(!studentListIsOpen)}
          >
            <ArrowForwardIosIcon
              className="icon-sm transition-300"
              style={{
                transform: `rotate(${studentListIsOpen ? '90deg' : '0'})`
              }}
            />
          </DescriptiveHeader>
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
          <AnimateHeight height={studentListIsOpen ? 'auto' : 0}>
            <MembersList
              type="students"
              project={project}
              refetchProject={refetchProject}
              projectStudentsId={projectStudentsId}
              projectMembersId={projectMembersId}
              setErrorMsg={setErrorMsg}
            />
          </AnimateHeight>
        </div>
        <div className="px-2 pt-2">
          <DescriptiveHeader
            title={`Mentores (${project.mentors.length})`}
            description="Os mentores são usuários que possuem conhecimento e experiência em áreas específicas,
             podendo assim direcionar e auxiliar os universitários do projeto."
            onClick={() => setMentorListIsOpen(!mentorListIsOpen)}
          >
            <ArrowForwardIosIcon
              className="icon-sm transition-300"
              style={{
                transform: `rotate(${mentorListIsOpen ? '90deg' : '0'})`
              }}
            />
          </DescriptiveHeader>
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
          <AnimateHeight height={mentorListIsOpen ? 'auto' : 0}>
            <MembersList
              type="mentors"
              project={project}
              refetchProject={refetchProject}
              projectStudentsId={projectStudentsId}
              projectMembersId={projectMembersId}
              setErrorMsg={setErrorMsg}
            />
          </AnimateHeight>
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
