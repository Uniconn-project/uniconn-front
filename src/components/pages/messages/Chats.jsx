import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import SearchIcon from '@material-ui/icons/Search'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import CircularProgress from '@material-ui/core/CircularProgress'
import Badge from '@material-ui/core/Badge'
import ProfileListItem from '../../global/ProfileListItem'
import { MyProfileContext } from '../../../contexts/MyProfile'
import { AuthContext } from '../../../contexts/Auth'
import { fetcher } from '../../../hooks/useFetch'

export default function Chats({
  fetchChats,
  useChats,
  useOpenedChatId,
  initializeChat,
  setErrorMsg
}) {
  const { myProfile } = useContext(MyProfileContext)
  const { getToken } = useContext(AuthContext)

  const [chatSearch, setChatSearch] = useState('')
  const [renderedChats, setRenderedChats] = useState(null)
  const [searchedProfiles, setSearchedProfiles] = useState([])

  const [chats, setChats] = useChats()
  const [openedChatId, setOpenedChatId] = useOpenedChatId()

  const isFiltering = chatSearch !== ''

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
      Object.values(chats).filter(chat =>
        chat.members
          .find(profile => profile.id !== myProfile.id)
          .user.username.includes(chatSearch)
      )
    )
    const chatsMembersId = Object.values(chats)
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
          setChats(chats => ({
            ...chats,
            [data.id]: initializeChat(data)
          }))
          setOpenedChatId(data.id)
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
            {Object.values(renderedChats).map(chat => {
              const otherProfile = chat.members.find(
                profile => profile.id !== myProfile.id
              )

              return (
                <div key={chat.id} className="b-bottom-light b-width-1px">
                  <div
                    className={`w-full h-24 flex flex-col items-start p-2 cursor-pointer bg-transparent-hover ${
                      openedChatId && openedChatId === chat.id
                        ? 'b-right-primary'
                        : ''
                    }`}
                    onClick={() => setOpenedChatId(chat.id)}
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
                        </div>
                        <Badge
                          badgeContent={chat.unvisualized_messages_number || 0}
                          className="w-11/12"
                        >
                          <p className="self-start break-all color-secondary">
                            @{otherProfile.user.username}
                          </p>
                        </Badge>
                      </div>
                    </div>
                    <div className="w-full flex items-start ml-auto mr-4 mt-1">
                      {chat.typing.boolean ? (
                        <b className="text-lg color-primary">Digitando...</b>
                      ) : (
                        <span className="whitespace-nowrap overflow-ellipsis overflow-hidden">
                          {chat.messages.length
                            ? chat.messages[chat.messages.length - 1].content
                            : ''}
                        </span>
                      )}
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
