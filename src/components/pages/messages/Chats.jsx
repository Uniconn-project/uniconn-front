import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import SearchIcon from '@material-ui/icons/Search'
import CircularProgress from '@material-ui/core/CircularProgress'
import { MyProfileContext } from '../../../contexts/MyProfile'

export default function Chats({ chats, fetchChats, setOpenedChat }) {
  const { myProfile } = useContext(MyProfileContext)

  const [chatSearch, setChatSearch] = useState('')

  useEffect(() => {
    fetchChats()
  }, [fetchChats])

  return (
    <div
      className="relative flex flex-col bg-transparent rounded-md shadow-lg pt-4 w-full overflow-y-auto md:max-w-2xl lg:w-60"
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
      <div className="pt-2 flex-basis-full overflow-y-auto">
        {chats !== null ? (
          chats.map(chat => {
            const otherProfile = chat.members.find(
              profile => profile.id !== myProfile.id
            )

            return (
              <div
                key={chat.id}
                className="w-full flex flex-col items-start p-2 cursor-pointer bg-transparent-hover b-bottom-light"
                onClick={() => setOpenedChat(chat)}
              >
                <div className="flex">
                  <div className="profile-img-md mr-2">
                    <Image src={otherProfile.photo} layout="fill" />
                  </div>
                  <div>
                    <h5>
                      {otherProfile.first_name} {otherProfile.last_name}
                    </h5>
                    <p className="self-start break-all color-secondary">
                      @{otherProfile.user.username}
                    </p>
                  </div>
                </div>
                <div className="w-full flex items-start ml-auto mr-4 mt-1">
                  <span className="whitespace-nowrap overflow-ellipsis overflow-hidden">
                    {chat.last_message}
                  </span>
                </div>
              </div>
            )
          })
        ) : (
          <CircularProgress size={20} />
        )}
      </div>
    </div>
  )
}
