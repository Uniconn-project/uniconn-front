import React, { useContext, useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import DeleteIcon from '@material-ui/icons/Delete'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import ListAltIcon from '@material-ui/icons/ListAlt'
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder'
import ToolsHeader from './components/ToolsHeader'
import AddToolModal from './components/AddToolModal'
import { MyProfileContext } from '../../../../../contexts/MyProfile'
import { AuthContext } from '../../../../../contexts/Auth'

export default function Links({ project, refetchProject }) {
  const { myProfile } = useContext(MyProfileContext)
  const { getToken } = useContext(AuthContext)

  const [errorMsg, setErrorMsg] = useState({
    isOpen: false,
    message: ''
  })

  if (!project) {
    return (
      <div className="w-full flex justify-center mt-10">
        <CircularProgress />
      </div>
    )
  }

  return (
    <div className="p-2">
      <ToolsHeader />
      <AddToolModal project={project} refetchProject={refetchProject}>
        <div>
          <div className="flex items-center w-full">
            <ListAltIcon className="color-primary mr-2" />
            <strong className="color-primary">
              Adicionar gerenciador de tarefas
            </strong>
          </div>
          <span className="text-xs">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
            architecto quidem totam a facere, voluptates laborum nam consequatur
            vero et officiis repellendus amet eius recusandae dignissimos
            pariatur nobis cum! Asperiores.
          </span>
        </div>
      </AddToolModal>
      <AddToolModal project={project} refetchProject={refetchProject}>
        <div>
          <div className="flex items-center w-full">
            <CreateNewFolderIcon className="color-primary mr-2" />
            <strong className="color-primary">Adicionar nuvem</strong>
          </div>
          <span className="text-xs">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
            architecto quidem totam a facere, voluptates laborum nam consequatur
            vero et officiis repellendus amet eius recusandae dignissimos
            pariatur nobis cum! Asperiores.
          </span>
        </div>
      </AddToolModal>
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
