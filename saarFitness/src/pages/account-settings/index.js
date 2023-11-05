import UserTable, { UserTableAll } from 'src/comps/UserTable'
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
import { useRouter } from 'next/router'
import Error404 from '../404'
import { AccountBoxSharp } from '@material-ui/icons'

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

export default function ({ customers, total, all }) {
  // ** State
  if (!customers) {
    return <Error404 />
  }
  console.log(customers)
  const [value, setValue] = useState('account')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Card>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label='account-settings tabs'
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
            value='account'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountOutline />
                <TabName>All Customers</TabName>
              </Box>
            }
          />
          <Tab
            value='active'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountBoxSharp />
                <TabName>Currently Active</TabName>
              </Box>
            }
          />
          <Tab
            value='security'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LockOpenOutline />
                <TabName>Expired</TabName>
              </Box>
            }
          />
          <Tab
            value='info'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <InformationOutline />
                <TabName>Unpaid</TabName>
              </Box>
            }
          />
        </TabList>

        <TabPanel sx={{ p: 0 }} value='account'>
          <UserTableAll customers={all} total={all.length} />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='active'>
          <UserTable
            customers={
              customers.filter (c => {
              const endDate = new Date(c.end_date)

              return endDate >= new Date()
            })}
            total={customers.length} />
        </TabPanel>

        <TabPanel sx={{ p: 0 }} value='security'>
          <UserTable
            customers={customers.filter(c => {
              const endDate = new Date(c.end_date)

              return endDate < new Date()
            })}
          />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='info'>
          <UserTable
            customers={customers.filter(c => {
              return c.paid != 1
            })}
            total={customers.length}
          />
        </TabPanel>
      </TabContext>
    </Card>
  )
}

export async function getServerSideProps() {
  const today = new Date().toISOString().split('T')[0] // Convert today's date to ISO format

  const customers = await db('customer as c')
    .select('*')
    .leftJoin('subscription as s', function () {
      this.on('c.id', '=', 's.customer')
    })
    .where('s.start_date', '<=', today)
    .whereNotNull('s.id')
    .whereRaw('s.end_date = (SELECT MAX(end_date) FROM subscription WHERE customer = c.id)');
  const all = await db('customer').select('*')

  return { props: { customers, all } }
}
