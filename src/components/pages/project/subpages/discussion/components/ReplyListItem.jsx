import React, { useContext } from 'react'
import Link from 'next/link'
import DeleteIcon from '@material-ui/icons/Delete'
import { mutate } from 'swr'
import { MyProfileContext } from '../../../../../../contexts/MyProfile'
import { AuthContext } from '../../../../../../contexts/Auth'

export default function ReplyListItem({
  discussion,
  reply,
  setSuccessMsg,
  setErrorMsg
}) {
  const { myProfile } = useContext(MyProfileContext)
  const { getToken } = useContext(AuthContext)

  const handleDelete = async () => {
    if (window.confirm('Deletar comentário?')) {
      fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/api/projects/delete-discussion-reply/${reply.id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: 'JWT ' + (await getToken()),
            'Content-type': 'application/json'
          }
        }
      )
        .then(response => response.json())
        .then(data => {
          if (data === 'success') {
            mutate(`projects/get-project-discussion/${discussion.id}`)
            setSuccessMsg({
              isOpen: true,
              message: 'Comentário apagado com sucesso!'
            })
          } else {
            setErrorMsg({
              isOpen: true,
              message: data
            })
          }
        })
    }
  }

  return (
    <div className="bg-transparent rounded-md shadow-lg mb-4">
      <div className="flex justify-between">
        <div className="flex flex-col b-bottom-light p-2 sm:flex-row">
          <div className="mr-2">
            <Link href={`/user/${reply.profile.user.username}`}>
              <img
                src={reply.profile.photo}
                className="profile-img-sm mx-0.5 cursor-pointer"
              />
            </Link>
          </div>
          <div>
            <h5>
              {reply.profile.first_name} {reply.profile.last_name}
            </h5>
            <p className="self-start break-all color-secondary">
              @{reply.profile.user.username}
            </p>
          </div>
        </div>
        {myProfile.id === reply.profile.id && (
          <div className="cursor-pointer p-2" onClick={handleDelete}>
            <DeleteIcon className="icon-sm color-secondary-hover" />
          </div>
        )}
      </div>
      <div className="p-2">
        <p>{reply.content}</p>
      </div>
    </div>
  )
}
