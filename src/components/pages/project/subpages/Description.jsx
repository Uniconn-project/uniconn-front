import React, { useContext } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { MyProfileContext } from '../../../../contexts/MyProfile'

export default function Description({ project }) {
  const { myProfile } = useContext(MyProfileContext)

  if (!project) {
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
          <button className="btn-primary btn-sm">Editar</button>
        </div>
      )}
      <div className="w-full p-4">{project.description}</div>
    </div>
  )
}
