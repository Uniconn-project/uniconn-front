import React, { useContext, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import FilledInput from '@material-ui/core/FilledInput'
import { mutate } from 'swr'
import { MyProfileContext } from '../../../../../../contexts/MyProfile'
import { AuthContext } from '../../../../../../contexts/Auth'

export default function ReplyFrom({ discussion, setErrorMsg }) {
  const { myProfile } = useContext(MyProfileContext)
  const { getToken } = useContext(AuthContext)

  const [postData, setPostData] = useState({
    content: ''
  })

  const handleChange = key => e => {
    setPostData({ ...postData, [key]: e.target.value })
  }

  const handleSubmit = async () => {
    if (postData.content.length < 3) {
      setErrorMsg({
        isOpen: true,
        message: 'O comentário não pode ter menos de 3 caracteres!'
      })
      return
    }

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/projects/reply-discussion/${discussion.id}`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: 'JWT ' + (await getToken())
        },
        body: JSON.stringify(postData)
      }
    )
      .then(response => response.json())
      .then(data => {
        if (data === 'success') {
          mutate(`projects/get-project-discussion/${discussion.id}`)
          setPostData({
            content: ''
          })
        } else {
          setErrorMsg({
            isOpen: true,
            message: data
          })
        }
      })
  }

  return (
    <div className="bg-transparent rounded-md shadow-lg mb-4">
      <div className="flex justify-between p-2 mb-2 b-bottom-light">
        <div className="flex flex-col sm:flex-row">
          <div className="mr-2">
            <Link href="/profile">
              <div className="profile-img-sm mx-0.5">
                <Image
                  src={myProfile.photo}
                  layout="fill"
                  className="cursor-pointer"
                />
              </div>
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
          value={postData.content}
          inputProps={{ maxLength: 300 }}
          multiline
          style={{
            padding: '.5rem .5rem 1.25rem'
          }}
          onChange={handleChange('content')}
        />
        <button className="btn-primary btn-sm ml-auto" onClick={handleSubmit}>
          Publicar
        </button>
      </div>
    </div>
  )
}
