import { forwardRef, useState } from 'react'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import RadioGroup from '@mui/material/RadioGroup'
import TableContainer from '@mui/material/TableContainer'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
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
import AccountOutline from 'mdi-material-ui/AccountOutline'
import CakeIcon from '@mui/icons-material/Cake'
import Radio from '@mui/material/Radio'
import axios from 'axios'
import Link from 'next/link'

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

export const periods = {
  1: 'monthly',
  3: 'quarterly',
  12: 'yearly'
}

export default function SubscriptionForm({
  subscription = { start_date: '', end_date: '', period: '', price: '', paid: '0' },
  postto = '/api/addSubscription',
  user
}) {
  const [subs, setSubs] = useState(subscription)
  const onChange = (e = null) => {
    setSubs(prev => {
      prev[e.target.name] = e.target.value
      return { ...prev }
    })
  }
  const statusObj = {
    0: { text: 'not Paid' },
    1: { text: 'not Paid' }
  }
  return (
    <CardContent>
      <h1>Subscription for {user.fname}</h1>
      <form
        onSubmit={async e => {
          e.preventDefault()
          subs.customer = user.id
          subs.end_date = new Date(subs.start_date)
          subs.end_date.setMonth(subs.end_date.getMonth() + subs.period)
          subs.end_date = subs.end_date.toISOString().split('T')[0]
          console.log(subs.end_date)
          await axios.post(postto, { customer: user, subscription: subs })
          // window.location.reload()
        }}
      >
        <Grid item xs={12} sm={6}>
          <TextField
            required
            onChange={onChange}
            fullWidth
            value={subs.start_date}
            type='date'
            label='start date'
            name='start_date'
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
          <FormControl fullWidth>
            <InputLabel>Membership type</InputLabel>
            <Select label='Membership type' name='period' defaultValue='1' onChange={onChange} value={subs.period}>
              <MenuItem value='1'>3Monthly (1 month)</MenuItem>
              <MenuItem value='3'>Quaterly (3 months)</MenuItem>
              <MenuItem value='12'>Anually (1 year)</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {/* <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
          <TextField
            required
            fullWidth
            onChange={onChange}
            type='number'
            label='Subscription Period'
            placeholder='In months'
            name='period'
            value={subs.period}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <AccountOutline />
                </InputAdornment>
              )
            }}
          />
        </Grid> */}
        <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
          <TextField
            required
            fullWidth
            onChange={onChange}
            type='number'
            label='Subscription price'
            placeholder='per month'
            name='price'
            value={subs.price}
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
          <FormControl>
            <FormLabel sx={{ fontSize: '0.875rem' }}>Payment status</FormLabel>
            <RadioGroup
              row
              defaultValue={subscription.paid}
              name='paid'
              aria-label='payment status'
              onChange={onChange}
            >
              <FormControlLabel value='1' label='paid' control={<Radio />} />
              <FormControlLabel value='0' label='not paid' control={<Radio />} />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Button type='submit' variant='contained' color='primary' style={{ marginTop: '30px' }}>
          REGISTER
        </Button>
      </form>
    </CardContent>
  )
}

export function SubscriptionListCustomer({ subscriptions }) {
  const statusObj = {
    1: { color: 'success', text: 'paid' },
    0: { color: 'error', text: 'unpaid' }
  }
  console.log(subscriptions)
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              <TableCell>Start Date</TableCell>
              <TableCell> Period</TableCell>
              <TableCell> end_date</TableCell>
              <TableCell>payment Status</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subscriptions.map(row => (
              <TableRow hover key={row.start_date} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{row.start_date}</Typography>
                  </Box>
                </TableCell>
                <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
                      {periods[row.period]}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
                      {new Date(row.end_date).toString()}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={statusObj[row.paid].text}
                    color={statusObj[row.paid].color}
                    sx={{
                      height: 24,
                      fontSize: '0.75rem',
                      textTransform: 'capitalize',
                      '& .MuiChip-label': { fontWeight: 500 }
                    }}
                  />
                </TableCell>
                <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Link
                      href={'/editSubscription/' + row.id}
                      style={{
                        cursor: 'pointer'
                      }}
                    >
                      <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important', cursor: 'pointer' }}>
                        Edit
                      </Typography>
                    </Link>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}
