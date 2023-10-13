// ** MUI Imports
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import useMediaQuery from '@mui/material/useMediaQuery'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icons Imports
import Menu from 'mdi-material-ui/Menu'
import Magnify from 'mdi-material-ui/Magnify'

// ** Components
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import NotificationDropdown from 'src/@core/layouts/components/shared-components/NotificationDropdown'
import { useState } from 'react'
import axios from 'axios'
import { Typography } from '@material-ui/core'
import Link from 'next/link'
const SearchResultHolder = ({ results }) => {
  if (!results) {
    return <></>
  }
  return (
    <Box sx={{ position: 'relative' }}>
      <Box sx={{ position: 'absolute' }} marginTop={'5px'}>
        {results.map(e => {
          console.log('here')
          return (
            <Box key={e.id} width={'250px'}>
              <Link href={'/account-settings/' + e.id} style={{ color: 'white' }}>
                <Typography
                  color='white'
                  style={{
                    padding: '2px 5px 2px 5px',
                    cursor: 'pointer',
                    borderBottomStyle: 'solid'
                  }}
                >
                  {e.fname}
                </Typography>
              </Link>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

const AppBarContent = props => {
  // ** Props
  const { hidden, settings, saveSettings, toggleNavVisibility } = props
  const [searchResults, setSearchResults] = useState([])
  // ** Hook
  const hiddenSm = useMediaQuery(theme => theme.breakpoints.down('sm'))
  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
        {hidden ? (
          <IconButton
            color='inherit'
            onClick={toggleNavVisibility}
            sx={{ ml: -2.75, ...(hiddenSm ? {} : { mr: 3.5 }) }}
          >
            <Menu />
          </IconButton>
        ) : null}
        <Box>
          <TextField
            size='small'
            onChange={async e => {
              const res = await axios.get('/api/search', { params: { name: e.target.value } })
              if (e.target.value == '') {
                setSearchResults([])
                return
              }
              setSearchResults(res.data)
              console.log(searchResults)
            }}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Magnify fontSize='small' />
                </InputAdornment>
              )
            }}
          />
          <SearchResultHolder results={searchResults} />
        </Box>
      </Box>
      <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
        <ModeToggler settings={settings} saveSettings={saveSettings} />
      </Box>
    </Box>
  )
}

export default AppBarContent
