import React, { useContext } from 'react'
import { MyProfileContext } from '../../../contexts/MyProfile'

export default function Chat({ messages }) {
  const { myProfile } = useContext(MyProfileContext)

  return (
    <div className="p-2 flex-grow b-bottom-light overflow-y-auto">
      {messages.map(message => (
        <div key={message.id} className="w-full flex items-center mb-2">
          <div
            className={`p-2 ${
              message.sender.id === myProfile.id ? 'sent' : 'received'
            }`}
          >
            <p>{message.content}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
