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
import axios from 'axios'
import { useRouter } from 'next/router'

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
  joined: '',
  dob: '',
  gender: 'male',
  phone: '',
  email: '',
  height: '',
  weight: '',
  training_type: '',
  emergency_phone: ''
}

export const UserForm = ({
  customer = userdata,
  cond = [],
  postto = '/api/addCustomer',
  redirect = false,
  redirectto = ''
}) => {
  const [openAlert, setOpenAlert] = useState(true)
  const logo = '/images/logos/logoSmall.png'
  const [userdata, setUser] = useState({ ...customer })
  const [conditions, setConditions] = useState([...cond])
  const [imgSrc, setImgSrc] = useState(
    userdata.image?.length > 0 ? '/images/avatars/' + userdata.image : '/images/avatars/1.png'
  )

  const [date, setDate] = useState(null)
const logo = '/images/logos/logoSmall.png'
  const [imagefile, setImageFile] = useState(null)
  console.log(userdata)
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
  const [err, setErr] = useState('')
  const router = useRouter()
  const onImageChange = file => {
    const reader = new FileReader()

    const { files } = file.target
    setImageFile(file.target.files)
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result)
      reader.readAsDataURL(files[0])
    }
  }
  return (
    <CardContent>
      <form
        onSubmit={async e => {
          e.preventDefault()
          const data = new FormData()
          if (!imagefile && !userdata.id) {
            setErr('Add and Image please')
            return
          }
          if (imagefile) {
            for (const file of imagefile) {
              data.append('file', file)
            }
            const links = await axios.post('/api/upload_avatar', data)
            userdata.image = links.data.links[0]
          }
          const res = await axios.post(postto, {
            customer: userdata,
            conditions: conditions
          })
          console.log(redirect)
          if (redirect) {
            console.log('here')
            console.log(res.data)
            router.push('/account-settings/' + res.data.data[0])
          }
        }}
      >
        <Grid container spacing={7}>
          <Grid item xs={12} sm={6} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ImgStyled src={imgSrc} alt='Profile Pic' />
              <Box>
                <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                  Upload New Photo
                  <input
                    hidden
                    name='images'
                    type='file'
                    onChange={onImageChange}
                    accept='image/png, image/jpeg'
                    id='account-settings-upload-image'
                  />
                </ButtonStyled>
                <ResetButtonStyled
                  color='error'
                  variant='outlined'
                  onClick={() =>
                    setImgSrc(userdata.image ? '/images/avatars/' + userdata.image : '/images/avatars/1.png')
                  }
                >
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
              required
              fullWidth
              onChange={onChange}
              label='Full Name'
              placeholder='Full Name'
              name='fname'
              value={userdata.fname}
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
              required
              onChange={onChange}
              fullWidth
              label='Address'
              placeholder='Address'
              name='address'
              value={userdata.address}
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
              required
              onChange={onChange}
              fullWidth
              value={userdata.dob}
              type='date'
              label='Date of Birth'
              name='dob'
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
              <RadioGroup row defaultValue='male' aria-label='gender' name='gender' onChange={onChange}>
                <FormControlLabel value='male' label='Male' control={<Radio />} />
                <FormControlLabel value='female' label='Female' control={<Radio />} />
                <FormControlLabel value='other' label='Other' control={<Radio />} />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              value={userdata.phone}
              onChange={onChange}
              name='phone'
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
              required
              fullWidth
              type='email'
              onChange={onChange}
              name='email'
              value={userdata.email}
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
              required
              onChange={onChange}
              fullWidth
              name='height'
              label='Height'
              value={userdata.height}
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
              required
              fullWidth
              onChange={onChange}
              type='Number'
              name='weight'
              label='Weight'
              value={userdata.weight}
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
            <TextField
              required
              fullWidth
              label='Training type'
              onChange={onChange}
              name='training_type'
              value={userdata.training_type}
              placeholder='eg, weightloss, strength gain'
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
              required
              fullWidth
              type='number'
              name='emergency_phone'
              onChange={onChange}
              value={userdata.emergency_phone}
              label='Emergency Contact'
              placeholder='eg. +977-9800010002'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Phone />
                  </InputAdornment>
                )
              }}
            />
          </Grid>

          {/* <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Membership type</InputLabel>
              <Select label='Membership type' defaultValue='Monthly'>
                <MenuItem value='Monthly'>Monthly (1 month)</MenuItem>
                <MenuItem value='Quaterly'>Quaterly (3 months)</MenuItem>
                <MenuItem value='Anually'>Anually (1 year)</MenuItem>
              </Select>
            </FormControl>
          </Grid> */}

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
                    required
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
                    required
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
                  <Select
                    name='type'
                    label='Type: (physical/medical)'
                    onChange={e => {
                      onConditionChange(e, i)
                    }}
                    defaultValue={c.type.length > 0 ? c.type : 'physical'}
                  >
                    <MenuItem value='medical'>medical</MenuItem>
                    <MenuItem value='physical'>physical</MenuItem>
                    <MenuItem value='pending'>Strength Training</MenuItem>
                  </Select>
                  <ResetButtonStyled
                    color='error'
                    variant='outlined'
                    onClick={() => {
                      try {
                        setConditions(prev => {
                          return [...prev].filter((p, pIndex) => {
                            return pIndex !== i
                          })
                        })
                      } catch (e) {
                        console.log(e)
                      }
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
