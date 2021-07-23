import React from 'react'
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

export default function LinkIconResolver({ url }) {
  for (const pair of linkIconsPairs) {
    if (url.includes(pair[0])) return pair[1]
  }
  return <LinkIcon className="icon-sm mr-2" />
}
