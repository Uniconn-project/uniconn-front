import React, { useState } from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import EditIcon from '@material-ui/icons/Edit'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import CircularProgress from '@material-ui/core/CircularProgress'
import useFetch from '../../../hooks/useFetch'
import ProjectBaseForm from '../../global/ProjectBaseForm'

export default function EditProjectDataModal({ project }) {
  const [isOpen, setIsOpen] = useState(false)
  const [postData, setPostData] = useState({
    name: project.name,
    category: project.category,
    slogan: project.slogan,
    markets: project.markets.map(market => market.name)
  })

  const { data: categories } = useFetch('projects/get-projects-categories-list')
  const { data: markets } = useFetch('projects/get-markets-name-list')

  if (!categories || !markets) {
    return <CircularProgress size={30} />
  }

  return (
    <div>
      <div
        className="absolute bottom-2 right-2 p-2 rounded-3xl cursor-pointer bg-secondary bg-hover color-bg-light"
        onClick={() => setIsOpen(true)}
      >
        <Tooltip title="Editar projeto" placement="top" arrow>
          <EditIcon className="icon-sm" />
        </Tooltip>
      </div>
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
          <div className="bg-dark rounded-md shadow-lg p-4 w-full max-w-screen-md">
            <div className="w-full b-bottom">
              <h2>Editar projeto</h2>
            </div>
            <div className="w-full">
              <div className="w-full p-2 b-bottom-transparent">
                <ProjectBaseForm
                  usePostData={() => [postData, setPostData]}
                  markets={markets}
                  categories={categories}
                />
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}
