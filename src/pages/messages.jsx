import React, { useContext, useEffect, useState } from 'react'
import Page from '../components/Page'
import ProfileInfo from '../components/global/profile-info/ProfileInfo'
import io from 'socket.io-client'
import { MyProfileContext } from '../contexts/MyProfile'
import SendMessageForm from '../components/pages/messages/SendMessageForm'

const socket = io('ws://localhost:8080')

export default function Messages() {
  const { myProfile } = useContext(MyProfileContext)
  const [messages, setMessages] = useState([])

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected')
    })
    socket.on('message', data => {
      setMessages(messages => [...messages, data])
    })
  }, [])

  return (
    <Page title="Mensagens | Uniconn" page="messages" loginRequired header>
      <div className="flex justify-center w-full">
        <div className="hidden lg:w-1/3 lg:flex lg:justify-end lg:mr-10 lg:box-border">
          <div className="w-60">
            <div className="h-full fixed top-32">
              <ProfileInfo profile={myProfile} />
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center p-2 pt-0 lg:p-0 lg:w-2/3 lg:justify-start lg:box-border">
          <div
            className="w-full flex flex-col h-4/5"
            style={{ maxWidth: 600, maxHeight: '50rem' }}
          >
            <div className="w-full flex items-center bg-light h-14 rounded-md shadow-lg p-2 mb-4">
              <h3 className="color-paragraph">Mensagens</h3>
            </div>
            <div className="w-full flex flex-col flex-grow bg-transparent rounded-md shadow-lg">
              <div className="p-2 flex-grow b-bottom-light">
                {messages.map(message => (
                  <p key={message.id}>{message.content}</p>
                ))}
              </div>
              <SendMessageForm socket={socket} />
            </div>
          </div>
        </div>
      </div>
    </Page>
  )
}
