import React, { useState } from 'react'
import SendIcon from '@material-ui/icons/Send'

export default function SendMessageForm({ socket }) {
  const [message, setMessage] = useState('')

  const handleSubmit = e => {
    e.preventDefault()

    socket.emit('message', {
      id: Math.random(),
      content: message
    })

    setMessage('')
  }

  return (
    <form className="flex p-3" onSubmit={handleSubmit}>
      <input
        type="text"
        className="bg-none flex-grow"
        placeholder="Digite uma mensagem..."
        value={message}
        onChange={e => setMessage(e.target.value)}
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
