import React, { useContext, useEffect } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Router from 'next/router'
import CircularProgress from '@material-ui/core/CircularProgress'
import PersonOutlineIcon from '@material-ui/icons/PersonOutline'
import { AuthContext } from '../contexts/Auth'
import Wave from '../components/pages/landing-page/Wave'

export default function Index() {
  const { loading, isAuthenticated } = useContext(AuthContext)

  useEffect(() => {
    if (loading) return

    if (isAuthenticated) {
      Router.replace('/projects')
    }
  }, [loading, isAuthenticated])

  if (!loading && !isAuthenticated) {
    return (
      <>
        <Head>
          <title>Uniconn</title>
        </Head>
        <div className="w-screen pt-20 landing-page">
          <div className="fixed top-0 z-30 w-full h-20 flex items-center px-4 bg-dark b-bottom-light">
            <div>
              <h2 className="text-3xl">Uniconn</h2>
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
          <div className="flex flex-col bg-linear">
            <video
              className="shadow-lg w-full absolute z-10 hidden object-cover md:block"
              autoPlay
              muted
              loop
              style={{ height: '30rem', filter: 'brightness(.25)' }}
            >
              <source src="lp_intro.mp4" type="video/mp4" />
            </video>
            <div className="z-20 px-8 pt-8 pb-4 md:w-1/2 lg:px-24 lg:pt-32 lg:pb-8">
              <h1 className="">
                Crie e participe de{' '}
                <span style={{ color: 'var(--secondary-color)' }}>
                  projetos que vão fazer diferença
                </span>{' '}
                para sua vida.
              </h1>
              <p className="mt-4 mb-8">
                Na Uniconn, você pode se conectar com pessoas de diversas áreas
                para o desenvolvimento de startups, projetos sociais e
                iniciativas acadêmicas.
              </p>
              <Link href="/signup">
                <button className="btn-primary text-xl">Criar conta</button>
              </Link>
            </div>
          </div>
          <div
            className="bg-light flex justify-end px-8 pt-12 pb-4 md:px-24 md:pt-32 md:pb-20"
            style={{ minHeight: '40vh' }}
          >
            <div className="md:w-1/2">
              <h2>
                <span style={{ color: 'var(--secondary-color)' }}>1.</span> Crie
                seu perfil
              </h2>
              <p className="my-4">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Molestiae, iusto, sint magni molestias officia id maxime eaque
                placeat consequuntur voluptatem quibusdam, cupiditate assumenda
                similique error eos ex rem nostrum est.
              </p>
            </div>
          </div>
          <div
            className="bg-dark flex px-8 pt-20 pb-4 shadow-lg md:px-24 md:pt-24 md:pb-20"
            style={{ minHeight: '40vh' }}
          >
            <div className="md:w-1/2">
              <h2>
                <span style={{ color: 'var(--secondary-color)' }}>2.</span>{' '}
                Participe de projetos existentes ou crie o seu próprio
              </h2>
              <p className="my-4">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Molestiae, iusto, sint magni molestias officia id maxime eaque
                placeat consequuntur voluptatem quibusdam, cupiditate assumenda
                similique error eos ex rem nostrum est.
              </p>
            </div>
          </div>
          <div
            className="bg-light flex justify-end px-8 pt-20 pb-4 md:px-24 md:pt-24 md:pb-20"
            style={{ minHeight: '20vh' }}
          >
            <div className="md:w-1/2">
              <h2>
                <span style={{ color: 'var(--secondary-color)' }}>3.</span>{' '}
                Engaje com a comunidade
              </h2>
              <p className="my-4">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Molestiae, iusto, sint magni molestias officia id maxime eaque
                placeat consequuntur voluptatem quibusdam, cupiditate assumenda
                similique error eos ex rem nostrum est.
              </p>
            </div>
          </div>
          <div className="w-full relative">
            <div className="wave bg-light">
              <Wave
                colors={[
                  'var(--landing-page-waves)',
                  'var(--landing-page-waves)',
                  'var(--landing-page-waves)',
                  'var(--background-dark)'
                ]}
              />
            </div>
          </div>
          <div className="flex flex-col items-center w-full pt-10 pb-20 bg-dark">
            <h2>Gostou do que viu?</h2>
            <div className="flex">
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
