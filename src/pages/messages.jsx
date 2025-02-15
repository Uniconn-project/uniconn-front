import React, { useContext, useState, useRef, useEffect } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
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
  const chatTypingTimerDictRef = useRef({})
  const typingIntervalRef = useRef(null)

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

      chatTypingTimerDictRef.current[socketEvent.chatId].timer = 5
      if (!chats[socketEvent.chatId].typing.boolean) {
        setChatTyping(true, socketEvent.typerProfileId, socketEvent.chatId)
      }
      if (!typingIntervalRef.current) {
        typingIntervalRef.current = setInterval(typingIntervalCallback, 1000)
      }
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

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [tempMessages])

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
            chatTypingTimerDictRef.current[chat.id] = {
              timer: 0,
              typing: false
            }
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

  const typingIntervalCallback = () => {
    let someoneIsTyping = false

    for (const chatId of Object.keys(chatTypingTimerDictRef.current)) {
      if (chatTypingTimerDictRef.current[chatId].timer) {
        someoneIsTyping = true
        chatTypingTimerDictRef.current[chatId].timer--
      } else if (chatTypingTimerDictRef.current[chatId].typing) {
        setChatTyping(false, null, chatId)
      }
    }

    if (!someoneIsTyping) {
      clearInterval(typingIntervalRef.current)
      typingIntervalRef.current = null
    }
  }

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
    chatTypingTimerDictRef.current[chatId].typing = boolean

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
      <div className="flex justify-center w-full h-full px-2 sm:px-4 md:px-6 lg:p-0">
        <section
          className={`${
            openedChatId ? 'hidden' : ''
          } w-full md:w-1/3 md:flex md:justify-end md:mr-10 md:box-border`}
        >
          <div className="flex flex-col md:w-72">
            <div className="flex-basis-14 flex-shrink-0 flex items-center bg-light rounded-md shadow-lg p-2 mb-4 md:hidden">
              <h3 className="color-paragraph">Mensagens</h3>
            </div>
            <div className="md:fixed md:top-32">
              <Chats
                useChats={() => [chats, setChats]}
                useOpenedChatId={() => [openedChatId, setOpenedChatId]}
                initializeChat={initializeChat}
                setErrorMsg={setErrorMsg}
              />
            </div>
          </div>
        </section>
        <section
          className={`${
            !openedChatId ? 'hidden' : ''
          } w-full justify-center pb-4 md:flex md:p-0 md:w-2/3 md:justify-start md:box-border`}
        >
          <div
            className="w-full h-full flex flex-col items-stretch md:max-w-600px md:h-70vh"
            style={{ maxHeight: '50rem' }}
          >
            <div className="flex-basis-14 flex-shrink-0 flex items-center bg-light rounded-md shadow-lg p-2 mb-4">
              {openedChatId !== null && (
                <div
                  className="p-1 mr-2 rounded-3xl bg-transparent-hover cursor-pointer md:hidden"
                  onClick={() => setOpenedChatId(null)}
                >
                  <ArrowBackIcon className="icon-sm color-primary" />
                </div>
              )}
              <h3 className="color-paragraph">Mensagens</h3>
            </div>
            {openedChatId === null ? (
              <div className="flex-basis-full hidden md:flex flex-col justify-center items-center bg-transparent rounded-md shadow-lg">
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
                openedChatId={openedChatId}
                useChats={() => [chats, setChats]}
                useTempMessages={() => [tempMessages, setTempMessages]}
                setChatMessages={setChatMessages}
                setErrorMsg={setErrorMsg}
              />
            )}
          </div>
        </section>
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
      </div>
    </Page>
  )
}
