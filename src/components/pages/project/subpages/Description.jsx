import React, { useContext, useState } from 'react'
import { Editor, EditorState, convertToRaw, convertFromRaw } from 'draft-js'
import 'draft-js/dist/Draft.css'
import CircularProgress from '@material-ui/core/CircularProgress'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import { MyProfileContext } from '../../../../contexts/MyProfile'
import { AuthContext } from '../../../../contexts/Auth'

export default function Description({ project }) {
  const { myProfile } = useContext(MyProfileContext)
  const { getToken } = useContext(AuthContext)

  const [isEditing, setIsEditing] = useState(false)
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(
      // replacing all single quotes to double quotes to avoid json parsing issues
      convertFromRaw(JSON.parse(project.description.replace(/'/g, '"')))
    )
  )
  const [successIsOpen, setSuccessIsOpen] = useState(false)

  console.log(project.description.replace(/'/g, '"'))

  const handleSubmit = async () => {
    setIsEditing(false)

    fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/projects/edit-project-description/${project.id}`,
      {
        method: 'PUT',
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
        if (data === 'Project description edited with success!') {
          setSuccessIsOpen(true)
        } else {
          alert(`Ocorreu um erro: ${data}`)
        }
      })
  }

  if (!project || !myProfile) {
    return (
      <div className="w-full flex justify-center mt-10">
        <CircularProgress />
      </div>
    )
  }

  return (
    <div className="w-full bg-transparent rounded-md shadow-lg">
      {project.students.map(profile => profile.id).includes(myProfile.id) && (
        <div className="w-full flex justify-end b-bottom-light p-4 mb-2">
          {isEditing ? (
            <button className="btn-primary btn-sm" onClick={handleSubmit}>
              Confirmar
            </button>
          ) : (
            <button
              className="btn-primary btn-sm"
              onClick={() => setIsEditing(true)}
            >
              Editar
            </button>
          )}
        </div>
      )}
      <div className="w-full p-4">
        <Editor
          editorState={editorState}
          readOnly={!isEditing}
          onChange={setEditorState}
        />
      </div>
      <Snackbar
        open={successIsOpen}
        autoHideDuration={6000}
        onClose={() => setSuccessIsOpen(false)}
      >
        <Alert severity="success">Descrição editada com sucesso!</Alert>
      </Snackbar>
    </div>
  )
}
