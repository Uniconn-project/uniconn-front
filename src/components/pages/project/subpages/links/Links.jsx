import React, { useContext, useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import DeleteIcon from '@material-ui/icons/Delete'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import LinkIcon from '@material-ui/icons/Link'
import LinksHeader from './components/LinksHeader'
import AddLinkModal from './components/AddLinkModal'
import LinkIconResolver from '../../../../global/LinkIconResolver'
import { MyProfileContext } from '../../../../../contexts/MyProfile'
import { AuthContext } from '../../../../../contexts/Auth'

export default function Links({ project, refetchProject }) {
  const { myProfile } = useContext(MyProfileContext)
  const { getToken } = useContext(AuthContext)

  const [errorMsg, setErrorMsg] = useState({
    isOpen: false,
    message: ''
  })

  if (!project) {
    return (
      <div className="w-full flex justify-center mt-10">
        <CircularProgress />
      </div>
    )
  }

  const isProjectMember = project.students
    .concat(project.mentors)
    .map(profile => profile.id)
    .includes(myProfile.id)

  const handleDelete = async linkId => {
    if (window.confirm('Remover link?')) {
      fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/projects/delete-link`, {
        method: 'DELETE',
        headers: {
          Authorization: 'JWT ' + (await getToken()),
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          link_id: linkId
        })
      })
        .then(response => response.json())
        .then(data => {
          if (data === 'success') {
            refetchProject('delete-link')
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
    <div className="p-2">
      <LinksHeader />
      <div>
        {project.links.map(link => (
          <div
            key={link.id}
            className="flex bg-transparent rounded-md shadow-lg mb-4 bg-hover"
          >
            <a
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="no-underline flex-grow"
            >
              <div className="flex items-center p-4 color-paragraph">
                <LinkIconResolver url={link.href} />
                <div className="break-all">{link.name}</div>
              </div>
            </a>
            {isProjectMember && (
              <div
                className="cursor-pointer p-2"
                onClick={() => handleDelete(link.id)}
              >
                <DeleteIcon className="icon-sm color-red-hover" />
              </div>
            )}
          </div>
        ))}
      </div>
      {isProjectMember && (
        <AddLinkModal project={project} refetchProject={refetchProject}>
          <div>
            <div className="flex items-center w-full">
              <LinkIcon className="color-primary mr-2" />
              <strong className="color-primary">Adicionar link</strong>
            </div>
          </div>
        </AddLinkModal>
      )}
      <Snackbar
        open={errorMsg.isOpen}
        autoHideDuration={6000}
        onClose={() =>
          setErrorMsg({
            isOpen: false,
            message: ''
          })
        }
      >
        <Alert severity="error">{errorMsg.message}</Alert>
      </Snackbar>
    </div>
  )
}
