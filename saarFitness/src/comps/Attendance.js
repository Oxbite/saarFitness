import Link from 'next/link'
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

export const AttendanceTable = ({ customers, att = [] }) => {
  const [attendances, setAt] = useState(att)
  const setAttendance = (c_id, idx = -1) => {
    if (idx < 0) {
      // call to api to create new attendance.
      // set the attendance id
      // change attendance
      const at = {
        arrival: new Date().toString(),
        customerId: c_id
      }
      const nAt = [...attendances, at]
      setAt(nAt)
    } else {
      // call to api to edit attendance departure (add departure field)
      const nAt = [...attendances]
      nAt[idx].departure = new Date()
      setAt(nAt)
    }
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'></Table>

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
              if (attendances[i].customerId == e.id) {
                attendance = attendances[i]
                index = i
              }
            }
            console.log(attendance)
            return (
              <TableRow>
                <TableCell>{e.fname}</TableCell>
                <TableCell>
                  {!attendance ? (
                    <>
                      <ButtonStyled
                        component='label'
                        variant='contained'
                        onClick={() => {
                          setAttendance(e.id, index)
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
                          setAttendance(e.id, index)
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
                    <Link href={'/attendance/'}>custom Attendance</Link>
                  ) : (
                    <Link href={'/attendance/' + attendance.id}>edit Attendance</Link>
                  )}
                </TableCell>
              </TableRow>
            )
          })}
      </TableBody>
    </TableContainer>
  )
}
