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
import { UserForm } from 'src/comps/UserForm'

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
  period: '' // yearly, quaterly, monthly // in database it will be saved as a number
}

const conditions = []

const TabAccount = ({ customer, conditions }) => {
  // ** State
  const [openAlert, setOpenAlert] = useState(true)
  const logo = '/images/logos/logoSmall.png'
  const [imgSrc, setImgSrc] = useState('/images/avatars/1.png')
  const [date, setDate] = useState(null)
  const [Membdate, setMembDate] = useState(null)

  const onChange = file => {
    const reader = new FileReader()
    const { files } = file.target
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result)
      reader.readAsDataURL(files[0])
    }
  }

  return <UserForm customer={customer} postto='/api/editCustomer' redirect={false} cond={conditions} />
}

export default TabAccount
