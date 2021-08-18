import React, { useContext, useEffect, useState } from 'react'
import SearchIcon from '@material-ui/icons/Search'
import CircularProgress from '@material-ui/core/CircularProgress'
import { AuthContext } from '../../../contexts/Auth'

export default function Chats({ setOpenedChat, setErrorMsg }) {
  const { getToken } = useContext(AuthContext)

  const [chatSearch, setChatSearch] = useState('')
  const [chats, setChats] = useState(null)

  useEffect(() => {
    ;(async () => {
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
    })()
  }, [])

  return (
    <div
      className="relative bg-transparent rounded-md shadow-lg pt-4 w-full md:max-w-2xl lg:w-60"
      style={{ height: '70vh', maxHeight: '50rem' }}
    >
      <div className="flex items-center p-2 b-bottom-light">
        <SearchIcon className="icon-sm mr-1" />
        <input
          type="text"
          className="bg-none w-full"
          placeholder="Pesquisar conversa"
          value={chatSearch}
          onChange={e => setChatSearch(e.target.value)}
        />
      </div>
      <div className="flex justify-center pt-2">
        {chats !== null ? chats.map(chat => (
          <span key={chat.id} onClick={() => setOpenedChat(chat)}>{chat.id}</span>
        )) :
        <CircularProgress size={20} />
        }
      </div>
    </div>
  )
}
