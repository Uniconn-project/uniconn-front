import React, { useContext, useState } from 'react'
import ProfileInfo from '../../components/global/ProfileInfo'
import Page from '../../components/Page'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import Chip from '@material-ui/core/Chip'
import CircularProgress from '@material-ui/core/CircularProgress'
import { MyProfileContext } from '../../contexts/MyProfile'
import useFetch from '../../hooks/useFetch'
import { FormControl } from '@material-ui/core'

export default function CreateProject() {
  const { myProfile } = useContext(MyProfileContext)

  const [postData, setPostData] = useState({
    name: '',
    category: '',
    markets: []
  })

  const { data: categories } = useFetch('projects/get-projects-categories-list')
  const { data: markets } = useFetch('projects/get-markets-name-list')

  const handleChange = key => e => {
    setPostData({ ...postData, [key]: e.target.value })
  }

  if (!categories || !markets) {
    return <CircularProgress />
  }

  return (
    <Page title="Criar projeto | Uniconn" page="project" loginRequired header>
      {console.log(postData)}
      <div className="justify-center w-full h-full flex">
        <div className="hidden lg:w-1/3 lg:flex lg:justify-end lg:mr-10 lg:box-border">
          <div className="w-60">
            <div className="h-full fixed top-32">
              <ProfileInfo profile={myProfile} />
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center p-2 pt-0 lg:p-0 lg:w-2/3 lg:justify-start lg:box-border">
          <div className="w-full" style={{ maxWidth: 600 }}>
            <div className="w-full flex items-center bg-transparent rounded-md shadow-lg p-2 mb-4">
              <h3>Criar projeto</h3>
            </div>
            <div className="w-full flex flex-col bg-transparent rounded-md shadow-lg">
              <div className="w-full p-2 b-bottom-transparent">
                <div>
                  <div className="w-full mb-2">
                    <TextField
                      className="w-full"
                      label="Nome"
                      onChange={handleChange('name')}
                    />
                  </div>
                  <div className="w-full flex justify-between items-center">
                    <FormControl className="w-2/5">
                      <InputLabel id="category-select-label">
                        Categoria
                      </InputLabel>
                      <Select
                        labelId="category-select-label"
                        value={postData.category}
                        onChange={handleChange('category')}
                      >
                        {categories.map(category => (
                          <MenuItem key={category.value} value={category.value}>
                            {category.readable[0].toUpperCase()}
                            {category.readable.slice(1)}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl className="w-2/5">
                      <InputLabel id="category-select-label">
                        Mercados
                      </InputLabel>
                      <Select
                        labelId="category-select-label"
                        value={postData.markets}
                        multiple
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
                  <TextField
                    label="Normal"
                    id="margin-normal"
                    defaultValue="Default Value"
                    helperText="Some important text"
                    margin="normal"
                  />
                </div>
              </div>
              <div className="w-full p-4">
                <button className="btn-primary ml-auto">Criar projeto</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  )
}
