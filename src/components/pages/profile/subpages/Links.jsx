import React, { useContext, useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import DeleteIcon from '@material-ui/icons/Delete'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import LinkIcon from '@material-ui/icons/Link'
import AddLinkModal from '../../../global/AddLinkModal'
import LinkIconResolver from '../../../global/LinkIconResolver'
import { AuthContext } from '../../../../contexts/Auth'
import { MyProfileContext } from '../../../../contexts/MyProfile'

export default function Links({ profile, refetchProfile }) {
  const { myProfile } = useContext(MyProfileContext)
  const { getToken } = useContext(AuthContext)

  const [errorMsg, setErrorMsg] = useState({
    isOpen: false,
    message: ''
  })

  if (!profile) {
    return (
      <div className="w-full flex justify-center mt-10">
        <CircularProgress />
      </div>
    )
  }

  const handleDelete = async linkId => {
    if (window.confirm('Remover link?')) {
      fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/api/profiles/delete-link/${linkId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: 'JWT ' + (await getToken()),
            'Content-type': 'application/json'
          }
        }
      ).then(response =>
        response.json().then(data => {
          if (response.ok) {
            refetchProfile && refetchProfile('delete-link')
          } else {
            setErrorMsg({
              isOpen: true,
              message: data
            })
          }
        })
      )
    }
  }

  return (
    <>
      {profile.id === myProfile.id && (
        <AddLinkModal
          profile={profile}
          successCallback={() => refetchProfile('add-link')}
          setErrorMsg={setErrorMsg}
        >
          <div>
            <div className="flex items-center w-full">
              <LinkIcon className="color-primary mr-2" />
              <strong className="color-primary">Adicionar link</strong>
            </div>
          </div>
        </AddLinkModal>
      )}
      <div>
        {profile.links.map(link => (
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
            {profile.id === myProfile.id && (
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
    </>
  )
}
