import React from 'react'
import Chip from '@material-ui/core/Chip'

export default function FilterUsersToInvite() {
  return (
    <div>
      <div className="w-full p-2 flex items-center">
        <input
          type="text"
          placeholder="Pesquisar alunos..."
          className="bg-transparent p-2"
        />
      </div>
    </div>
  )
}
