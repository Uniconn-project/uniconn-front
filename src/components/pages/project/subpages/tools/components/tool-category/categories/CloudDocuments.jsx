import React from 'react'
import FolderIcon from '@material-ui/icons/Folder'

export default function CloudDocuments({ children }) {
  return (
    <div>
      <div className="p-2 pl-4 mb-2 cursor-default bg-transparent rounded-md shadow-lg">
        <div className="flex items-center w-full">
          <FolderIcon className="color-primary mr-2" />
          <strong className="color-primary">Documentos em nuvem</strong>
        </div>
        <span className="text-xs">
          Documentos em nuvem são ferramentas úteis para manter os arquivos
          utilizados no projeto organizados. São comumente utilizados para
          centralizar o armazenamento de imagens, documentos, vídeos, etc.
          Recomendamos a plataforma Google Drive.
        </span>
      </div>
      <div className="pl-4">{children}</div>
    </div>
  )
}
