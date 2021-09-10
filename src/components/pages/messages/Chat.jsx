import React, { useContext, useMemo } from 'react'
import Image from 'next/image'
import CircularProgress from '@material-ui/core/CircularProgress'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import DoneIcon from '@material-ui/icons/Done'
import DoneAllIcon from '@material-ui/icons/DoneAll'
import SendMessageForm from './SendMessageForm'
import { MyProfileContext } from '../../../contexts/MyProfile'
import { AuthContext } from '../../../contexts/Auth'
import { WebSocketsContext } from '../../../contexts/WebSockets'
import { renderTimestamp } from '../../../utils/utils'

export default function Chat({
  chatRef,
  openedChatId,
  useChats,
  useTempMessages,
  setChatMessages,
  setErrorMsg
}) {
  const { myProfile } = useContext(MyProfileContext)
  const { getToken } = useContext(AuthContext)
  const { socket } = useContext(WebSocketsContext)

  const [chats, setChats] = useChats()
  const [tempMessages, setTempMessages] = useTempMessages()

  const otherProfile = useMemo(
    () =>
      openedChatId &&
      chats[openedChatId].members.find(profile => profile.id !== myProfile.id),
    [openedChatId, chats, myProfile.id]
  )

  const handleChatScroll = e => {
    if (e.target.scrollTop === 0) {
      fetchMessages(chats[openedChatId].scrollIndex)
    }
  }

  const fetchMessages = async scrollIndex => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/chats/get-chat-messages/${chats[openedChatId].id}?scroll-index=${scrollIndex}`,
      {
        headers: {
          Authorization: 'JWT ' + (await getToken())
        }
      }
    ).then(response =>
      response.json().then(data => {
        if (response.ok) {
          const previousScrollHeight = chatRef.current.scrollHeight
          setChatMessages(chats[openedChatId].id, data.messages, true)
          setChats(chats => ({
            ...chats,
            [openedChatId]: {
              ...chats[openedChatId],
              fullyRendered: data.fully_rendered,
              scrollIndex: chats[openedChatId].scrollIndex + 1
            }
          }))
          chatRef.current.scrollTop =
            chatRef.current.scrollHeight - previousScrollHeight
        } else {
          setErrorMsg({
            isOpen: true,
            message: data
          })
        }
      })
    )
  }
  const createChatMessage = async messageContent => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/chats/create-message/${openedChatId}`,
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
          setChatMessages(chats[openedChatId].id, [data], true)
          socket.emit(
            'message',
            chats[openedChatId].members.map(profile => profile.id),
            openedChatId
          )
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
      <div className="flex-basis-full flex flex-col overflow-y-auto">
        <div className="flex p-2 b-bottom-light">
          <div className="profile-img-md mr-2">
            <Image src={otherProfile.photo} layout="fill" />
          </div>
          <div>
            <h5 className="text-xl mt-2">
              {otherProfile.first_name} {otherProfile.last_name}
            </h5>
            {chats[openedChatId].typing.boolean && (
              <p className="self-start break-all">Digitando...</p>
            )}
          </div>
        </div>
        <div
          ref={chatRef}
          className="p-4 flex-grow b-bottom-light overflow-y-auto"
          onScroll={handleChatScroll}
        >
          {!chats[openedChatId].fullyRendered &&
            chats[openedChatId].messages.length >= 20 && (
              <div className="flex justify-center">
                <CircularProgress size={30} />
              </div>
            )}
          {chats[openedChatId].messages.concat(tempMessages).map(message => (
            <div key={message.id} className="w-full flex items-center mb-2">
              <div
                className={
                  message.sender.id === myProfile.id ? 'sent' : 'received'
                }
              >
                <div id="message-content" className="p-2 pb-1">
                  <p className="color-headline break-words">
                    {message.content}
                  </p>
                  <div className="flex">
                    <span id="message-details" className="text-sm">
                      {message.created_at !== undefined ? (
                        <span className="flex items-center">
                          {renderTimestamp(message.created_at)}
                          {message.sender.id === myProfile.id &&
                            (chats[openedChatId].members.length ===
                            message.visualized_by.length ? (
                              <DoneAllIcon className="icon-xs ml-1 mb-1" />
                            ) : (
                              <DoneIcon className="icon-xs ml-1 mb-1" />
                            ))}
                        </span>
                      ) : (
                        'Enviando...'
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <SendMessageForm
          chat={chats[openedChatId]}
          createChatMessage={createChatMessage}
          setTempMessages={setTempMessages}
          setErrorMsg={setErrorMsg}
        />
      </div>
    </div>
  )
}
