import React, { useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import ToolsHeader from './components/ToolsHeader'
import ToolCategory from './components/tool-category/ToolCategory'

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
      <ToolsHeader />
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
