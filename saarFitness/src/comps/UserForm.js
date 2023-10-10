import { forwardRef, useState } from 'react'
import RadioGroup from '@mui/material/RadioGroup'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import CardContent from '@mui/material/CardContent'
import FormLabel from '@mui/material/FormLabel'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Button from '@mui/material/Button'
import Phone from 'mdi-material-ui/Phone'
import EmailOutline from 'mdi-material-ui/EmailOutline'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import MessageOutline from 'mdi-material-ui/MessageOutline'
import HeightIcon from '@mui/icons-material/Height'
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import LocationCityIcon from '@mui/icons-material/LocationCity'
import Divider from '@mui/material/Divider'
import CakeIcon from '@mui/icons-material/Cake'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import Radio from '@mui/material/Radio'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

const userdata = {
  fname: '',
  address: '',
  dob: '',
  gender: '',
  city: '',
  phone: '',
  email: '',
  height: '',
  weight: '',
  training_type: '',
  emergency_contact: '',
  period: ''
}

export const UserForm = ({ customer = userdata, cond = [] }) => {
  const [openAlert, setOpenAlert] = useState(true)
  const logo = '/images/logos/logoSmall.png'
  const [userdata, setUser] = useState(customer)
  const [conditions, setConditions] = useState([...cond])
  const [imgSrc, setImgSrc] = useState('/images/avatars/1.png')
  const [date, setDate] = useState(null)
  const [Membdate, setMembDate] = useState(null)
  const onChange = (e = null) => {
    setUser(prev => {
      prev[e.target.name] = e.target.value
      return { ...prev }
    })
  }
  const onConditionChange = (e, idx) => {
    const nprop = [...conditions]
    nprop[idx][e.target.name] = e.target.value
    setConditions(nprop)
  }
  return (
    <CardContent>
      <form onSubmit={() => {}}>
        <Grid container spacing={7}>
          <Grid item xs={12} sm={6} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ImgStyled src={imgSrc} alt='Profile Pic' />
              <Box>
                <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                  Upload New Photo
                  <input
                    hidden
                    type='file'
                    onChange={onChange}
                    accept='image/png, image/jpeg'
                    id='account-settings-upload-image'
                  />
                </ButtonStyled>
                <ResetButtonStyled color='error' variant='outlined' onClick={() => setImgSrc('/images/avatars/1.png')}>
                  Reset
                </ResetButtonStyled>
                <Typography variant='body2' sx={{ marginTop: 5 }}>
                  Allowed PNG or JPEG. Max size of 800K.
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <ImgStyled src={logo} alt='Profile Pic' sx={{ marginLeft: 'auto' }} />
              <Typography variant='h6' sx={{ marginLeft: 'auto' }}>
                SAAR FITNESS
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Full Name'
              placeholder='Full Name'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <AccountOutline />
                  </InputAdornment>
                )
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Address'
              placeholder='Address'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <AccountOutline />
                  </InputAdornment>
                )
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='date'
              label='Date of Birth'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <CakeIcon />
                  </InputAdornment>
                )
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl>
              <FormLabel sx={{ fontSize: '0.875rem' }}>Gender</FormLabel>
              <RadioGroup row defaultValue='male' aria-label='gender' name='account-settings-info-radio'>
                <FormControlLabel value='male' label='Male' control={<Radio />} />
                <FormControlLabel value='female' label='Female' control={<Radio />} />
                <FormControlLabel value='other' label='Other' control={<Radio />} />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='Text'
              label='City'
              placeholder='Kathmandu'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <LocationCityIcon />
                  </InputAdornment>
                )
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='number'
              label='Phone No.'
              placeholder='+977-9800010004'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Phone />
                  </InputAdornment>
                )
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='email'
              label='Email'
              placeholder='example: saarFitness@gmail.com'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <EmailOutline />
                  </InputAdornment>
                )
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Height'
              placeholder='Height'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <HeightIcon />
                  </InputAdornment>
                )
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='Number'
              label='Weight'
              placeholder='Weight in KG'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <MonitorWeightIcon />
                  </InputAdornment>
                )
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Training type</InputLabel>
              <Select label='Training type' defaultValue='active'>
                <MenuItem value='active'>Weight Loss</MenuItem>
                <MenuItem value='inactive'>Fat Loss</MenuItem>
                <MenuItem value='pending'>Strength Training</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='number'
              label='Emergency Contact'
              placeholder='+977-9800010002'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Phone />
                  </InputAdornment>
                )
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Membership type</InputLabel>
              <Select label='Membership type' defaultValue='Monthly'>
                <MenuItem value='Monthly'>Monthly (1 month)</MenuItem>
                <MenuItem value='Quaterly'>Quaterly (3 months)</MenuItem>
                <MenuItem value='Anually'>Anually (1 year)</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='date'
              label='Date Membership start'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <CalendarMonthIcon />
                  </InputAdornment>
                )
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ marginBottom: 0 }} />{' '}
          </Grid>

          <Grid item>
            <Typography variant='h4' sx={{ marginBottom: 2 }}>
              Physical Conditions
            </Typography>
            <Typography variant='body2'>
              To ensure safety and successful program, it is necessart to know any physical contions that may reqyuire a
              change to the program. Please note any injuries or surgeries that should be considered for your training
              program.
            </Typography>
            <ButtonStyled
              component='label'
              variant='contained'
              onClick={() => {
                console.log(conditions)
                const nprop = [...conditions, { year: '', detail: '', type: 'physical' }]
                setConditions(nprop)
              }}
            >
              Add Condition
            </ButtonStyled>
          </Grid>

          {conditions.length > 0 &&
            conditions.map((c, i) => {
              return (
                <Grid item>
                  <TextField
                    fullWidth
                    name='year'
                    type='number'
                    label='Year'
                    placeholder='Year of injury'
                    onChange={e => {
                      onConditionChange(e, i)
                    }}
                    value={c.year}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <LocalHospitalIcon />
                        </InputAdornment>
                      )
                    }}
                  />
                  <TextField
                    style={{ marginTop: '10px' }}
                    fullWidth
                    name='detail'
                    multiline
                    minRows={3}
                    label='Details'
                    placeholder='Example: Small crack on my left shoulder by falling from bicycle'
                    sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
                    value={c.detail}
                    onChange={e => {
                      onConditionChange(e, i)
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <MessageOutline />
                        </InputAdornment>
                      )
                    }}
                  />
                  <InputLabel>Training type</InputLabel>
                  <Select
                    name='type'
                    label='Type: (physical/medical)'
                    onChange={e => {
                      onConditionChange(e, i)
                    }}
                    defaultValue='active'
                  >
                    <MenuItem value='medical'>physical</MenuItem>
                    <MenuItem value='physical'>physical</MenuItem>
                    <MenuItem value='pending'>Strength Training</MenuItem>
                  </Select>
                  <ResetButtonStyled
                    color='error'
                    variant='outlined'
                    onClick={() => {
                      setConditions(prev => {
                        return [...prev].filter((p, pIndex) => {
                          return pIndex !== i
                        })
                      })
                    }}
                  >
                    Remove Condition
                  </ResetButtonStyled>
                </Grid>
              )
            })}
        </Grid>

        <Button type='submit' variant='contained' color='primary' style={{ marginTop: '30px' }}>
          REGISTER
        </Button>
      </form>
    </CardContent>
  )
}
