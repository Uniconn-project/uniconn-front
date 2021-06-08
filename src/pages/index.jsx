import React, { useContext, useEffect } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Router from 'next/router'
import CircularProgress from '@material-ui/core/CircularProgress'
import PersonOutlineIcon from '@material-ui/icons/PersonOutline'
import Illustration01 from '../components/pages/landing-page/illustration01'
import { AuthContext } from '../contexts/Auth'

export default function Index() {
  const { loading, isAuthenticated } = useContext(AuthContext)

  useEffect(() => {
    if (loading) return

    if (isAuthenticated) {
      Router.replace('/home')
    }
  }, [loading, isAuthenticated])

  if (!loading && !isAuthenticated) {
    return (
      <>
        <Head>
          <title>Uniconn</title>
        </Head>
        <div className="w-screen pt-20">
          <div className="fixed top-0 z-10 w-full h-20 flex items-center px-4 bg-dark b-bottom-light">
            <div>
              <h1>Uniconn</h1>
            </div>
            <div className="hidden ml-auto h-2/3 sm:flex">
              <Link href="/login">
                <button className="btn-primary-transparent m-2">Entrar</button>
              </Link>
              <Link href="/signup">
                <button className="btn-primary m-2">Criar conta</button>
              </Link>
            </div>
            <div className="flex ml-auto sm:hidden">
              <Link href="/login">
                <PersonOutlineIcon />
              </Link>
            </div>
          </div>
          <div className="bg-linear flex px-8 pt-8 pb-4 md:px-32 md:pt-32 md:pb-20">
            <div className="md:w-1/2">
              <h1>
                Crie e participe de{' '}
                <span style={{ color: 'var(--secondary-color)' }}>
                  projetos que vão fazer diferença
                </span>{' '}
                para sua carreira.
              </h1>
              <p className="mt-4 mb-8">
                Quer tirar o seu projeto do papel? Nós te conectamos com pessoas
                que queiram participar e te ajudamos a desenvolvê-lo. Quer
                participar de projetos para seu desenvolvimento pessoal e
                profissional? Te conectamos a um.
              </p>
              <Link href="/signup">
                <button className="btn-primary text-xl">Criar conta</button>
              </Link>
            </div>
            <div className="flex justify-center md:w-1/2">
              <Illustration01 />
            </div>
          </div>
          <div className="bg-light flex justify-end px-8 pt-12 pb-4 md:px-32 md:pt-32 md:pb-20">
            <div className="md:w-1/2">
              <h2>
                <span style={{ color: 'var(--secondary-color)' }}>1.</span>{' '}
                Cadastre-se e crie o seu perfil
              </h2>
              <p className="my-4">
                Em nosso menu de cadastro, coloque toda a sua experiência seja
                profissional ou pessoal. Alguma coisa que você faz, pode ajudar
                outras pessoas.
              </p>
            </div>
          </div>
          <div className="w-full relative">
            <div className="wave">
              <svg
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
              >
                <path
                  d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                  fill="var(--background-light)"
                ></path>
              </svg>
            </div>
          </div>
          <div className="bg-dark flex px-8 pt-20 pb-4 md:px-32 md:pt-32 md:pb-20">
            <div className="md:w-1/2">
              <h2>
                <span style={{ color: 'var(--secondary-color)' }}>2.</span>{' '}
                Selecione um tema ou tipo de projeto
              </h2>
              <p className="my-4">
                Escolha um tema ou tipo de projeto para você participar, veja as
                descrições e converse com a pessoa que divulgou o projeto
              </p>
            </div>
          </div>
          <div className="w-full relative">
            <div className="wave">
              <svg
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
              >
                <path
                  d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                  fill="var(--background-dark)"
                ></path>
              </svg>
            </div>
          </div>
          <div className="bg-light flex justify-end px-8 pt-20 pb-4 md:px-32 md:pt-32 md:pb-20">
            <div className="md:w-1/2">
              <h2>
                <span style={{ color: 'var(--secondary-color)' }}>3.</span> Crie
                o seu projeto e divulgue-o
              </h2>
              <p className="my-4">
                Em nosso feed você vai conseguir divulgar o seu projeto, colocar
                toda a descrição dele e os tipos de pessoas que você precisa.
                Você pode montar um Business Canvas Model ou um Kanban para te
                ajudar a pensar melhor sobre suas necessidades do projeto.
              </p>
            </div>
          </div>
          <div className="bg-dark flex px-8 pt-20 pb-4 md:px-32 md:pt-32 md:pb-20">
            <div className="md:w-1/2">
              <h2>
                <span style={{ color: 'var(--secondary-color)' }}>4.</span> Faça
                Conexões
              </h2>
              <p className="my-4">
                Com as nossas conexões você consegue conhecer pessoas novas e
                formar os times multidisciplinares para os projetos. Desenvolva
                as soft skills mais desejadas do mercado.
              </p>
            </div>
          </div>
          <div className="bg-linear flex flex-col items-center w-full pt-10 pb-20">
            <h2>Uniconn</h2>
            <div className="flex">
              <Link href="/login">
                <button className="btn-primary-transparent m-2 text-xl">
                  Entrar
                </button>
              </Link>
              <Link href="/signup">
                <button className="btn-primary m-2 text-xl">Criar conta</button>
              </Link>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <div>
      <Head>
        <title>Uniconn</title>
      </Head>
      <div className="w-screen h-screen">
        <div
          className={'w-full h-full flex flex-col justify-center items-center'}
        >
          <CircularProgress color="primary" />
        </div>
      </div>
    </div>
  )
}
