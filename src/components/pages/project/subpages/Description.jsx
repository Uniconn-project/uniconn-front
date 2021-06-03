import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

export default function Description({ project }) {
  if (!project) {
    return (
      <div className="w-full flex justify-center mt-10">
        <CircularProgress />
      </div>
    )
  }

  return (
    <div className="w-full p-4 bg-transparent rounded-md shadow-lg">
      {project.description}
    </div>
  )
}
