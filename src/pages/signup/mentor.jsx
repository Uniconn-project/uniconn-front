import React, { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import Page from '../../components/Page'
import BaseForm from '../../components/pages/signup/SignupBaseForm'
import MentorBaseForm from '../../components/global/MentorBaseForm'
import { AuthContext } from '../../contexts/Auth'

export default function Mentor(props) {
  const [postData, setPostData] = useState({ markets: [] })

  const router = useRouter()

  const { loading, isAuthenticated } = useContext(AuthContext)
  if (!loading && isAuthenticated) router.push('/')

  return (
    <Page title="Criar conta | Uniconn" className="h-screen">
      <div className="h-full flex flex-col justify-start items-center">
        <h1>Mentor</h1>
        <BaseForm parentPostData={postData} type="mentor">
          <MentorBaseForm usePostData={() => [postData, setPostData]} />
        </BaseForm>
      </div>
    </Page>
  )
}
