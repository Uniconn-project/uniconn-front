import React, { useContext, useEffect, useCallback, useState } from 'react'
import Image from 'next/image'
import SearchIcon from '@material-ui/icons/Search'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import CircularProgress from '@material-ui/core/CircularProgress'
import ProfileListItem from '../../global/ProfileListItem'
import { MyProfileContext } from '../../../contexts/MyProfile'
import { AuthContext } from '../../../contexts/Auth'
import { fetcher } from '../../../hooks/useFetch'
import { WebSocketsContext } from '../../../contexts/WebSockets'

export default function Chats({
  chatsFilterInputRef,
  fetchChats,
  useChats,
  useOpenedChat,
  setErrorMsg
}) {
  const { myProfile } = useContext(MyProfileContext)
  const { getToken } = useContext(AuthContext)
  const { socketEvent } = useContext(WebSocketsContext)

  const [chatSearch, setChatSearch] = useState('')
  const [renderedChats, setRenderedChats] = useState(null)
  const [searchedProfiles, setSearchedProfiles] = useState([])

  const [chats, setChats] = useChats()
  const [openedChat, setOpenedChat] = useOpenedChat()

  const isFiltering = chatSearch !== ''

  useEffect(() => {
    if (
      socketEvent.type === 'message' ||
      socketEvent.type === 'message-visualization'
    ) {
      fetchChats()
    }
  }, [socketEvent])

  useEffect(() => {
    fetchChats()
  }, [fetchChats])

  useEffect(() => {
    if (!isFiltering) {
      setRenderedChats(chats)
      setSearchedProfiles([])
      return
    }
    chats && filterChatsAndProfiles()
  }, [chatSearch, chats]) // eslint-disable-line

  const filterChatsAndProfiles = async () => {
    if (chatSearch.trim() === '') {
      setRenderedChats([])
      setSearchedProfiles([])
      return
    }

    setRenderedChats(
      chats.filter(chat =>
        chat.members
          .find(profile => profile.id !== myProfile.id)
          .user.username.includes(chatSearch)
      )
    )
    const chatsMembersId = chats
      .map(chat => chat.members.map(profile => profile.id))
      .flat()
    const profiles = await fetcher(
      `profiles/get-filtered-profiles/${chatSearch}`
    )
    setSearchedProfiles(
      profiles.filter(
        profile =>
          !chatsMembersId.includes(profile.id) && profile.id !== myProfile.id
      )
    )
  }

  const createNewPrivateChat = async (e, profile) => {
    e.preventDefault()

    setChatSearch('')

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/chats/create-chat`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: 'JWT ' + (await getToken())
      },
      body: JSON.stringify({
        members: [profile.user.username]
      })
    }).then(response =>
      response.json().then(data => {
        if (response.ok) {
          setOpenedChat(data)
        } else {
          setErrorMsg({
            isOpen: true,
            message: data
          })
        }
      })
    )

    setOpenedChat({
      members: [myProfile, profile],
      last_message: ''
    })
  }

  return (
    <div
      className="relative flex flex-col bg-transparent rounded-md shadow-lg w-full overflow-y-auto md:max-w-2xl lg:w-72"
      style={{ height: '70vh', maxHeight: '50rem' }}
    >
      <div className="flex b-bottom-light b-width-1px">
        <div className="flex items-center bg-light m-2 px-1 rounded-md">
          {isFiltering ? (
            <ArrowBackIcon
              className="icon-sm color-primary cursor-pointer"
              onClick={() => setChatSearch('')}
            />
          ) : (
            <SearchIcon className="icon-sm" />
          )}
          <input
            ref={chatsFilterInputRef}
            type="text"
            placeholder="Pesquisar ou criar conversa..."
            className="w-full bg-none p-2"
            value={chatSearch}
            onChange={e => setChatSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="flex-basis-full overflow-y-auto">
        {renderedChats !== null ? (
          <>
            {isFiltering && renderedChats.length > 0 && (
              <div className="flex justify-center py-2 b-bottom-light b-width-1px">
                <span>CONVERSAS</span>
              </div>
            )}
            {renderedChats.map(chat => {
              const otherProfile = chat.members.find(
                profile => profile.id !== myProfile.id
              )

              return (
                <div key={chat.id} className="b-bottom-light b-width-1px">
                  <div
                    className={`w-full flex flex-col items-start p-2 cursor-pointer bg-transparent-hover ${
                      openedChat && openedChat.id === chat.id
                        ? 'b-right-primary'
                        : ''
                    }`}
                    onClick={() => {
                      setOpenedChat(chat)
                      fetchChats()
                    }}
                  >
                    <div className="flex w-full">
                      <div className="profile-img-sm mr-2">
                        <Image src={otherProfile.photo} layout="fill" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex w-full relative">
                          <h5>
                            {otherProfile.first_name} {otherProfile.last_name}
                          </h5>
                          {chat.unvisualized_messages_number > 0 && (
                            <b className="absolute right-1 top-1 w-8 h-8 flex justify-center items-center rounded-3xl text-lg bg-primary color-headline">
                              {chat.unvisualized_messages_number}
                            </b>
                          )}
                        </div>
                        <p className="self-start break-all color-secondary">
                          @{otherProfile.user.username}
                        </p>
                      </div>
                    </div>
                    <div className="w-full flex items-start ml-auto mr-4 mt-1">
                      <span className="whitespace-nowrap overflow-ellipsis overflow-hidden">
                        {chat.messages[chat.messages.length - 1].content}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </>
        ) : (
          <div className="flex justify-center pt-2">
            <CircularProgress size={20} />
          </div>
        )}
        {isFiltering && searchedProfiles.length > 0 && (
          <div className="flex justify-center py-2 b-bottom-light b-width-1px">
            <span>PERFIS</span>
          </div>
        )}
        {searchedProfiles.map(profile => (
          <ProfileListItem
            key={profile.id}
            profile={profile}
            className="bg-transparent-hover b-bottom-light b-width-1px"
            onClick={e => createNewPrivateChat(e, profile)}
          />
        ))}
      </div>
    </div>
  )
}
