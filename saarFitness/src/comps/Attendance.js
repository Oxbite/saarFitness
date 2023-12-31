import Link from 'next/link'
import Typography from '@mui/material/Typography'
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
import OxbiteTable from './OxbiteTable'

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


export function StaffAttendance({data}) {
  const [attendances, setData] = useState([...data]);
  const setAttendance = async (c_id, idx = -1) => {
          // call to api to edit attendance departure (add departure field)
      const nAt = [...attendances]
      if (nAt[idx].arrival){
        nAt[idx].departure = new Date().toISOString()
      } else {
        nAt[idx].arrival = new Date().toISOString();
      }
      const at = {
        staff: nAt[idx].id,
        arrival: nAt[idx].arrival,
        departure: nAt[idx].departure
      }
      if(nAt[idx].attendance_id) {
        at.id = nAt[idx].attendance_id
      }
      const ids = await axios.post('/api/staffAttendance', { attendance: at})
      if (ids.data.data.length > 0) {
        nAt[idx].attendance_id = ids.data.data[0];
      }
      setData(nAt)
  }
  return (
    <OxbiteTable rows={attendances} headers={["name", "set", "edit"]} filler = {(attendance, index)=> {
      console.log("attendance in table: ", index, attendance)
      return (
        <>
        <TableCell>{attendance.fname}</TableCell>
        <TableCell>
          {!attendance.arrival ? (
            <>
              <ButtonStyled
                component='label'
                variant='contained'
                onClick={() => {
                  setAttendance(attendance.id, index)
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
                  setAttendance(attendance.id, index)
                }}
                disabled={attendance && attendance.departure != undefined ? true : false}
              >
                Set Departed
              </ButtonStyled>
              <div>
                {`arrived At: ${attendance.arrival}` } <br />
                {`departed At: ${attendance.departure ?? "not set "}` }<br />
                {`Hours : ${!attendance.departure ? "not departed yet" :
                    function (t1, t2){
                      const diff = getTimeDifference(t1,t2)
                      return diff.hours + "hours " + diff.minutes + "minutes"
                }(new Date(attendance.arrival), new Date(attendance.departure))  }`}
            </div>
            </>
          )}
        </TableCell>
        <TableCell align='right'>
          {!attendance.attendance_id ? (
            <Link href={'/attendance/staff/byuser/' + attendance.id}>
              <Typography color={'white'} style={{ cursor: 'pointer' }}>
                custom Attendance
              </Typography>
            </Link>
          ) : (
            <Link href={'/attendance/' + attendance.attendance_id}>
              <Typography color={'white'} style={{ cursor: 'pointer' }}>
                custom Attendance
              </Typography>
            </Link>
          )}
        </TableCell>
      </>
      )
    }} />
  )
}
function getTimeDifference(date1, date2) {
  const timeDifference = Math.abs(date1.getTime()- date2.getTime())

  // Calculate hours and remaining minutes
  const hours = Math.floor(timeDifference / (1000 * 60 * 60));
  const remainingMinutes = (timeDifference % (1000 * 60 * 60)) / (1000 * 60);

  return {
    hours,
    minutes: Math.round(remainingMinutes), // Round to the nearest minute
  };
}

export function AttendanceDate({ cust, att }) {
  const [attendances, setAttendances] = useState([...att])
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  return (
    <CardContent>
      <Typography variant='h3' sx={{ marginBottom: 2 }}>
        Attendance By Date
      </Typography>
      <Grid item xs={12} sm={6}>
        <TextField
          onChange={async e => {
            const ndate = new Date(e.target.value).toISOString().split('T')[0]
            const res = await axios.get('/api/getAttendance', {
              params: { date: ndate }
            })
            console.log(res)
            setDate(ndate)
            setAttendances(res.data)
          }}
          fullWidth
          value={date}
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
                    <TableCell>{dateToString(new Date(e.arrival))}</TableCell>
                    <TableCell>{e.departure ? dateToString(new Date(e.arrival)) : 'not set'}</TableCell>
                    <TableCell align='right'>
                      {
                        <Link href={'/attendance/' + e.id} passHref>
                          <Typography color={'white'} style={{ cursor: 'pointer' }}>
                            edit Attendance
                          </Typography>
                        </Link>
                      }
                    </TableCell>
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
    <CardContent>
      <Typography variant='h3' sx={{ marginBottom: 2 }}>
        Attendance Today
      </Typography>
      <Link href={'/attendance/bydate'}>
        <ButtonStyled>View By date</ButtonStyled>
      </Link>
      <TableContainer component={Paper} sx={{ marginTop: 3 }}>
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
                        <Link href={'/attendance/byuser/' + e.customer}>
                          <Typography color={'white'} style={{ cursor: 'pointer' }}>
                            custom Attendance
                          </Typography>
                        </Link>
                      ) : (
                        <Link href={'/attendance/' + attendance.id}>
                          <Typography color={'white'} style={{ cursor: 'pointer' }}>
                            custom Attendance
                          </Typography>
                        </Link>
                      )}
                    </TableCell>
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </CardContent>
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
  attendance = { arrival: dateToString(new Date()), departure: dateToString(new Date()) },
  postto = '/api/saveAttendance'
}) {
  const [err, setErr] = useState()
  attendance = {
    ...attendance,
    arrival: dateToString(new Date(attendance.arrival)),
    departure: attendance.departure ? dateToString(new Date(attendance.departure)) : dateToString(new Date())
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
          await axios.post(postto, { attendance: values })
          window.location.reload()
        }}
      >
        <Grid item xs={12} sm={6}>
          <TextField

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

            fullWidth
            onChange={onChange}
            label='departure time'
            placeholder='departure time'
            name='departure'
            sx={{ marginTop: '10px' }}
            value={!today.departure && today.departure.length == 0 ? new Date() : today.departure}
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

export function AttendanceListUser({ attendances = [], editLink}) {
  console.log(attendances)
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Arrived at</TableCell>
            <TableCell align='left'>left at</TableCell>
            <TableCell align='left'>hours spent</TableCell>
            <TableCell align='left'>Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {attendances.map((e, i) => {
            return (
              <TableRow key= {i}>
                <TableCell>{dateToString(new Date(e.arrival))}</TableCell>
                <TableCell>{dateToString(new Date(e.departure))}</TableCell>
                <TableCell>{
                function (t1, t2){
                      const diff = getTimeDifference(t1,t2)
                      return diff.hours + "hours " + diff.minutes + "minutes"
                }(new Date(e.arrival), new Date(e.departure))  }
          </TableCell>
                <TableCell>{editLink && editLink(e)}</TableCell>

              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
