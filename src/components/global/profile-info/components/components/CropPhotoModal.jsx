import React, { useRef } from 'react'
import Cropper from 'cropperjs'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import Image from 'next/image'

import 'cropperjs/dist/cropper.min.css'

export default function CropPhotoModal({
  useIsOpen,
  usePostData,
  postDataInitialState
}) {
  const [isOpen, setIsOpen] = useIsOpen()
  const [postData, setPostData] = usePostData()

  const imageRef = useRef()

  const handleClose = () => {
    setIsOpen(false)
    setPostData(postDataInitialState)
  }

  const createCropper = () => {
    const cropper = new Cropper(imageRef.current, {
      viewMode: 1,
      scalable: false,
      aspectRatio: 1,
      crop: () => {
        const canvas = cropper.getCroppedCanvas()
        setPostData({ ...postData, photo: canvas.toDataURL('image/png') })
      }
    })
  }

  return (
    <Modal
      className="flex justify-center items-center"
      open={isOpen}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={isOpen}>
        <div className="bg-dark py-2 rounded-md shadow-lg w-full max-w-screen-md">
          <div className="w-full b-bottom-light p-4">
            <button
              className="btn-primary ml-auto"
              onClick={() => setIsOpen(false)}
            >
              Confirmar
            </button>
          </div>
          <div
            className="flex justify-center w-full"
            style={{ maxHeight: '480px' }}
          >
            <Image
              src={postData.photo}
              ref={imageRef}
              alt="Source"
              crossOrigin
              onLoad={createCropper}
            />
          </div>
        </div>
      </Fade>
    </Modal>
  )
}
