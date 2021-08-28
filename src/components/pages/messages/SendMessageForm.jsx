import React, { useContext, useState } from 'react'
import SendIcon from '@material-ui/icons/Send'
import { MyProfileContext } from '../../../contexts/MyProfile'
import { WebSocketsContext } from '../../../contexts/WebSockets'
import { AuthContext } from '../../../contexts/Auth'

export default function SendMessageForm({
  chatRef,
  useChat,
  setChatMessages,
  setErrorMsg
}) {
  const { myProfile } = useContext(MyProfileContext)
  const { socket } = useContext(WebSocketsContext)
  const { getToken } = useContext(AuthContext)

  const [messageContent, setMessageContent] = useState('')
  const [chat, setChat] = useChat()

  const handleSubmit = async e => {
    e.preventDefault()
    if (messageContent.trim() === '') {
      setErrorMsg({
        isOpen: true,
        message: 'A mensagem não pode ser vazia!'
      })
      return
    }
    setChat(chat => ({
      ...chat,
      tempMessages: [
        ...chat.tempMessages,
        {
          id: Math.random(),
          sender: {
            id: myProfile.id
          },
          content: messageContent
        }
      ]
    }))
  
    if (messageContent.trim() === '') return
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/chats/create-message/${chat.id}`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: 'JWT ' + (await getToken())
        },
        body: JSON.stringify({
          content: messageContent
        })
      }
    ).then(response =>
      response.json().then(data => {
        if (response.ok) {
          setChatMessages([data], true)
          socket.emit(
            'message',
            chat.members.map(profile => profile.id),
            chat.id
          )
        } else {
          setErrorMsg({
            isOpen: true,
            message: data
          })
        }
      })
    )
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
