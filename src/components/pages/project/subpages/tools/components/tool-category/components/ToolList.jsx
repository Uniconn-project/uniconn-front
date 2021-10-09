import React, { useContext } from 'react'
import DeleteIcon from '@material-ui/icons/Delete'
import LinkIconResolver from '../../../../../../../global/LinkIconResolver'
import { AuthContext } from '../../../../../../../../contexts/Auth'

export default function ToolList({ tools, refetchProject, setErrorMsg }) {
  const { getToken } = useContext(AuthContext)

  const handleDelete = async toolId => {
    if (window.confirm('Remover ferramenta?')) {
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/projects/delete-tool/${toolId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: 'JWT ' + (await getToken()),
            'Content-type': 'application/json'
          }
        }
      )
        .then(response => response.json())
        .then(data => {
          if (data === 'success') {
            refetchProject('delete-tool')
          } else {
            setErrorMsg({
              isOpen: true,
              message: data
            })
          }
        })
    }
  }

  return (
    <div>
      {tools.map(tool => (
        <div
          key={tool.id}
          className="flex bg-transparent rounded-md shadow-lg mb-2 bg-hover"
        >
          <a
            href={tool.href}
            target="_blank"
            rel="noreferrer"
            className="no-underline flex-grow"
          >
            <div className="flex items-center px-4 py-2 color-paragraph">
              <LinkIconResolver url={tool.href} />
              <div className="break-all">{tool.name}</div>
            </div>
          </a>
          <div
            className="cursor-pointer p-2"
            onClick={() => handleDelete(tool.id)}
          >
            <DeleteIcon className="icon-sm color-red-hover" />
          </div>
        </div>
      ))}
    </div>
  )
}
