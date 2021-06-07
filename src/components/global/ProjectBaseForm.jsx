import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import Chip from '@material-ui/core/Chip'
import FormControl from '@material-ui/core/FormControl'
import useFetch from '../../hooks/useFetch'

export default function ProjectBaseForm({ usePostData }) {
  const [postData, setPostData] = usePostData()

  const { data: categories } = useFetch('projects/get-projects-categories-list')
  const { data: markets } = useFetch('projects/get-markets-name-list')

  const handleChange = key => e => {
    setPostData({ ...postData, [key]: e.target.value })
  }

  const handleDeleteMarket = marketName => {
    setPostData({
      ...postData,
      markets: postData.markets.filter(market => market !== marketName)
    })
  }

  if (!categories || !markets) {
    return (
      <div className="flex justify-content">
        <CircularProgress />
      </div>
    )
  }

  return (
    <>
      <div className="w-full flex justify-between items-center mb-2">
        <TextField
          className="w-5/12"
          label="Nome"
          value={postData.name}
          onChange={handleChange('name')}
        />
        <FormControl className="w-5/12">
          <InputLabel id="category-select-label">Categoria</InputLabel>
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
      </div>
      <div className="w-full mb-2">
        <FormControl className="w-full">
          <InputLabel id="markets-select-label">Mercados</InputLabel>
          <Select
            labelId="markets-select-label"
            value={postData.markets}
            multiple
            onChange={handleChange('markets')}
            renderValue={selected => (
              <div>
                {selected.map(value => (
                  <Chip
                    key={value}
                    label={value}
                    className="b-primary mr-1"
                    onMouseDown={e => e.stopPropagation()}
                    onDelete={() => handleDeleteMarket(value)}
                  />
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
      <div className="w-full mb-2">
        <TextField
          className="w-full"
          label="Slogan"
          helperText="Frase descrevendo seu projeto"
          value={postData.slogan}
          onChange={handleChange('slogan')}
        />
      </div>
    </>
  )
}
