import React from 'react'
import PaletteIcon from '@material-ui/icons/Palette'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt'
import SchoolIcon from '@material-ui/icons/School'
import LinkedInIcon from '@material-ui/icons/LinkedIn'

export default function StudentInfo({ profile }) {
  return (
    <>
      {profile.university && (
        <li className="pb-2">
          <SchoolIcon className="icon-sm" />{' '}
          {profile.major.name[0].toUpperCase() + profile.major.name.slice(1)} -{' '}
          {profile.university.name}
        </li>
      )}
      {profile.linkedIn && (
        <li className="pb-2 break-all">
          <a
            href={`https://www.linkedin.com/in/${profile.linkedIn}`}
            target="_blank"
            rel="noreferrer"
          >
            <div className="color-paragraph hover:underline">
              <LinkedInIcon className="icon-sm" /> {profile.linkedIn}
            </div>
          </a>
        </li>
      )}
      <li className="pb-2">
        <div className="w-full flex items-center mb-1">
          <span>
            <PaletteIcon className="icon-sm" /> Habilidades:
          </span>
        </div>
        <ul className="max-h-32 overflow-y-auto">
          {profile.skills.map(skill => (
            <li key={skill.id}>
              <ArrowRightAltIcon className="color-primary icon-sm" />{' '}
              {skill.name}
            </li>
          ))}
        </ul>
      </li>
    </>
  )
}
