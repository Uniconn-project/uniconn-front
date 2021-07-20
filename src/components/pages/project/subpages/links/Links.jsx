import React, { useContext, useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import DeleteIcon from '@material-ui/icons/Delete'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import LinkIcon from '@material-ui/icons/Link'
import RedditIcon from '@material-ui/icons/Reddit'
import FacebookIcon from '@material-ui/icons/Facebook'
import InstagramIcon from '@material-ui/icons/Instagram'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import WhatsAppIcon from '@material-ui/icons/WhatsApp'
import TelegramIcon from '@material-ui/icons/Telegram'
import YouTubeIcon from '@material-ui/icons/YouTube'
import GitHubIcon from '@material-ui/icons/GitHub'
import PinterestIcon from '@material-ui/icons/Pinterest'
import FolderIcon from '@material-ui/icons/Folder'
import LinksHeader from './components/LinksHeader'
import AddLinkModal from './components/AddLinkModal'
import { MyProfileContext } from '../../../../../contexts/MyProfile'
import { AuthContext } from '../../../../../contexts/Auth'

const linkIconsPairs = [
  ['reddit.', <RedditIcon key={0} className="icon-sm mr-2" />],
  ['facebook.', <FacebookIcon key={1} className="icon-sm mr-2" />],
  ['instagram.', <InstagramIcon key={2} className="icon-sm mr-2" />],
  ['linkedin.', <LinkedInIcon key={3} className="icon-sm mr-2" />],
  ['whatsapp.', <WhatsAppIcon key={4} className="icon-sm mr-2" />],
  ['telegram.', <TelegramIcon key={5} className="icon-sm mr-2" />],
  ['youtube.', <YouTubeIcon key={6} className="icon-sm mr-2" />],
  ['github.', <GitHubIcon key={7} className="icon-sm mr-2" />],
  ['pinterest.', <PinterestIcon key={8} className="icon-sm mr-2" />],
  ['drive.', <FolderIcon key={9} className="icon-sm mr-2" />]
]

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

  const getLinkIcon = href => {
    for (const pair of linkIconsPairs) {
      if (href.includes(pair[0])) return pair[1]
    }
    return <LinkIcon className="icon-sm mr-2" />
  }

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
                {getLinkIcon(link.href)}
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
