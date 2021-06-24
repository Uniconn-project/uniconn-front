import React from 'react'
import AssignmentIcon from '@material-ui/icons/Assignment'
import CircularProgress from '@material-ui/core/CircularProgress'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt'
import useFetch from '../../../../hooks/useFetch'

export default function MentorInfo({ profile }) {
  const { data: markets } = useFetch(
    `profiles/get-mentor-markets/${profile.user.username}`
  )

  if (!markets) {
    console.log(markets)
    return (
      <li className="pb-2">
        <CircularProgress size={20} />
      </li>
    )
  }

  return (
    <li className="pb-2">
      <div className="w-full flex items-center mb-1">
        <span>
          <AssignmentIcon className="icon-sm" /> Mercados:
        </span>
      </div>
      <ul className="max-h-24 overflow-y-auto">
        {markets.map(market => (
          <li key={market.id}>
            <ArrowRightAltIcon className="color-primary icon-sm" />{' '}
            {market.name}
          </li>
        ))}
      </ul>
    </li>
  )
}
