import React, { useState } from 'react'
import InfoIcon from '@material-ui/icons/Info'
import AnimateHeight from 'react-animate-height'

export default function DescriptiveHeader({ title, description }) {
  const [filterHeight, setFilterHeight] = useState(0)

  return (
    <div className="sticky top-24 w-full mb-4 sm:top-32">
      <div className="w-full flex flex-col justify-between items-center bg-light rounded-md shadow-lg p-2">
        <div className="flex w-full justify-between items-center h-10">
          <span className="color-headline">{title}</span>
          <InfoIcon
            className="self-start icon-sm cursor-pointer color-paragraph color-hover"
            onClick={() =>
              setFilterHeight(filterHeight === 'auto' ? 0 : 'auto')
            }
          />
        </div>
        <AnimateHeight height={filterHeight}>
          <div>
            <p className="text-sm">{description}</p>
          </div>
        </AnimateHeight>
      </div>
    </div>
  )
}
