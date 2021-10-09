import React, { useContext, useState } from 'react'
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js'
import CircularProgress from '@material-ui/core/CircularProgress'
import RichTextEditor from './components/RichTextEditor'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import { MyProfileContext } from '../../../../../contexts/MyProfile'
import { AuthContext } from '../../../../../contexts/Auth'
import DescriptiveHeader from '../../../../global/DescriptiveHeader'

export default function Description({
  project,
  isProjectAdmin,
  refetchProject
}) {
  const { myProfile } = useContext(MyProfileContext)
  const { getToken } = useContext(AuthContext)

  const [isEditing, setIsEditing] = useState(false)
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(
      // replacing all single quotes to double quotes to avoid json parsing issues
      convertFromRaw(JSON.parse(project.description.replace(/'/g, '"')))
    )
  )
  const [errorMsg, setErrorMsg] = useState({
    isOpen: false,
    message: ''
  })

  const handleSubmit = async () => {
    setIsEditing(false)

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/projects/edit-project-description/${project.id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
          Authorization: 'JWT ' + (await getToken())
        },
        body: JSON.stringify({
          description: convertToRaw(editorState.getCurrentContent())
        })
      }
    )
      .then(response => response.json())
      .then(data => {
        if (data === 'success') {
          refetchProject('edit-description')
        } else {
          setErrorMsg({
            isOpen: true,
            message: data
          })
        }
      })
  }

  if (!project || !myProfile.id) {
    return (
      <div className="w-full flex justify-center mt-10">
        <CircularProgress />
      </div>
    )
  }

  return (
    <div className="p-2">
      <DescriptiveHeader
        title="Descrição do projeto"
        description="A descrição de um projeto é o local onde seus admins tem total liberdade para se comunicar com o público da maneira que for mais conveniente.
         Normalmente a descrição explica melhor a ideia e propósito por trás do projeto."
      />
      <div className="w-full bg-transparent rounded-md shadow-lg">
        <RichTextEditor
          canEdit={isProjectAdmin}
          editorState={editorState}
          isEditing={isEditing}
          setEditorState={setEditorState}
          setIsEditing={setIsEditing}
          handleSubmit={handleSubmit}
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
