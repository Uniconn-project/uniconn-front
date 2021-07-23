import React, { useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import ToolCategory from './components/tool-category/ToolCategory'
import DescriptiveHeader from '../../../../global/DescriptiveHeader'

export default function Tools({ project, refetchProject }) {
  const [errorMsg, setErrorMsg] = useState({
    isOpen: false,
    message: ''
  })

  if (!project) {
    return (
      <div className="w-full flex justify-center mt-10">
        <CircularProgress />
      </div>
    )
  }

  return (
    <div className="p-2">
      <DescriptiveHeader
        title="Ferramentas do projeto"
        description="Ferramentas são uma ótima forma dos membros de um projeto
        compartilharem informações entre si que estão guardadas em outras
        plataformas."
      />
      {project.tools_categories.map(category => (
        <ToolCategory
          key={category.id}
          category={category}
          project={project}
          refetchProject={refetchProject}
          setErrorMsg={setErrorMsg}
        />
      ))}
      <Snackbar
        open={errorMsg.isOpen}
        autoHideDuration={6000}
        onClose={() =>
          setErrorMsg({
            isOpen: false,
            message: ''
          })
        }
      >
        <Alert severity="error">{errorMsg.message}</Alert>
      </Snackbar>
    </div>
  )
}
