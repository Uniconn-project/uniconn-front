import React, { useContext, useState } from 'react'
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js'
import CircularProgress from '@material-ui/core/CircularProgress'
import RichTextEditor from './components/RichTextEditor'
import { MyProfileContext } from '../../../../../contexts/MyProfile'
import { AuthContext } from '../../../../../contexts/Auth'

export default function Description({ project, refetchProject }) {
  const { myProfile } = useContext(MyProfileContext)
  const { getToken } = useContext(AuthContext)

  const [isEditing, setIsEditing] = useState(false)
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(
      // replacing all single quotes to double quotes to avoid json parsing issues
      convertFromRaw(JSON.parse(project.description.replace(/'/g, '"')))
    )
  )

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
          refetchProject('edit-description')
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
      <RichTextEditor
        canEdit={project.students
          .map(profile => profile.id)
          .includes(myProfile.id)}
        editorState={editorState}
        setEditorState={setEditorState}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        handleSubmit={handleSubmit}
      />
    </div>
  )
}
