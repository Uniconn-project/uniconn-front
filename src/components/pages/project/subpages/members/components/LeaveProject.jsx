import React, { useContext } from 'react'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { AuthContext } from '../../../../../../contexts/Auth'

export default function LeaveProject({ project, refetchProject, setErrorMsg }) {
  const { getToken } = useContext(AuthContext)

  const handleLeaveProject = async () => {
    if (window.confirm('Tem certeza que deseja sair do projeto?')) {
      fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/api/projects/leave-project/${project.id}`,
        {
          method: 'PATCH',
          headers: {
            Authorization: 'JWT ' + (await getToken())
          }
        }
      )
        .then(response => response.json())
        .then(data => {
          if (data === 'success') {
            refetchProject('leave-project')
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
    <div
      className="w-full flex items-center p-2 pl-4 cursor-pointer bg-transparent bg-hover rounded-md shadow-lg"
      onClick={handleLeaveProject}
    >
      <ExitToAppIcon className="color-red mr-2" />
      <strong className="color-red">Sair do projeto</strong>
    </div>
  )
}
