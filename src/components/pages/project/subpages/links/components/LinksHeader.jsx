import React, { useState } from 'react'
import InfoIcon from '@material-ui/icons/Info'
import AnimateHeight from 'react-animate-height'

export default function InfoModal() {
  const [filterHeight, setFilterHeight] = useState(0)

  return (
    <div className="sticky top-24 w-full mb-4 sm:top-32">
      <div className="w-full flex flex-col justify-between items-center bg-light rounded-md shadow-lg p-2">
        <div className="flex w-full justify-between items-center h-10">
          <span className="color-headline">Links do projeto</span>
          <InfoIcon
            className="self-start icon-sm cursor-pointer color-paragraph color-hover"
            onClick={() =>
              setFilterHeight(filterHeight === 'auto' ? 0 : 'auto')
            }
          />
        </div>
        <AnimateHeight height={filterHeight}>
          <div>
            <p className="text-sm">
              Links são uma ótima forma dos membros de um projeto compartilharem
              informações para o público que estão guardadas em outras
              plataformas.
            </p>
          </div>
        </AnimateHeight>
      </div>
    </div>
  )
}
