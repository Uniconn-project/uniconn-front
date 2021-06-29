import React, { useState, useContext } from 'react'
import AddIcon from '@material-ui/icons/Add'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import { AuthContext } from '../../../../../../contexts/Auth'

export default function CreateDiscussionForm({
  projectId,
  refetchProject,
  setErrorMsg
}) {
  const { getToken } = useContext(AuthContext)

  const [isOpen, setIsOpen] = useState(false)
  const [postData, setPostData] = useState({
    title: '',
    body: '',
    category: ''
  })

  const handleChange = key => e => {
    setPostData({ ...postData, [key]: e.target.value })
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleSubmit = async () => {
    if (
      !postData.title.length ||
      !postData.body.length ||
      !postData.category.length
    ) {
      setErrorMsg({
        isOpen: true,
        message: 'Todos os campos devem ser preenchidos!'
      })
      return
    }

    fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/projects/create-project-discussion/${projectId}`,
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
          setIsOpen(false)
          refetchProject('add-discussion')
        } else {
          setIsOpen(false)
          setErrorMsg({
            isOpen: true,
            message: data
          })
        }
      })
  }

  return (
    <>
      <div
        className="w-full flex items-center cursor-pointer bg-transparent bg-hover rounded-md shadow-lg p-2 mb-4"
        onClick={() => setIsOpen(true)}
      >
        <span>CRIAR DISCUSSÃO</span>
        <AddIcon className="ml-auto" />
      </div>
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
            <div className="w-full b-bottom p-4">
              <h2>Criar discussão</h2>
            </div>
            <div className="w-full max-h-72 overflow-y-auto pb-10 b-bottom-transparent">
              <div className="w-full p-4">
                <div className="w-full flex justify-between mb-2">
                  <TextField
                    className="w-5/12"
                    label="Título"
                    value={postData.title}
                    onChange={handleChange('title')}
                  />
                  <FormControl className="w-5/12">
                    <InputLabel id="category-select-label">
                      Categoria
                    </InputLabel>
                    <Select
                      labelId="category-select-label"
                      value={postData.category}
                      onChange={handleChange('category')}
                    >
                      {[
                        ['doubt', 'dúvida'],
                        ['suggestion', 'sugestão'],
                        ['feedback', 'feedback']
                      ].map(category => (
                        <MenuItem key={category[0]} value={category[0]}>
                          {category[1][0].toUpperCase()}
                          {category[1].slice(1)}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="w-full flex items-center mb-2">
                  <TextField
                    className="w-full"
                    label="Descrição"
                    value={postData.body}
                    multiline
                    onChange={handleChange('body')}
                  />
                </div>
              </div>
            </div>
            <div className="w-full p-4">
              <button className="btn-primary ml-auto" onClick={handleSubmit}>
                Confirmar
              </button>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  )
}
