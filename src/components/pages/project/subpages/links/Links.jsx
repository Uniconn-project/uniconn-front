import React, { useContext, useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import DeleteIcon from '@material-ui/icons/Delete'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import LinkIcon from '@material-ui/icons/Link'
import AddLinkModal from '../../../../global/AddLinkModal'
import LinkIconResolver from '../../../../global/LinkIconResolver'
import DescriptiveHeader from '../../../../global/DescriptiveHeader'
import { AuthContext } from '../../../../../contexts/Auth'

export default function Links({ project, isProjectMember, refetchProject }) {
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

  const handleDelete = async (e, linkId) => {
    e.preventDefault()
    if (window.confirm('Remover link?')) {
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/projects/delete-link/${linkId}`,
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
      <DescriptiveHeader
        title="Links do projeto"
        description="Links são uma ótima forma dos membros de um projeto compartilharem
              informações que estão guardadas em outras
              plataformas para o público."
      />
      {isProjectMember && (
        <AddLinkModal
          project={project}
          successCallback={() => refetchProject('add-link')}
          setErrorMsg={setErrorMsg}
        >
          <div className="p-3 mb-4 cursor-pointer bg-transparent bg-hover rounded-md shadow-lg">
            <div className="flex items-center w-full">
              <LinkIcon className="color-primary mr-2" />
              <strong className="color-primary">Adicionar link</strong>
            </div>
          </div>
        </AddLinkModal>
      )}
      <div>
        {project.links.length ? (
          project.links.map(link => (
            <a
              key={link.id}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="no-underline flex items-start p-3 color-paragraph color-paragraph-hover bg-transparent rounded-md shadow-lg mb-4 bg-hover"
            >
              <LinkIconResolver url={link.href} />
              <div className="break-all">{link.name}</div>
              {isProjectMember && (
                <div
                  className="cursor-pointer ml-auto"
                  style={{ height: 'max-content' }}
                  onClick={e => handleDelete(e, link.id)}
                >
                  <DeleteIcon className="icon-sm color-paragraph color-red-hover" />
                </div>
              )}
            </a>
          ))
        ) : (
          <div className="w-full p-5 pt-2 text-center sm:pt-5">
            {isProjectMember ? (
              <span>
                O projeto não tem links. Adicione o primeiro{' '}
                <AddLinkModal
                  className="inline"
                  successCallback={() => refetchProject('add-link')}
                  setErrorMsg={setErrorMsg}
                >
                  <span className="color-primary cursor-pointer hover:underline">
                    aqui
                  </span>
                </AddLinkModal>
                .
              </span>
            ) : (
              <span>O projeto não tem links.</span>
            )}
          </div>
        )}
      </div>
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
