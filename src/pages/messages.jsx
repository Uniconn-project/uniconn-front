import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback
} from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import Page from '../components/Page'
import io from 'socket.io-client'
import Chat from '../components/pages/messages/Chat'
import { MyProfileContext } from '../contexts/MyProfile'
import Chats from '../components/pages/messages/Chats'
import { AuthContext } from '../contexts/Auth'

export default function Messages() {
  const { myProfile } = useContext(MyProfileContext)
  const { getToken } = useContext(AuthContext)

  const [openedChat, setOpenedChat] = useState(null)
  const [messages, setMessages] = useState(null)
  const [chats, setChats] = useState(null)
  const [errorMsg, setErrorMsg] = useState({
    isOpen: false,
    message: ''
  })

  const chatRef = useRef(null)
  const socketRef = useRef(null)

  const fetchMessages = useCallback(async () => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/chats/get-chat-messages/${openedChat.id}`,
      {
        headers: {
          Authorization: 'JWT ' + (await getToken())
        }
      }
    ).then(response =>
      response.json().then(data => {
        if (response.ok) {
          setMessages(data)
        } else {
          setErrorMsg({
            isOpen: true,
            message: data
          })
        }
      })
    )
  }, [openedChat, getToken])

  const fetchChats = useCallback(async () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/chats/get-chats-list`, {
      headers: {
        Authorization: 'JWT ' + (await getToken())
      }
    }).then(response =>
      response.json().then(data => {
        if (response.ok) {
          setChats(data)
        } else {
          setErrorMsg({
            isOpen: true,
            message: data
          })
        }
      })
    )
  }, [getToken])

  useEffect(() => {
    socketRef.current = io('ws://localhost:3030')

    socketRef.current.on('connect', () => {
      console.log('connected')
    })

    socketRef.current.on('message', data => {
      fetchMessages()
      fetchChats()
    })

    return () => socketRef.current.disconnect()
  }, [fetchMessages]) // eslint-disable-line

  useEffect(() => {
    if (!openedChat) return

    socketRef.current.emit('join-room', openedChat.id)
    setMessages(null)
    fetchMessages()
  }, [openedChat]) // eslint-disable-line

  if (!myProfile || !socketRef) {
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
          <div className="w-60">
            <div className="fixed top-32">
              <Chats
                chats={chats}
                fetchChats={fetchChats}
                setOpenedChat={setOpenedChat}
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
            <Chat
              socket={socketRef.current}
              chat={openedChat}
              chatRef={chatRef}
              useMessages={() => [messages, setMessages]}
              setErrorMsg={setErrorMsg}
            />
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
