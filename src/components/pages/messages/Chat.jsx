import React, { useContext, useEffect, useMemo } from 'react'
import Image from 'next/image'
import CircularProgress from '@material-ui/core/CircularProgress'
import SendMessageForm from './SendMessageForm'
import { MyProfileContext } from '../../../contexts/MyProfile'
import { renderTimestamp } from '../../../utils/utils'

export default function Chat({
  socket,
  chat,
  chatRef,
  useMessages,
  setErrorMsg
}) {
  const { myProfile } = useContext(MyProfileContext)
  const otherProfile = useMemo(
    () => chat && chat.members.find(profile => profile.id !== myProfile.id),
    [chat, myProfile]
  )

  const [messages, setMessages] = useMessages()

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  })

  return (
    <div className="flex-basis-full flex flex-col bg-transparent rounded-md shadow-lg overflow-y-auto">
      {chat === null ? (
        <div className="flex-basis-full flex flex-col justify-center items-center">
          <div className="w-4/5 flex flex-col items-start mb-4 sm:w-1/2">
            <span className="text-2xl color-headline mb-2">
              Você não tem uma conversa selecionado!
            </span>
            <span className="text-sm mb-4">
              Escolha uma das conversas existentes ou crie uma nova.
            </span>
            <button className="btn-primary p-4">Nova conversa</button>
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
            {messages !== null ? (
              messages.map(message => (
                <div key={message.id} className="w-full flex items-center mb-2">
                  <div
                    className={
                      message.sender.id === myProfile.id ? 'sent' : 'received'
                    }
                  >
                    <div className="p-2">
                      <p className="color-headline break-words">
                        {message.content}
                      </p>
                    </div>
                    <span className="text-sm">
                      {message.created_at !== undefined
                        ? renderTimestamp(message.created_at)
                        : 'Enviando...'}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full flex justify-center">
                <CircularProgress size={20} />
              </div>
            )}
          </div>
          <SendMessageForm
            socket={socket}
            chat={chat}
            chatRef={chatRef}
            setMessages={setMessages}
            setErrorMsg={setErrorMsg}
          />
        </div>
      )}
    </div>
  )
}
