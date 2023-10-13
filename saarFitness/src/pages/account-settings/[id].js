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

const AccountSettings = ({ customer = null, conditions = null, subscriptions }) => {
  // ** State
  const [value, setValue] = useState('account')
  if (!customer) {
    return <Error404 />
  }

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
                <TabName>Account</TabName>
              </Box>
            }
          />
          <Tab
            value='security'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LockOpenOutline />
                <TabName>Security</TabName>
              </Box>
            }
          />
          <Tab
            value='info'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <InformationOutline />
                <TabName>Info</TabName>
              </Box>
            }
          />
        </TabList>

        <TabPanel sx={{ p: 0 }} value='account'>
          <TabAccount customer={customer} conditions={conditions} />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='security'>
          <TabSecurity customer={customer} />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='info'>
          <TabInfo subscriptions={subscriptions} />
        </TabPanel>
      </TabContext>
    </Card>
  )
}

export default AccountSettings

export async function getServerSideProps({ params }) {
  const { id } = params
  const customer = await db('customer').select('*').where('id', id)
  if (customer.length < 0) {
  }
  const subscriptions = await db('subscription').select('*').where('customer', id)
  const conditions = await db('conditions').select('*').where('customer', id)
  return {
    props: {
      customer: customer[0] ?? null,
      conditions,
      subscriptions
    }
  }
}
