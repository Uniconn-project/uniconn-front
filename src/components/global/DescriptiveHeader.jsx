import React, { useState } from 'react'
import InfoIcon from '@material-ui/icons/Info'
import AnimateHeight from 'react-animate-height'

export default function DescriptiveHeader({
  children,
  title,
  description,
  onClick = () => {}
}) {
  const [filterHeight, setFilterHeight] = useState(0)

  const handleIconClick = e => {
    e.stopPropagation()
    setFilterHeight(filterHeight === 'auto' ? 0 : 'auto')
  }

  return (
    <div
      className="w-full flex flex-col justify-between items-center bg-light rounded-md shadow-lg p-2 mb-4"
      onClick={onClick}
    >
      <div className="flex w-full justify-between items-center h-10">
        <div className="flex items-center">
          {children}
          <span className="color-headline ml-2">{title}</span>
        </div>
        <InfoIcon
          className="self-start icon-sm cursor-pointer color-paragraph color-hover"
          onClick={handleIconClick}
        />
      </div>
      <AnimateHeight height={filterHeight}>
        <div>
          <p className="text-sm">{description}</p>
        </div>
      </AnimateHeight>
    </div>
  )
}
