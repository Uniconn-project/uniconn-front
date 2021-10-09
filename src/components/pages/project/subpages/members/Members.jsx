import React, { useContext, useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import AddMembersModal from './components/AddMembersModal'
import AskToJoinProjectModal from './components/AskToJoinProjectModal'
import { MyProfileContext } from '../../../../../contexts/MyProfile'
import DescriptiveHeader from '../../../../global/DescriptiveHeader'
import MembersList from './components/MembersList'

export default function Members({
  project,
  isProjectMember,
  isProjectAdmin,
  refetchProject
}) {
  const { myProfile } = useContext(MyProfileContext)

  const [errorMsg, setErrorMsg] = useState({
    isOpen: false,
    message: ''
  })

  if (!myProfile.id || !project) {
    return (
      <div className="w-full flex justify-center">
        <CircularProgress size={30} />
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="w-full p-2">
        <DescriptiveHeader
          title="Participantes do projeto"
          description="Os participantes de um projeto são divididos em dois cargos: Admin e Membro.
           Os admins tem acesso a todas as funcionalidades (convidar usuários, editar descrição, deletar discussões, etc).
           Os membros podem apenas adicionar e remover links e ferramentas."
        />
        {isProjectAdmin && (
          <AddMembersModal project={project} refetchProject={refetchProject} />
        )}
        {!isProjectMember && (
          <AskToJoinProjectModal
            project={project}
            refetchProject={refetchProject}
          />
        )}
        <MembersList
          project={project}
          refetchProject={refetchProject}
          isProjectMember={isProjectMember}
          isProjectAdmin={isProjectAdmin}
          setErrorMsg={setErrorMsg}
        />
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
