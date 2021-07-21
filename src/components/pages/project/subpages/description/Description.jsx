import React, { useContext, useState } from 'react'
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js'
import CircularProgress from '@material-ui/core/CircularProgress'
import RichTextEditor from './components/RichTextEditor'
import { MyProfileContext } from '../../../../../contexts/MyProfile'
import { AuthContext } from '../../../../../contexts/Auth'
import DescriptiveHeader from '../../../../global/DescriptiveHeader'

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
        if (data === 'success') {
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
    <div className="p-2">
      <DescriptiveHeader
        title="Descrição do projeto"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Integer nec nisi lobortis, viverra quam eu, ultricies leo.
        Proin a dictum ipsum. Pellentesque nec nulla in est porta maximus.
        Aenean pellentesque tortor non lorem vestibulum luctus.
        Sed ornare eros ac ante tempor aliquet.
        Maecenas blandit, massa a feugiat sollicitudin, neque leo posuere odio, vel pharetra magna eros nec lectus. Quisque blandit imperdiet egestas."
      />
      <div className="w-full bg-transparent rounded-md shadow-lg">
        <RichTextEditor
          canEdit={project.students
            .map(profile => profile.id)
            .includes(myProfile.id)}
          editorState={editorState}
          isEditing={isEditing}
          setEditorState={setEditorState}
          setIsEditing={setIsEditing}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  )
}
