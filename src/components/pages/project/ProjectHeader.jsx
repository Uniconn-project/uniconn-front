import React from 'react'

export default function ProjectHeader({ page, setPage }) {
  return (
    <div className="sticky top-24 w-full mb-4 sm:top-32">
      <div className="w-full bg-light h-14 rounded-md shadow-lg p-2 flex items-center">
        <div className="flex px-4">
          <div
            className={`project-menu-item p-3 mr-2 nav-link cursor-pointer color-headline-hover ${
              page === 'description' ? 'b-bottom-primary' : ''
            }`}
            onClick={() => setPage('description')}
          >
            Descrição
          </div>
          <div
            className={`project-menu-item p-3 ml-2 nav-link cursor-pointer color-headline-hover ${
              page === 'discussions' ? 'b-bottom-primary' : ''
            }`}
            onClick={() => setPage('discussions')}
          >
            Discussões
          </div>
          <div
            className={`project-menu-item p-3 ml-2 nav-link cursor-pointer color-headline-hover ${
              page === 'links' ? 'b-bottom-primary' : ''
            }`}
            onClick={() => setPage('links')}
          >
            Links
          </div>
        </div>
      </div>
    </div>
  )
}
