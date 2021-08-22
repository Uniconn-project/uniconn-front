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
import Chat from '../components/pages/messages/Chat'
import Chats from '../components/pages/messages/Chats'
import { MyProfileContext } from '../contexts/MyProfile'

export default function Messages() {
  const { myProfile } = useContext(MyProfileContext)

  const [openedChat, setOpenedChat] = useState(null)
  const [errorMsg, setErrorMsg] = useState({
    isOpen: false,
    message: ''
  })

  const chatsFilterInputRef = useRef(null)
  const chatRef = useRef(null)

  if (!myProfile) {
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
                chatsFilterInputRef={chatsFilterInputRef}
                setOpenedChat={setOpenedChat}
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
            <Chat
              chat={openedChat}
              chatRef={chatRef}
              chatsFilterInputRef={chatsFilterInputRef}
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
