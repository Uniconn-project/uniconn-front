import React from 'react'
import Link from 'next/link'
import AddIcon from '@material-ui/icons/Add'

export default function CreateProject() {
  return (
    <Link href="/project/create">
      <div className="w-full flex items-center cursor-pointer bg-transparent bg-hover rounded-md shadow-lg p-2 mb-4">
        <span>CRIAR PROJETO</span>
        <AddIcon className="ml-auto" />
      </div>
    </Link>
  )
}
