import React, { useContext } from 'react'
import Link from 'next/link'
import FilledInput from '@material-ui/core/FilledInput'
import { MyProfileContext } from '../../../../../../contexts/MyProfile'

export default function ReplyFrom({ discussion }) {
  const { myProfile } = useContext(MyProfileContext)

  const handleSubmit = async () => {
    window.alert('Em desenvolvimento...')
  }

  return (
    <div className="bg-transparent rounded-md shadow-lg">
      <div className="flex justify-between p-2 mb-2 b-bottom-light">
        <div className="flex flex-col sm:flex-row">
          <div className="mr-2">
            <Link href="/profile">
              <img
                src={myProfile.photo}
                className="profile-img-sm mx-0.5 cursor-pointer"
              />
            </Link>
          </div>
          <div>
            <h5>
              {myProfile.first_name} {myProfile.last_name}
            </h5>
            <p className="self-start break-all color-secondary">
              @{myProfile.user.username}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-start p-1">
        <FilledInput
          type="text"
          className="w-2/3"
          placeholder={`Responder ${discussion.profile.first_name}...`}
          inputProps={{ maxLength: 300 }}
          multiline
          style={{
            padding: '.5rem .5rem 1.25rem'
          }}
        />
        <button className="btn-primary btn-sm ml-auto" onClick={handleSubmit}>
          Publicar
        </button>
      </div>
    </div>
  )
}
