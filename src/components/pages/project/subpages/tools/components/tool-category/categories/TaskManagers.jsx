import React from 'react'
import ListAltIcon from '@material-ui/icons/ListAlt'

export default function TaskManagers({ children }) {
  return (
    <div>
      <div className="p-2 pl-4 mb-2 cursor-default bg-transparent rounded-md shadow-lg">
        <div className="flex items-center w-full">
          <ListAltIcon className="color-primary mr-2" />
          <strong className="color-primary">Gerenciadores de tarefas</strong>
        </div>
        <span className="text-xs">
          Gerenciadores de tarefas são ferramentas úteis para manter o
          operacional do projeto organizado e aumentar a produtividade da
          equipe. São comumente utilizados para fazer lista de tarefas,
          roadmaps, kanbans, etc. Recomendamos a plataforma Trello.
        </span>
      </div>
      <div className="pl-4">{children}</div>
    </div>
  )
}
