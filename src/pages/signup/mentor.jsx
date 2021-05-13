import React, { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import CircularProgress from '@material-ui/core/CircularProgress'
import Chip from '@material-ui/core/Chip'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Page from '../../components/Page'
import BaseForm from '../../components/pages/signup/BaseForm'
import { AuthContext } from '../../contexts/Auth'
import useFetch, { fetcher } from '../../hooks/useFetch'

export const getStaticProps = async () => {
  const markets = await fetcher('projects/get-markets-name-list')

  return {
    props: {
      markets
    },
    revalidate: 60 * 60 * 8 // 8 hours
  }
}

export default function Mentor(props) {
  const [postData, setPostData] = useState({ markets: [] })

  const router = useRouter()

  const { loading, isAuthenticated } = useContext(AuthContext)
  if (!loading && isAuthenticated) router.push('/')

  const { data: markets } = useFetch('projects/get-markets-name-list', {
    initialData: props.markets
  })

  const handleChange = key => e => {
    setPostData({ ...postData, [key]: e.target.value })
  }

  if (!markets) {
    return (
      <Page title="Signup | Uniconn">
        <CircularProgress color="primary" />
      </Page>
    )
  }

  return (
    <Page title="Signup | Uniconn">
      <div className="h-full flex flex-col justify-start items-center">
        <h1>Mentor</h1>
        <BaseForm parentPostData={postData} type="mentor">
          <FormControl className="w-4/5" style={{ marginBottom: '1rem' }}>
            <InputLabel id="demo-mutiple-chip-label">
              Em quais mercados você atua?
            </InputLabel>
            <Select
              labelId="demo-mutiple-chip-label"
              id="demo-mutiple-chip"
              multiple
              value={postData.markets}
              onChange={handleChange('markets')}
              renderValue={selected => (
                <div>
                  {selected.map(value => (
                    <Chip key={value} label={value} />
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
        </BaseForm>
      </div>
    </Page>
  )
}
