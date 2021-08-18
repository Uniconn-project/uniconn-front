import React, { useContext, useEffect, useState } from 'react'
import SendMessageForm from './SendMessageForm'
import { MyProfileContext } from '../../../contexts/MyProfile'
import { renderTimestamp } from '../../../utils/utils'

export default function Chat({ socket, chat, chatRef }) {
  const { myProfile } = useContext(MyProfileContext)
  const [messages, setMessages] = useState([])

  useEffect(() => {
    socket.on('message', data => {
      setMessages(messages => [...messages, data])
    })
  }, [])

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [messages])

  return (
      <div ref={chatRef} className="flex-basis-full flex flex-col bg-transparent rounded-md shadow-lg overflow-y-auto">
        {chat === null ? <div>Selecione um lekinho</div> : 
        <div className="flex-basis-full flex flex-col">
          <div className="p-4 flex-grow b-bottom-light overflow-y-auto">
          {messages.map(message => (
          <div key={message.id} className="w-full flex items-center mb-2">
            <div
              className={message.sender.id === myProfile.id ? 'sent' : 'received'}
            >
              <div className="p-2">
                <p className="color-headline break-words">{message.content}</p>
              </div>
              <span className="text-sm">
                {renderTimestamp(message.created_at)}
              </span>
            </div>
          </div>
          ))}
          </div>
          <SendMessageForm
          socket={socket}
          setMessages={setMessages}
          />
        </div>
        }
      </div>
  )
}
