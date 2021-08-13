import React, { useContext, useEffect, useState, useRef } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Page from '../components/Page'
import io from 'socket.io-client'
import SendMessageForm from '../components/pages/messages/SendMessageForm'
import Chat from '../components/pages/messages/Chat'
import { MyProfileContext } from '../contexts/MyProfile'
import Contacts from '../components/pages/messages/Contacts'

export default function Messages() {
  const { myProfile } = useContext(MyProfileContext)

  const [messages, setMessages] = useState([])

  const chatRef = useRef(null)
  const socketRef = useRef(null)

  useEffect(() => {
    socketRef.current = io('ws://localhost:3030')

    socketRef.current.on('connect', () => {
      console.log('connected')
    })
    socketRef.current.on('message', data => {
      setMessages(messages => [...messages, data])
    })

    return () => socketRef.current.disconnect()
  }, [])

  useEffect(() => {
    if (!myProfile) return
    socketRef.current.emit('profile-id', myProfile.id)
  }, [myProfile])

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [messages])

  if (!myProfile || !socketRef) {
    return (
      <Page title="Mensagens | Uniconn" page="messages" loginRequired header>
        <div>
          <CircularProgress />
        </div>
      </Page>
    )
  }

  return (
    <Page title="Mensagens | Uniconn" page="messages" loginRequired header>
      <div className="flex justify-center w-full h-full">
        <section className="hidden lg:w-1/3 lg:flex lg:justify-end lg:mr-10 lg:box-border">
          <div className="w-60">
            <div className="fixed top-32">
              <Contacts />
            </div>
          </div>
        </section>
        <section className="w-full flex justify-center p-2 pt-0 lg:p-0 lg:w-2/3 lg:justify-start lg:box-border">
          <div
            className="w-full flex flex-col items-stretch sm:h-70vh"
            style={{ maxWidth: 600, maxHeight: '50rem' }}
          >
            <div className="flex-basis-14 flex-shrink-0 flex items-center bg-light rounded-md shadow-lg p-2 mb-4">
              <h3 className="color-paragraph">Mensagens</h3>
            </div>
            <div className="flex-basis-full flex flex-col bg-transparent rounded-md shadow-lg overflow-y-auto">
              <Chat messages={messages} chatRef={chatRef} />
              <SendMessageForm
                socket={socketRef.current}
                setMessages={setMessages}
              />
            </div>
          </div>
        </section>
      </div>
    </Page>
  )
}
