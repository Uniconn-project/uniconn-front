import React, { useContext, useState, useRef, useEffect } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import Page from '../components/Page'
import Chat from '../components/pages/messages/Chat'
import Chats from '../components/pages/messages/Chats'
import { MyProfileContext } from '../contexts/MyProfile'
import { AuthContext } from '../contexts/Auth'
import { WebSocketsContext } from '../contexts/WebSockets'

export default function Messages() {
  const { myProfile } = useContext(MyProfileContext)
  const { isAuthenticated, getToken } = useContext(AuthContext)
  const { socket, socketEvent } = useContext(WebSocketsContext)

  const [chats, setChats] = useState(null)
  const [openedChatId, setOpenedChatId] = useState(null)
  const [tempMessages, setTempMessages] = useState([])
  const [errorMsg, setErrorMsg] = useState({
    isOpen: false,
    message: ''
  })

  const chatRef = useRef(null)

  useEffect(() => {
    if (!isAuthenticated) return
    fetchInitialChats()
  }, [isAuthenticated]) // eslint-disable-line

  useEffect(() => {
    if (!chats) return

    if (socketEvent.type === 'message') {
      fetchUnvisualizedMessages(socketEvent.chatId)
    }

    if (socketEvent.type === 'message-visualization') {
      setChatMessagesVisualization(
        socketEvent.viewerProfileId,
        socketEvent.chatId
      )
    }

    if (socketEvent.type === 'message-typing') {
      if (socketEvent.typerProfileId === myProfile.id) return

      setChatTyping(
        socketEvent.boolean,
        socketEvent.typerProfileId,
        socketEvent.chatId
      )
    }
  }, [socketEvent]) // eslint-disable-line

  useEffect(() => {
    if (!openedChatId) return
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
    if (chats[openedChatId].unvisualized_messages_number) {
      visualizeChatMessages(openedChatId)
    }
  }, [openedChatId]) // eslint-disable-line

  const fetchInitialChats = async () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/chats/get-chats-list`, {
      headers: {
        Authorization: 'JWT ' + (await getToken())
      }
    }).then(response =>
      response.json().then(data => {
        if (response.ok) {
          const chatsObj = {}
          for (const chat of data) {
            chatsObj[chat.id] = initializeChat(chat)
          }
          setChats(chatsObj)
        } else {
          setErrorMsg({
            isOpen: true,
            message: data
          })
        }
      })
    )
  }

  const initializeChat = chat => ({
    ...chat,
    scrollIndex: 1,
    fullyRendered: false,
    messages: sortMessages(chat.messages),
    typing: {
      boolean: false,
      typerProfile: null
    }
  })

  const sortMessages = messages => {
    return messages.sort((firstMessage, secondMessage) => {
      return firstMessage.created_at < secondMessage.created_at ? -1 : 1
    })
  }

  const setChatMessages = (chatId, messages, keepCurrent = false) => {
    setChats(chats => ({
      ...chats,
      [chatId]: {
        ...chats[chatId],
        messages: keepCurrent
          ? sortMessages([...chats[chatId].messages, ...messages])
          : sortMessages(messages)
      }
    }))
    setTempMessages([])
  }

  const setChatMessagesVisualization = (visualizerProfileId, chatId) => {
    setChats(chats => ({
      ...chats,
      [chatId]: {
        ...chats[chatId],
        messages: chats[chatId].messages.map(message =>
          message.visualized_by.includes(visualizerProfileId)
            ? message
            : {
                ...message,
                visualized_by: [...message.visualized_by, visualizerProfileId]
              }
        )
      }
    }))
  }

  const setChatTyping = (boolean, typerProfileId, chatId) => {
    setChats(chats => ({
      ...chats,
      [chatId]: {
        ...chats[chatId],
        typing: {
          boolean,
          typerProfile: chats[chatId].members.find(
            profile => profile.id === typerProfileId
          )
        }
      }
    }))
  }

  const fetchUnvisualizedMessages = async chatId => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/chats/get-chat-messages/${chatId}?unvisualized-only=true`,
      {
        headers: {
          Authorization: 'JWT ' + (await getToken())
        }
      }
    ).then(response =>
      response.json().then(data => {
        if (response.ok) {
          if (chatId === openedChatId && data.messages.length) {
            visualizeChatMessages(chatId)
          }
          setChatMessages(chatId, data.messages, true)
          setChats(chats => ({
            ...chats,
            [chatId]: {
              ...chats[chatId],
              unvisualized_messages_number: data.messages.length,
              typing: {
                boolean: false,
                typerProfile: null
              }
            }
          }))
          if (chatRef.current && chatId === openedChatId) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight
          }
        } else {
          setErrorMsg({
            isOpen: true,
            message: data
          })
        }
      })
    )
  }

  const visualizeChatMessages = async chatId => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/chats/visualize-chat-messages/${chatId}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: 'JWT ' + (await getToken())
        }
      }
    ).then(response =>
      response.json().then(data => {
        if (response.ok) {
          socket.emit(
            'message-visualization',
            myProfile.id,
            chats[chatId].members.map(profile => profile.id),
            chatId
          )
          setChats(chats => ({
            ...chats,
            [chatId]: {
              ...chats[chatId],
              unvisualized_messages_number: 0
            }
          }))
        } else {
          setErrorMsg({
            isOpen: true,
            message: data
          })
        }
      })
    )
  }

  if (!myProfile.id) {
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
          <div className="w-72">
            <div className="fixed top-32">
              <Chats
                useChats={() => [chats, setChats]}
                useOpenedChatId={() => [openedChatId, setOpenedChatId]}
                initializeChat={initializeChat}
                setErrorMsg={setErrorMsg}
              />
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
            {openedChatId === null ? (
              <div className="flex-basis-full flex flex-col justify-center items-center bg-transparent rounded-md shadow-lg">
                <div className="w-4/5 flex flex-col items-start sm:w-1/2">
                  <span className="text-2xl color-headline mb-2">
                    Você não tem uma conversa selecionada!
                  </span>
                  <span className="text-sm mb-4">
                    Escolha uma das conversas existentes ou crie uma nova.
                  </span>
                </div>
              </div>
            ) : (
              <Chat
                chatRef={chatRef}
                useChats={() => [chats, setChats]}
                useTempMessages={() => [tempMessages, setTempMessages]}
                openedChatId={openedChatId}
                setChatMessages={setChatMessages}
                setErrorMsg={setErrorMsg}
              />
            )}
          </div>
          <Snackbar
            open={errorMsg.isOpen}
            autoHideDuration={6000}
            onClose={() =>
              setErrorMsg({
                isOpen: false,
                message: ''
              })
            }
          >
            <Alert severity="error">{errorMsg.message}</Alert>
          </Snackbar>
        </section>
      </div>
    </Page>
  )
}
