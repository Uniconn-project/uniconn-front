import React from 'react'

export default function Description({ project }) {
  return (
    <div className="w-full p-4 bg-transparent rounded-md shadow-lg">
      {project.description}
    </div>
  )
}
