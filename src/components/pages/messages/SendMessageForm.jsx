import React, { useContext, useState } from 'react'
import SendIcon from '@material-ui/icons/Send'
import { MyProfileContext } from '../../../contexts/MyProfile'

export default function SendMessageForm({ socket, setMessages }) {
  const { myProfile } = useContext(MyProfileContext)

  const [messageContent, setMessageContent] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    const message = {
      id: Math.random(),
      sender: {
        id: myProfile.id
      },
      receiver: {
        id: myProfile.id === 3 ? 105 : 3
      },
      content: messageContent,
      timestamp: Date.now()
    }
    socket.emit('message', message)
    setMessages(messages => [...messages, message])
    setMessageContent('')
  }

  return (
    <form className="flex p-3" onSubmit={handleSubmit}>
      <input
        type="text"
        className="bg-none flex-grow"
        placeholder="Digite uma mensagem..."
        value={messageContent}
        onChange={e => setMessageContent(e.target.value)}
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
