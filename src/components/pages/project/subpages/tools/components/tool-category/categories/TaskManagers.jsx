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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
          architecto quidem totam a facere, voluptates laborum nam consequatur
          vero et officiis repellendus amet eius recusandae dignissimos pariatur
          nobis cum! Asperiores.
        </span>
      </div>
      <div className="pl-4">{children}</div>
    </div>
  )
}
