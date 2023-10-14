import Link from 'next/link'
import InputLabel from '@mui/material/InputLabel'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import InputAdornment from '@mui/material/InputAdornment'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import CardContent from '@mui/material/CardContent'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import { useState } from 'react'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import axios from 'axios'
import { validateTime } from '@mui/x-date-pickers/internals'

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

export function AttendanceDate({ cust, att }) {
  const [attendances, setAttendances] = useState([...att])

  return (
    <CardContent>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          onChange={async e => {
            const res = await axios.get('/api/getAttendance', {
              params: { date: new Date(e.target.value).toISOString().split('T')[0] }
            })
            setAttendances(res.data.attendances)
          }}
          fullWidth
          value={new Date().toISOString().split('T')[0]}
          type='date'
          label='Date'
          name='dob'
          InputProps={{
            startAdornment: <InputAdornment position='start'></InputAdornment>
          }}
        />
      </Grid>
      <TableContainer component={Paper} sx={{ marginTop: '5px' }}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Customer name</TableCell>
              <TableCell align='right'>Arrived</TableCell>
              <TableCell align='right'>Departed</TableCell>
              <TableCell align='right'>Edit</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {attendances.length > 0 &&
              attendances.map(e => {
                return (
                  <TableRow key={e.id}>
                    <TableCell>{e.fname}</TableCell>
                    <TableCell>{dateToString(new Date(e.arrived))}</TableCell>
                    <TableCell>{dateToString(new Date(e.departed))}</TableCell>
                    <TableCell align='right'>{<Link href={'/attendance/' + e.id}>edit Attendance</Link>}</TableCell>
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </CardContent>
  )
}

export const AttendanceTable = ({ customers, att = [] }) => {
  const [attendances, setAt] = useState(att)
  console.log(att)
  const setAttendance = async (c_id, idx = -1) => {
    if (idx < 0) {
      // call to api to create new attendance.

      // set the attendance id
      // change attendance
      const at = {
        arrival: new Date().toISOString(),
        customer: c_id
      }
      const res = await axios.post('/api/saveAttendance', { attendance: at })
      at.id = res.data.data[0]
      const nAt = [...attendances, at]
      setAt(nAt)
    } else {
      // call to api to edit attendance departure (add departure field)
      const nAt = [...attendances]
      nAt[idx].departure = new Date().toISOString()
      await axios.post('/api/saveAttendance', { attendance: nAt[idx] })
      setAt(nAt)
    }
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Customer name</TableCell>
            <TableCell align='right'>Arrived/departed</TableCell>
            <TableCell align='right'>Edit</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {customers.length > 0 &&
            customers.map(e => {
              let attendance = null
              let index = -1
              for (let i = 0; i < attendances.length; i++) {
                if (attendances[i].customer == e.customer) {
                  attendance = attendances[i]
                  index = i
                }
              }
              console.log(e)
              return (
                <TableRow key={e.id}>
                  <TableCell>{e.fname}</TableCell>
                  <TableCell>
                    {!attendance ? (
                      <>
                        <ButtonStyled
                          component='label'
                          variant='contained'
                          onClick={() => {
                            setAttendance(e.customer, index)
                          }}
                        >
                          Set Arrived
                        </ButtonStyled>
                      </>
                    ) : (
                      <>
                        <ButtonStyled
                          component='label'
                          variant='contained'
                          onClick={() => {
                            setAttendance(e.customer, index)
                          }}
                          disabled={attendance && attendance.departure != undefined ? true : false}
                        >
                          Set Departed
                        </ButtonStyled>
                      </>
                    )}
                  </TableCell>
                  <TableCell align='right'>
                    {!attendance ? (
                      <Link href={'/attendance/byuser/' + e.customer}>custom Attendance</Link>
                    ) : (
                      <Link href={'/attendance/' + attendance.id}>edit Attendance</Link>
                    )}
                  </TableCell>
                </TableRow>
              )
            })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export function dateToString(currentDate) {
  const year = currentDate.getFullYear()
  const month = String(currentDate.getMonth() + 1).padStart(2, '0')
  const day = String(currentDate.getDate()).padStart(2, '0')
  const hours = String(currentDate.getHours()).padStart(2, '0')
  const minutes = String(currentDate.getMinutes()).padStart(2, '0')
  const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`
  return formattedDateTime
}

export function validdatetime(inputString) {
  const pattern = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/
  return pattern.test(inputString)
}

export function AttendanceForm({
  user,
  attendance = { arrival: dateToString(new Date()), departure: dateToString(new Date()) }
}) {
  const [err, setErr] = useState()
  attendance = {
    ...attendance,
    arrival: dateToString(new Date(attendance.arrival)),
    departure: dateToString(new Date(attendance.departure ?? ''))
  }
  const [today, setToday] = useState(attendance)
  const onChange = e => {
    const nAt = { ...attendance }
    nAt[e.target.name] = e.target.value
    setToday(nAt)
  }
  if (!today.departure) {
    today.departure = dateToString(new Date())
  }
  return (
    <CardContent>
      <form
        onSubmit={async e => {
          e.preventDefault()
          const values = { ...today }
          values.arrival = new Date(today.arrival).toISOString()
          values.departure = new Date(today.departure).toISOString()
          values.customer = user.id
          await axios.post('/api/saveAttendance', { attendance: values })
          window.location.reload()
        }}
      >
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label='arrival'
            placeholder='arrival time'
            name='arrival'
            value={today.arrival.length == 0 ? dateToString(new Date()) : today.arrival}
            onChange={onChange}
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
            label='departure time'
            placeholder='departure time'
            name='departure'
            sx={{ marginTop: '10px' }}
            value={today.departure.length == 0 ? dateToString(new Date()) : dateToString(new Date(today.departure))}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <AccountOutline />
                </InputAdornment>
              )
            }}
          />
        </Grid>

        <Button type='submit' variant='contained' color='primary' style={{ marginTop: '30px' }}>
          Set Attendance
        </Button>
      </form>
    </CardContent>
  )
}

export function AttendanceListUser({ attendances = [], user = {} }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Arrived at</TableCell>
            <TableCell align='right'>left at</TableCell>
            <TableCell align='right'>hours spent</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {attendances.map((e, i) => {
            return (
              <TableRow>
                <TableCell>{dateToString(new Date(e.arrival))}</TableCell>
                <TableCell>{dateToString(new Date(e.departure))}</TableCell>
                <TableCell>{(new Date(e.departure) - new Date(e.arrival)) / (1000 * 60 * 60)}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
