import { UserForm } from 'src/comps/staff'
import { useState } from 'react'
import { db } from 'src/lib/db'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'
import InformationOutline from 'mdi-material-ui/InformationOutline'
import TabInfo from 'src/views/account-settings/TabInfo'
import TabAccount from 'src/views/account-settings/TabAccount'
import TabSecurity from 'src/views/account-settings/TabSecurity'
import 'react-datepicker/dist/react-datepicker.css'
import Error404 from '../404'
import { AttendanceListUser } from 'src/comps/Attendance'
import { TrainerForm, TrainerList } from 'src/comps/Subscription'
import Link from 'next/link'
import TypographyTexts from 'src/views/typography/TypographyTexts'
import { Typography } from '@mui/material'

const Tab = styled(MuiTab)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 100
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 67
  }
}))

const TabName = styled('span')(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: '0.875rem',
  marginLeft: theme.spacing(2.4),
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}))

export default function Page({ staff, attendances }) {
  const [value, setVal] = useState("edit");
  const handleChange = (e, val)=> {
      setVal(val);
  }
  if (!staff) {
    return <Error404 />
  }
  return(
    <Card>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label='account-settings tabs'
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
            value='edit'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountOutline />
                <TabName>Account</TabName>
              </Box>
            }
          />
          <Tab
            value='attendances'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountOutline />
                <TabName>Attendances</TabName>
              </Box>
            }
          />
        </ TabList>
        <TabPanel sx={{ p: 0 }} value='edit'>
          <UserForm staff={staff} postto='/api/editStaff' />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='attendances'>
          <AttendanceListUser attendances={attendances} editLink = {(e)=>{
            return (
              <Link passHref href={"/api/attendance/staff/byuser/" + e.staff}><Typography color={"white"} style={{color: "white"}

            } > Edit</Typography></Link>)
          }
          }
    />

        </TabPanel>
    </ TabContext >
    </ Card>
  )
}

export async function getServerSideProps({ params }) {
  const { id } = params
  const staff = await db('staff').select('*').where('id', id)
  const attendances = await db("staff_attendance").select('*').where('staff', id);
  return {
    props: {
      staff: staff.length > 0 ? staff[0] : null,
      attendances
    }
  }
}
