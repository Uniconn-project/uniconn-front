import React from 'react'
import AddToolModal from '../AddToolModal'
import CloudDocuments from './categories/CloudDocuments'
import DevelopmentTools from './categories/DevelopmentTools'
import TaskManagers from './categories/TaskManagers'
import ToolList from './components/ToolList'

export default function ToolCategory({
  category,
  project,
  refetchProject,
  setErrorMsg
}) {
  return (
    <>
      {category.name === 'Gerenciadores de Tarefas' && (
        <TaskManagers>
          <>
            <ToolList
              tools={category.tools}
              refetchProject={refetchProject}
              setErrorMsg={setErrorMsg}
            />
            <AddToolModal
              categoryName={category.name}
              project={project}
              refetchProject={refetchProject}
            />
          </>
        </TaskManagers>
      )}
      {category.name === 'Documentos em Nuvem' && (
        <CloudDocuments>
          <>
            <ToolList
              tools={category.tools}
              refetchProject={refetchProject}
              setErrorMsg={setErrorMsg}
            />
            <AddToolModal
              categoryName={category.name}
              project={project}
              refetchProject={refetchProject}
            />
          </>
        </CloudDocuments>
      )}
      {category.name === 'Ferramentas de Desenvolvimento' && (
        <DevelopmentTools tools={category.tools}>
          <>
            <ToolList
              tools={category.tools}
              refetchProject={refetchProject}
              setErrorMsg={setErrorMsg}
            />
            <AddToolModal
              categoryName={category.name}
              project={project}
              refetchProject={refetchProject}
            />
          </>
        </DevelopmentTools>
      )}
    </>
  )
}
