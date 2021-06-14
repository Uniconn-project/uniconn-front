import React, { useContext, useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { MyProfileContext } from '../../../../../contexts/MyProfile'
import EditableDescription from './components/EditableDescription'

export default function Description({ project }) {
  const { myProfile } = useContext(MyProfileContext)

  const [isEditing, setIsEditing] = useState(false)

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
          <button
            className="btn-primary btn-sm"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Confirmar' : 'Editar'}
          </button>
        </div>
      )}
      {!isEditing ? (
        <div className="w-full p-4">
          <span>{project.description}</span>
        </div>
      ) : (
        <EditableDescription project={project} />
      )}
    </div>
  )
}
