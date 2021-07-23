import React from 'react'
import CodeIcon from '@material-ui/icons/Code'

export default function DevelopmentTools({ children }) {
  return (
    <div>
      <div className="p-2 pl-4 mb-2 cursor-default bg-transparent rounded-md shadow-lg">
        <div className="flex items-center w-full">
          <CodeIcon className="color-primary mr-2" />
          <strong className="color-primary">
            Ferramentas de desenvolvimento
          </strong>
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
