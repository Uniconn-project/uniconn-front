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
          Ferramentas de desenvolvimento são aquelas utilizadas no
          desenvolvimento de uma solução tecnológica como um site ou aplicativo.
          São comumente utilizadas para desenvolver mockups e mvps funcionais.
          Para mockups, recomendamos a plataforma Figma.
        </span>
      </div>
      <div className="pl-4">{children}</div>
    </div>
  )
}
