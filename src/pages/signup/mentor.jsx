import React, { useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Alert from '@material-ui/lab/Alert'
import IconButton from '@material-ui/core/IconButton'
import Chip from '@material-ui/core/Chip'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import Page from '../../components/Page'
import ProfileBaseForm from '../../components/pages/signup/ProfileBaseForm'
import useFetch from '../../hooks/useFetch'

export default function Mentor() {
  const [errMessage, setErrMessage] = useState(null)
  const [postData, setPostData] = useState({ markets: [] })
  const [profilePostData, setProfilePostData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    birth_date: '',
    password: '',
    passwordc: ''
  })

  const { data: markets } = useFetch('projects/get-markets-name-list')

  const handleChange = key => e => {
    setPostData({ ...postData, [key]: e.target.value })
  }

  const handleProfileDataChange = (key, value) => {
    setProfilePostData({ ...profilePostData, [key]: value })
  }

  const handleSubmit = () => {
    let error = false

    const valuesInput = Object.values({ ...postData, ...profilePostData })

    for (const value of valuesInput) {
      if (!value) {
        error = true
        setErrMessage('Todos os campos devem ser preenchidos!')
        break
      }
    }

    if (error) return

    fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/profiles/mentor/post-signup`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ ...profilePostData, ...postData })
      }
    )
      .then(response => response.json())
      .then(data => {
        if (data === 'success') {
          process.env.NODE_ENV === 'development' && console.log(data)
        } else {
          setErrMessage(data)
        }
      })
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
      {console.log(postData, profilePostData)}
      <div className="h-full flex flex-col justify-start items-center pt-10">
        <h1>Mentor</h1>
        {errMessage !== null && (
          <div>
            <Alert severity="error">{errMessage}</Alert>
          </div>
        )}
        <div className="flex flex-col items-center my-4">
          <ProfileBaseForm handleChange={handleProfileDataChange} />
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
        </div>
        <Button
          variant="contained"
          color="primary"
          className="w-4/5"
          onClick={handleSubmit}
        >
          Criar conta
        </Button>
        <IconButton color="primary" onClick={() => window.history.back()}>
          <ArrowBackIcon />
        </IconButton>
      </div>
    </Page>
  )
}
