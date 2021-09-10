import React, { useContext, useRef, useState } from 'react'
import SendIcon from '@material-ui/icons/Send'
import { MyProfileContext } from '../../../contexts/MyProfile'
import { WebSocketsContext } from '../../../contexts/WebSockets'

const typingCounterInitialValue = 5

export default function SendMessageForm({
  chat,
  createChatMessage,
  setTempMessages,
  setErrorMsg
}) {
  const { myProfile } = useContext(MyProfileContext)
  const { socket } = useContext(WebSocketsContext)

  const [messageContent, setMessageContent] = useState('')

  const typingCounterRef = useRef(typingCounterInitialValue)
  const typingCounterDecrementIntervalRef = useRef(null)

  const handleChange = e => {
    setMessageContent(e.target.value)

    if (!typingCounterDecrementIntervalRef.current) {
      socket.emit(
        'message-typing',
        true,
        myProfile.id,
        chat.members.map(profile => profile.id),
        chat.id
      )
      typingCounterDecrementIntervalRef.current = setInterval(() => {
        if (typingCounterRef.current > 0) {
          typingCounterRef.current--
        } else {
          socket.emit(
            'message-typing',
            false,
            myProfile.id,
            chat.members.map(profile => profile.id),
            chat.id
          )
          typingCounterRef.current = typingCounterInitialValue
          clearInterval(typingCounterDecrementIntervalRef.current)
          typingCounterDecrementIntervalRef.current = null
        }
      }, 1000)
    } else {
      typingCounterRef.current = typingCounterInitialValue
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (messageContent.trim() === '') {
      setErrorMsg({
        isOpen: true,
        message: 'A mensagem não pode ser vazia!'
      })
      return
    }
    setTempMessages(tempMessages => [
      ...tempMessages,
      {
        id: Math.random(),
        sender: {
          id: myProfile.id
        },
        content: messageContent
      }
    ])

    createChatMessage(messageContent)
    setMessageContent('')
  }

  return (
    <form className="flex p-3" onSubmit={handleSubmit}>
      <input
        type="text"
        className="bg-none flex-grow"
        placeholder="Digite uma mensagem..."
        value={messageContent}
        onChange={handleChange}
      />
      <div
        className="p-1 rounded-3xl cursor-pointer bg-transparent-hover"
        onClick={handleSubmit}
      >
        <SendIcon className="icon-sm" />
      </div>
    </form>
  )
}
