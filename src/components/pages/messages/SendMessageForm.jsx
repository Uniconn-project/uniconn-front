import React, { useContext, useRef, useState } from 'react'
import SendIcon from '@material-ui/icons/Send'
import { MyProfileContext } from '../../../contexts/MyProfile'
import { WebSocketsContext } from '../../../contexts/WebSockets'

export default function SendMessageForm({
  chat,
  createChatMessage,
  setTempMessages,
  setErrorMsg
}) {
  const { myProfile } = useContext(MyProfileContext)
  const { socket } = useContext(WebSocketsContext)

  const [messageContent, setMessageContent] = useState('')
  const [typingCounter, setTypingCounter] = useState(0)

  const typingCounterDecrementIntervalRef = useRef(null)

  const handleChange = e => {
    setMessageContent(e.target.value)
    setTypingCounter(5)
    if (!typingCounterDecrementIntervalRef.current) {
      socket.emit(
        'message-typing',
        true,
        myProfile.id,
        chat.members.map(profile => profile.id),
        chat.id
      )
      typingCounterDecrementIntervalRef.current = setInterval(() => {
        if (typingCounter > 0) {
          setTypingCounter(typingCounter => typingCounter - 1)
        } else {
          socket.emit(
            'message-typing',
            false,
            myProfile.id,
            chat.members.map(profile => profile.id),
            chat.id
          )
          clearInterval(typingCounterDecrementIntervalRef.current)
          typingCounterDecrementIntervalRef.current = null
        }
      }, 1000)
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

    if (messageContent.trim() === '') return
    createChatMessage(messageContent)
    setMessageContent('')
  }

  return (
    <form className="flex p-3" onSubmit={handleSubmit}>
      {console.log(typingCounter)}
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
