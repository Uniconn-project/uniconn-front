import React, { useState } from 'react'
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

export default function Mentor() {
  const [postData, setPostData] = useState({ markets: [] })

  const handleChange = key => e => {
    setPostData({ ...postData, [key]: e.target.value })
  }

  return (
    <Page title="Signup | Uniconn">
      <div className="h-full flex flex-col justify-start items-center pt-10">
        <h1>Mentor</h1>
        <div className="flex flex-col items-center my-4">
          <ProfileBaseForm />
          <FormControl className="w-4/5">
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
              <MenuItem value={'saúde'}>Saúde</MenuItem>
              <MenuItem value={'inovação'}>Inovação</MenuItem>
              <MenuItem value={'fintech'}>Fintech</MenuItem>
              <MenuItem value={'agropecuária'}>Agropecuária</MenuItem>
            </Select>
          </FormControl>
        </div>
        <Button variant="contained" color="primary" className="w-4/5">
          Criar conta
        </Button>
        <IconButton color="primary" onClick={() => window.history.back()}>
          <ArrowBackIcon />
        </IconButton>
      </div>
    </Page>
  )
}
