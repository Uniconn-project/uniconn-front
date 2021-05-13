import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import PersonIcon from '@material-ui/icons/Person'
import SchoolIcon from '@material-ui/icons/School'
import Page from '../components/Page'
import PrimaryLink from '../components/helpers/PrimaryLink'
import { AuthContext } from '../contexts/Auth'

export default function Signup() {
  const router = useRouter()

  const { loading, isAuthenticated } = useContext(AuthContext)
  if (!loading && isAuthenticated) router.push('/')

  return (
    <Page title="Signup | Uniconn">
      <div className="h-full flex flex-col justify-start items-center">
        <div className="m-10">
          <h1>Uniconn</h1>
        </div>
        <div className="flex">
          <Link href="/signup/mentor">
            <button className="btn-primary w-40 m-2">
              <PersonIcon className="mr-1" />
              Sou mentor
            </button>
          </Link>
          <Link href="/signup/student">
            <button className="btn-primary w-40 m-2">
              <SchoolIcon className="mr-1" />
              Sou aluno
            </button>
          </Link>
        </div>
        <div>
          <PrimaryLink href="/login">
            <span>Já tem uma conta?</span>
          </PrimaryLink>
        </div>
      </div>
    </Page>
  )
}
