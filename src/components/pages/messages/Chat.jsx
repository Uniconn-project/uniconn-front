import React, {
  useContext,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react'
import Image from 'next/image'
import CircularProgress from '@material-ui/core/CircularProgress'
import SendMessageForm from './SendMessageForm'
import { MyProfileContext } from '../../../contexts/MyProfile'
import { AuthContext } from '../../../contexts/Auth'
import { WebSocketsContext } from '../../../contexts/WebSockets'
import { renderTimestamp } from '../../../utils/utils'

export default function Chat({
  chatRef,
  chatsFilterInputRef,
  useChat,
  fetchChats,
  setChatMessages,
  setErrorMsg
}) {
  const { myProfile } = useContext(MyProfileContext)
  const { getToken } = useContext(AuthContext)
  const { socketEvent } = useContext(WebSocketsContext)

  const [chat, setChat] = useChat()

  const otherProfile = useMemo(
    () => chat.id && chat.members.find(profile => profile.id !== myProfile.id),
    [chat, myProfile.id]
  )

  useEffect(() => {
    if (
      (socketEvent.type === 'message' ||
        socketEvent.type === 'message-visualization') &&
      chat.id &&
      socketEvent.chatId === chat.id
    ) {
      fetchMessages()
    }
  }, [socketEvent])

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  })

  const fetchMessages = async () => {
    if (!chat || !chat.id) return

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/chats/get-chat-messages/${chat.id}`,
      {
        headers: {
          Authorization: 'JWT ' + (await getToken())
        }
      }
    ).then(response =>
      response.json().then(data => {
        if (response.ok) {
          setChatMessages(data)
          fetchChats()
        } else {
          setErrorMsg({
            isOpen: true,
            message: data
          })
        }
      })
    )

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/chats/visualize-chat-messages/${chat.id}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: 'JWT ' + (await getToken())
        }
      }
    ).then(response =>
      response.json().then(data => {
        if (response.ok) {
          fetchChats()
        } else {
          setErrorMsg({
            isOpen: true,
            message: data
          })
        }
      })
    )
  }

  return (
    <div className="flex-basis-full flex flex-col bg-transparent rounded-md shadow-lg overflow-y-auto">
      {chat.id === null ? (
        <div className="flex-basis-full flex flex-col justify-center items-center">
          <div className="w-4/5 flex flex-col items-start sm:w-1/2">
            <span className="text-2xl color-headline mb-2">
              Você não tem uma conversa selecionada!
            </span>
            <span className="text-sm mb-4">
              Escolha uma das conversas existentes ou{' '}
              <span
                className="color-primary cursor-pointer hover:underline"
                onClick={() =>
                  chatsFilterInputRef.current &&
                  chatsFilterInputRef.current.focus()
                }
              >
                crie uma nova
              </span>
              .
            </span>
          </div>
        </div>
      ) : (
        <div className="flex-basis-full flex flex-col overflow-y-auto">
          <div className="flex p-2 b-bottom-light">
            <div className="profile-img-md mr-2">
              <Image src={otherProfile.photo} layout="fill" />
            </div>
            <div>
              <h5>
                {otherProfile.first_name} {otherProfile.last_name}
              </h5>
              <p className="self-start break-all color-secondary">
                @
                {
                  chat.members.find(profile => profile.id !== myProfile.id).user
                    .username
                }
              </p>
            </div>
          </div>
          <div
            ref={chatRef}
            className="p-4 flex-grow b-bottom-light overflow-y-auto"
          >
            {chat.messages.concat(chat.tempMessages).map(message => (
              <div key={message.id} className="w-full flex items-center mb-2">
                <div
                  className={
                    message.sender.id === myProfile.id ? 'sent' : 'received'
                  }
                >
                  <div id="message-content" className="p-2">
                    <p className="color-headline break-words">
                      {message.content}
                    </p>
                  </div>
                  <div className="flex">
                    <span id="message-details" className="text-sm">
                      {message.created_at !== undefined
                        ? renderTimestamp(message.created_at)
                        : 'Enviando...'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <SendMessageForm
            useChat={useChat}
            setChatMessages={setChatMessages}
            setErrorMsg={setErrorMsg}
          />
        </div>
      )}
    </div>
  )
}
