import React, { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import Page from '../../components/Page'
import BaseForm from '../../components/pages/signup/SignupBaseForm'
import StudentBaseForm from '../../components/global/StudentBaseForm'
import { AuthContext } from '../../contexts/Auth'

export default function Student() {
  const [postData, setPostData] = useState({
    university: '',
    major: '',
    skills: []
  })

  const router = useRouter()

  const { loading, isAuthenticated } = useContext(AuthContext)
  if (!loading && isAuthenticated) router.push('/')

  return (
    <Page title="Criar conta | Uniconn" className="h-screen">
      <div className="h-full flex flex-col justify-start items-center">
        <h1>Aluno</h1>
        <BaseForm parentPostData={postData} type="student">
          <StudentBaseForm usePostData={() => [postData, setPostData]} />
        </BaseForm>
      </div>
    </Page>
  )
}
