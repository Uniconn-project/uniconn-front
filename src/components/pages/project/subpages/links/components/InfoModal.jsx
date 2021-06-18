import React, { useState } from 'react'
import InfoIcon from '@material-ui/icons/Info'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import PublicIcon from '@material-ui/icons/Public'
import LockIcon from '@material-ui/icons/Lock'

export default function InfoModal() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <InfoIcon
        className="self-start icon-sm cursor-pointer color-paragraph color-hover"
        onClick={() => setIsOpen(true)}
      />
      <Modal
        className="flex justify-center items-center"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={isOpen}>
          <div className="bg-dark rounded-md shadow-lg w-full max-w-screen-md">
            <div className="p-4 b-bottom-transparent">
              <div className="w-full py-2">
                <h3>O que são os links?</h3>
              </div>
              <p>
                Links são uma ótima forma dos membros de um projeto
                centralizarem informações que estão guardadas em outras
                plataformas.
              </p>
            </div>
            <div className="p-4 pt-0 b-bottom-transparent">
              <div className="w-full flex py-2">
                <PublicIcon className="icon-sm mr-2" />
                <h5>Links públicos</h5>
              </div>
              <div className="w-full">
                <p>
                  Links públicos são visíveis para todos os usuários. Eles são
                  úteis para redirecionar usuários para o site do projeto, redes
                  sociais do projeto, um vídeo comercial, etc.
                </p>
              </div>
            </div>
            <div className="p-4 pt-0">
              <div className="w-full flex py-2">
                <LockIcon className="icon-sm mr-2" />
                <h5>Links privados</h5>
              </div>
              <div className="w-full">
                <p>
                  Links privados são visíveis somente para os membros do
                  projeto. Eles são úteis centralizar links que a equipe precisa
                  acessar frequentemente como ferramentas de gestão de projeto e
                  artigos.
                </p>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  )
}
