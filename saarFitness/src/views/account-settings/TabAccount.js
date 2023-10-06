// ** React Imports
import { forwardRef, useState } from 'react'
// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'
import Phone from 'mdi-material-ui/Phone'
import EmailOutline from 'mdi-material-ui/EmailOutline'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import MessageOutline from 'mdi-material-ui/MessageOutline'
import Close from 'mdi-material-ui/Close'
import HeightIcon from '@mui/icons-material/Height';
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import BoyIcon from '@mui/icons-material/Boy';
import LocationCityIcon from '@mui/icons-material/LocationCity';


import DatePicker from 'react-datepicker'


// import MuiPicker from './MuiPicker'
// import AdapterDateFns from '@mui/lab/AdapterDateFns';

const DemoGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    paddingTop: `${theme.spacing(1)} !important`
  }
}))

const CustomInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Birth Date' autoComplete='off' />
})

const CustomMembershipInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Start of Membership Date' autoComplete='off' />
})

const CustomPhysicalInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Physical Condition Year' autoComplete='off' />
})

const CustomMedicalInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Physical Condition Year' autoComplete='off' />
})

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

const TabAccount = () => {
  // ** State
  const [openAlert, setOpenAlert] = useState(true)
  const [imgSrc, setImgSrc] = useState('/images/avatars/1.png')
  const [date, setDate] = useState(null)
  const [membershipDate, setMembershipDate] = useState(null)
  const [physicalDate, setPhysicalDate] = useState(null)
  const [medicalDate, setMedicalDate] = useState(null)


  const onChange = file => {
    const reader = new FileReader()
    const { files } = file.target
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result)
      reader.readAsDataURL(files[0])
    }
  }



  return (

    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
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
              type='text'
              label='Health'
              placeholder='Any Health conditions?'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <LocalHospitalIcon />
                  </InputAdornment>
                )
              }}
            />
          </Grid>


          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='text'
              label='Body Condition'
              placeholder='Any physical conditions?'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <BoyIcon />
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
              placeholder='carterleonard@gmail.com'
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
              label='Guardian Phone No.'
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
            <FormControl fullWidth>
              <InputLabel>Membership type</InputLabel>
              <Select label='Membership type' defaultValue='Monthly'>
                <MenuItem value='Monthly'>Monthly</MenuItem>
                <MenuItem value='Quaterly'>Quaterly</MenuItem>
                <MenuItem value='Anually'>Anually</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <DatePicker
              selected={date}
              showYearDropdown
              showMonthDropdown
              placeholderText='MM-DD-YYYY'
              customInput={<CustomInput />}
              id='form-layouts-separator-date'
              onChange={date => setDate(date)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <DatePicker
              selected={membershipDate}
              showYearDropdown
              showMonthDropdown
              placeholderText='MM-DD-YYYY'
              customInput={<CustomMembershipInput />}
              id='form-layouts-separator-date'
              onChange={membershipDate => setMembershipDate(membershipDate)}
            />
          </Grid>


          <DemoGrid item xs={12} sm={10}>
            <Typography variant='h3' sx={{ marginBottom: 2 }}>
              Physical Condition Info
            </Typography>
            <Typography variant='body2'>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  selected={physicalDate}
                  showYearDropdown
                  showMonthDropdown
                  placeholderText='MM-DD-YYYY'
                  customInput={<CustomPhysicalInput />}
                  id='form-layouts-separator-date'
                  onChange={physicalDate => setPhysicalDate(physicalDate)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  multiline
                  minRows={3}
                  label='Description'
                  placeholder='Enter detailed description'
                  sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <MessageOutline />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
            </Typography>
          </DemoGrid>

          <DemoGrid item xs={12} sm={10}>
            <Typography variant='h3' sx={{ marginBottom: 2 }}>
              Medical Condition Info
            </Typography>
            <Typography variant='body2'>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  selected={medicalDate}
                  showYearDropdown
                  showMonthDropdown
                  placeholderText='MM-DD-YYYY'
                  customInput={<CustomMedicalInput />}
                  id='form-layouts-separator-date'
                  onChange={medicalDate => setMedicalDate(medicalDate)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  multiline
                  minRows={3}
                  label='Description'
                  placeholder='Enter detailed Medical description or restriction'
                  sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <MessageOutline />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
            </Typography>
          </DemoGrid>
        </Grid>
      </form>
    </CardContent>

  )
}

export default TabAccount
