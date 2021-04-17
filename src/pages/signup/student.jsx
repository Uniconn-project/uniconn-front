import React, { useState } from 'react'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import InputLabel from '@material-ui/core/InputLabel'
import FormGroup from '@material-ui/core/FormGroup'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import Page from '../../components/Page'
import ProfileBaseForm from '../../components/pages/signup/ProfileBaseForm'

export default function Student() {
  const [postData, setPostData] = useState({
    profileData: {},
    university: '',
    major: ''
  })

  const handleChange = key => e => {
    setPostData({ ...postData, [key]: e.target.value })
  }

  const handleProfileDataChange = (key, value) => {
    setPostData({
      ...postData,
      profileData: { ...postData.profileData, [key]: value }
    })
  }

  return (
    <Page title="Signup | Uniconn">
      <div className="h-full flex flex-col justify-start items-center pt-10">
        <h1>Aluno</h1>
        <div className="flex flex-col items-center my-4">
          <ProfileBaseForm handleChange={handleProfileDataChange} />
          <FormGroup className="w-full mb-4 justify-center items-center" row>
            <FormControl className="w-2/5" style={{ marginRight: '.5rem' }}>
              <InputLabel id="university-input-label">Universidade</InputLabel>
              <Select
                labelId="university-input-label"
                value={postData.university}
                onChange={handleChange('university')}
              >
                <MenuItem value="estácio de sa">Estácio de Sa</MenuItem>
                <MenuItem value="ufrj">UFRJ</MenuItem>
                <MenuItem value="uff">UFF</MenuItem>
              </Select>
            </FormControl>
            <FormControl className="w-2/5" style={{ marginLeft: '0.5rem' }}>
              <InputLabel id="major-input-label">Curso</InputLabel>
              <Select
                labelId="major-input-label"
                value={postData.major}
                onChange={handleChange('major')}
              >
                <MenuItem value="direito">Direito</MenuItem>
                <MenuItem value="engenharia da computação">
                  Engenharia da Computação
                </MenuItem>
                <MenuItem value="engenharia elétrica">
                  Engenharia Elétrica
                </MenuItem>
                <MenuItem value="ciências econômicas">
                  Ciências Econômicas
                </MenuItem>
              </Select>
            </FormControl>
          </FormGroup>
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
