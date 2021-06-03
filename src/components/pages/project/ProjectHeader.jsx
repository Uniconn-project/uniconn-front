import React from 'react'

export default function ProjectHeader({
  descriptionPage,
  discussionsPage,
  linksPage,
  setProjectSubPage
}) {
  const switchPage = (e, newPage) => {
    document
      .querySelectorAll('.project-menu-item.b-bottom-primary')
      .forEach(el => el.classList.remove('b-bottom-primary'))

    e.target.classList.add('b-bottom-primary')

    setProjectSubPage(newPage)
  }

  return (
    <div className="sticky top-24 w-full mb-4 sm:top-32">
      <div className="w-full bg-light h-14 rounded-md shadow-lg p-2 flex items-center">
        <div className="flex px-4">
          <div
            className="project-menu-item p-3 mr-2 nav-link cursor-pointer color-headline-hover b-bottom-primary"
            onClick={e => switchPage(e, descriptionPage)}
          >
            Descrição
          </div>
          <div
            className="project-menu-item p-3 ml-2 nav-link cursor-pointer color-headline-hover"
            onClick={e => switchPage(e, discussionsPage)}
          >
            Discuções
          </div>
          <div
            className="project-menu-item p-3 ml-2 nav-link cursor-pointer color-headline-hover"
            onClick={e => switchPage(e, linksPage)}
          >
            Links
          </div>
        </div>
      </div>
    </div>
  )
}
