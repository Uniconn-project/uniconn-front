import React, { useContext, useEffect, useState, useRef } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Page from '../components/Page'
import ProfileInfo from '../components/global/profile-info/ProfileInfo'
import io from 'socket.io-client'
import { MyProfileContext } from '../contexts/MyProfile'
import SendMessageForm from '../components/pages/messages/SendMessageForm'
import Chat from '../components/pages/messages/Chat'

const socket = io('ws://localhost:3030')

export default function Messages() {
  const { myProfile } = useContext(MyProfileContext)
  const [messages, setMessages] = useState([])
  const chatRef = useRef(null)

  useEffect(() => {
    if (!myProfile) return

    socket.on('connect', () => {
      socket.emit('profile-id', myProfile.id)
    })
    socket.on('message', data => {
      setMessages(messages => [...messages, data])
      if (chatRef.current) {
        chatRef.current.scrollTop = chatRef.current.scrollHeight
      }
    })
  }, [myProfile])

  return (
    <Page title="Mensagens | Uniconn" page="messages" loginRequired header>
      <div className="flex justify-center w-full h-full">
        <div className="hidden lg:w-1/3 lg:flex lg:justify-end lg:mr-10 lg:box-border">
          <div className="w-60">
            <div className="fixed top-32">
              <ProfileInfo profile={myProfile} />
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center p-2 pt-0 lg:p-0 lg:w-2/3 lg:justify-start lg:box-border">
          <div
            className="w-full flex flex-col sm:h-70vh"
            style={{ maxWidth: 600, maxHeight: '50rem' }}
          >
            <div className="w-full flex items-center bg-light h-14 rounded-md shadow-lg p-2 mb-4">
              <h3 className="color-paragraph">Mensagens</h3>
            </div>
            <div className="w-full flex flex-col flex-grow bg-transparent rounded-md shadow-lg overflow-y-auto">
              {myProfile ? (
                <>
                  <Chat messages={messages} chatRef={chatRef} />
                  <SendMessageForm socket={socket} />
                </>
              ) : (
                <CircularProgress />
              )}
            </div>
          </div>
        </div>
      </div>
    </Page>
  )
}
