import React, { useContext } from 'react'
import { MyProfileContext } from '../../../contexts/MyProfile'
import { renderTimestamp } from '../../../utils/utils'

export default function Chat({ messages, chatRef }) {
  const { myProfile } = useContext(MyProfileContext)

  return (
    <div ref={chatRef} className="p-4 flex-grow b-bottom-light overflow-y-auto">
      {messages.map(message => (
        <div key={message.id} className="w-full flex items-center mb-2">
          {console.log(message)}
          <div
            className={message.sender.id === myProfile.id ? 'sent' : 'received'}
          >
            <div className="p-2">
              <p className="color-headline">{message.content}</p>
            </div>
            <span className="text-sm">
              {renderTimestamp(message.timestamp)}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
