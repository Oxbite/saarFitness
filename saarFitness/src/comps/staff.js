import { forwardRef, useState } from 'react'
import Box from '@mui/material/Box'
import TablePagination from '@mui/material/TablePagination'
import Paper from '@mui/material/Paper'
import AccountEdit from 'mdi-material-ui/AccountEdit'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import Link from 'next/link'
import RadioGroup from '@mui/material/RadioGroup'
import axios from 'axios'
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
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
import { Error, Warning } from '@material-ui/icons'

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

export const UserForm = ({
  staff = {
    fname: '',
    joined: '',
    dob: '',
    type: '',
    shift: '',
    address: '',
    salary: ''
  },
  postto = '/api/addStaff'
}) => {
  const [openAlert, setOpenAlert] = useState(true)
  const logo = '/images/logos/logoSmall.png'
  const [userdata, setUser] = useState({ ...staff })
  const [imgSrc, setImgSrc] = useState('/images/avatars/' + (staff.image ?? '1.png'))
  const [img, setImg] = useState()
  const [ctSrc, setCtSrc] = useState(staff.citizenship ?? '/images/avatars/1.png')
  const [ct, setCt] = useState()
  const [err, setErr] = useState()
  const [cv, setCv] = useState()
  const [cvSrc, setCvSrc] = useState(staff.cv ?? null)
  const [date, setDate] = useState(null)
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

  const onImageChange = file => {
    const reader = new FileReader()
    const { files } = file.target
    setImg(file.target.files)
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result)
      reader.readAsDataURL(files[0])
    }
  }

  const onCtImageChange = file => {
    const reader = new FileReader()
    const { files } = file.target
    setCt(file.target.files)
    if (files && files.length !== 0) {
      reader.onload = () => setCtSrc(reader.result)
      reader.readAsDataURL(files[0])
    }
  }

  return (
    <CardContent>
      {err && (
        <Typography color='error'>
          <Error /> {err}
        </Typography>
      )}
      <form
        onSubmit={async e => {
          try {
            e.preventDefault()

            if (!img && !userdata.image) {
              setErr('Add an Image please')
              return
            }
            if (img && img.length > 0) {
              const data = new FormData()
              data.append('file', img[0])
              let links = await axios.post('/api/upload_avatar', data)
              userdata.image = links.data.links[0]
            }
            if (ct && ct.length > 0) {
              const data = new FormData()
              data.append('file', ct[0])
              let links = await axios.post('/api/upload_ct', data)
              userdata.citizenship = links.data.links[0]
            }
            if (cv && cv.length > 0) {
              const data = new FormData()
              data.append('file', cv[0])
              let links = await axios.post('/api/upload_cv', data)
              userdata.cv = links.data.links[0]
            }
            const res = await axios.post(postto, {
              staff: userdata
            })
            setErr(null)
          } catch (e) {
            setErr('Some error occured while inserting. Please check the form properly!')
          }
        }}
      >
        <Grid container spacing={7}>
          <Grid item xs={12} sm={6} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ImgStyled src={imgSrc} alt='Profile Pic' />
              <Box>
                <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                  Upload new Image
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
              label='date of birth'
              type='date'
              placeholder='date of birth'
              name='dob'
              value={userdata.dob}
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
              fullWidth
              onChange={onChange}
              label='Joined Date'
              type='date'
              placeholder='Full Name'
              name='joined'
              value={userdata.joined}
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
              label='Salary'
              onChange={onChange}
              placeholder='salary'
              name='salary'
              value={userdata.salary}
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
              label='Staff type: (eg, Trainer // assistant)'
              onChange={onChange}
              placeholder='type'
              name='type'
              value={userdata.type}
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
            <FormControl fullWidth>
              <InputLabel>Shift</InputLabel>
              <Select onChange={onChange} label='Training type' name='shift' defaultValue={userdata.shift ?? 'active'}>
                <MenuItem value='morning'>Morning</MenuItem>
                <MenuItem value='day'>Day</MenuItem>
                <MenuItem value='night'>Night</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label='address'
              placeholder='address'
              onChange={onChange}
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

          <Grid item xs={12} sm={6}></Grid>
          <Grid item xs={12} sm={6} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ImgStyled src={ctSrc} alt='Profile Pic' />
              <Box>
                <ButtonStyled component='label' variant='contained' htmlFor='citizenupload'>
                  Citizenship Image
                  <input
                    hidden
                    type='file'
                    onChange={onCtImageChange}
                    accept='image/png, image/jpeg'
                    id='citizenupload'
                  />
                </ButtonStyled>
                <ResetButtonStyled
                  color='error'
                  variant='outlined'
                  onClick={() => {
                    setCtSrc(staff.citizenship ?? '/images/avatars/1.png')
                  }}
                >
                  Reset
                </ResetButtonStyled>
                <Typography variant='body2' sx={{ marginTop: 5 }}>
                  Allowed PNG or JPEG. Max size of 800K.
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel>
              new CV:{' '}
              {cvSrc ? (
                <a href={cvSrc} download={cv ? cv[0].name : null}>
                  {cv ? cv[0].name : 'download'}
                </a>
              ) : (
                ''
              )}
            </InputLabel>
            <ButtonStyled component='label' variant='contained' htmlFor='cvupload'>
              CV:
              <input
                hidden
                id='cvupload'
                name='cv'
                type='file'
                style={{
                  height: '30px'
                }}
                onChange={e => {
                  const reader = new FileReader()
                  const { files } = e.target
                  setCv(e.target.files)

                  console.log(e.target.files[0].name)
                  if (files && files.length !== 0) {
                    reader.onload = () => setCvSrc(reader.result)
                    reader.readAsDataURL(files[0])
                  }
                }}
              />
            </ButtonStyled>
            <ResetButtonStyled
              color='error'
              variant='outlined'
              onClick={() => {
                setCv(null)
                setCvSrc(staff.cv ?? null)
              }}
            >
              Reset Cv
            </ResetButtonStyled>
          </Grid>
        </Grid>
        <Button type='submit' variant='contained' color='primary' style={{ marginTop: '30px' }}>
          REGISTER
        </Button>
      </form>
    </CardContent>
  )
}

export function StaffTable({ staff }) {
  const [page, setPage] = useState(0)
  const [rows, setRows] = useState([...staff])
  const [rowsPerPage, setRowsPerPage] = useState(100)
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Joined</TableCell>
              <TableCell>age</TableCell>
              <TableCell>address</TableCell>
              <TableCell>type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow hover key={row.name} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
                      <Link href={'/staff/' + row.id}>
                        <Box sx={{ cursor: 'pointer', textDecoration: 'underline' }}>{row.fname}</Box>
                      </Link>
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>{row.joined}</TableCell>
                <TableCell>{Math.floor((new Date() - new Date(row.dob)) / (365.25 * 24 * 60 * 60 * 1000))}</TableCell>
                <TableCell>{row.address}</TableCell>
                <TableCell>{row.type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component='div'
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[100, 10]}
        count={staff.length}
        page={page}
        onRowsPerPageChange={setRowsPerPage}
        onPageChange={handleChangePage}
      />
    </Paper>
  )
}
