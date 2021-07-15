import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Chip from '@material-ui/core/Chip'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import useFetch, { fetcher } from '../../hooks/useFetch'

export const getStaticProps = async () => {
  const markets = await fetcher('projects/get-markets-name-list')

  return {
    props: {
      markets
    },
    revalidate: 60 * 60 // 1 hour
  }
}

export default function Mentor(props) {
  const [postData, setPostData] = props.usePostData()

  const { data: markets } = useFetch('projects/get-markets-name-list', {
    initialData: props.markets
  })

  const handleChange = key => e => {
    setPostData({ ...postData, [key]: e.target.value })
  }

  if (!markets) {
    return <CircularProgress />
  }

  return (
    <FormControl className="w-4/5" style={{ marginBottom: '1rem' }}>
      <InputLabel id="mentor-markets-select-label">
        Em quais mercados você atua?
      </InputLabel>
      <Select
        data-cy="mentor-markets-select"
        labelId="mentor-markets-select-label"
        multiple
        value={postData.markets}
        onChange={handleChange('markets')}
        renderValue={selected => (
          <div>
            {selected.map(value => (
              <Chip key={value} label={value} className="b-primary mr-1" />
            ))}
          </div>
        )}
      >
        {markets.map(market => (
          <MenuItem key={market.id} value={market.name}>
            {market.name[0].toUpperCase()}
            {market.name.slice(1)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
