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
import { useValidation } from '@mui/x-date-pickers/internals'
import { useRouter } from 'next/router'

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
  6: 'bi-yearly',
  12: 'yearly'
}


export function TrainerForm({trainerx = {trainer: '', period: '', start_date: '', price: ''}, trainers, postto = '/api/addTrainer', user}){
  const [trainer, setSub] = useState(trainerx)
  const onChange = (e = null) => {
    setSub(prev => {
      prev[e.target.name] = e.target.value
      return { ...prev }
    })
  }
  const router = useRouter()
  const statusObj = {
    0: { text: 'not Paid' },
    1: { text: 'not Paid' }
  }
  return (
    <CardContent>
      <h1>Personal Training program for {user.fname}</h1>
      <form
        onSubmit={async e => {
          e.preventDefault()
          trainer.customer = user.id
          trainer.end_date = new Date(trainer.start_date)
          trainer.end_date.setMonth(trainer.end_date.getMonth() + trainer.period)
          console.log(trainer.end_date)
          trainer.end_date = trainer.end_date.toISOString().split('T')[0]
          const res = await axios.post(postto, { customer: user, trainer: trainer })
          if (res.status == 200){
            alert("Success");
          }
          else {
            alert("An error occured");
          }
        }}
      >
        <Grid item xs={12} sm={6}>
          <TextField
            
            onChange={onChange}
            fullWidth
            value={trainer.start_date}
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

        <Grid item xs={12} marginTop={2} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Trainer</InputLabel>
            <Select label='Membership type' name='trainer' defaultValue='1' onChange={onChange} value={trainer.trainer}>
              {
                trainers.map((e)=>{
                  return(
                    <MenuItem value={e.id} key={e.id}>{e.fname} </ MenuItem>
                  )
                })

              }
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} marginTop={2} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Membership type</InputLabel>
            <Select label='Membership type' name='period' defaultValue='1' onChange={onChange} value={trainer.period}>
              <MenuItem value='1'>Monthly (1 month)</MenuItem>
              <MenuItem value='3'>Quaterly (3 months)</MenuItem>
              <MenuItem value='6'>Bi-Yearly (6 months)</MenuItem>
              <MenuItem value='12'>Anually (1 year)</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
          <TextField
            
            fullWidth
            onChange={onChange}
            type='number'
            label='Subscription price'
            placeholder='per month'
            name='price'
            value={trainer.price}
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
              defaultValue={trainer.paid}
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
    {trainer.id &&
      <ResetButtonStyled
      sx={{marginTop: 8}}
      onClick = {
        async ()=>{
          if(confirm("Are you sure you want to delete ?")){
            const res = await axios.post("/api/delete/trainer", {id: trainer.id});
            if (res.status == 200) {
              router.push("/account-settings")
            } else {
              alert("Error occurred while deleting record")
            }
          }
        }
      }
      color='error'
      variant='outlined'
      >
      Remove Subscription
      </ResetButtonStyled>
    }
    </form>
    </CardContent>

  )
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
  const router = useRouter()
  return (
    <CardContent>
      <h1>Subscription for {user.fname}</h1>
      <form
        onSubmit={async e => {
          e.preventDefault()
          subs.customer = user.id
          subs.end_date = new Date(subs.start_date)
          subs.end_date.setMonth(subs.end_date.getMonth()+parseInt(subs.period));
          subs.end_date = subs.end_date.toISOString().split('T')[0]
          const res = await axios.post(postto, { customer: user, subscription: subs })
          if (res.status == 200){
            alert("Success");
          }
          else {
            alert("An error occured");
          }
        }}
      >
        <Grid item xs={12} sm={6}>
          <TextField
            
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

        <Grid item xs={12} marginTop={2} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Membership type</InputLabel>
            <Select label='Membership type' name='period' defaultValue='1' onChange={onChange} value={subs.period}>
              <MenuItem value='1'>Monthly (1 month)</MenuItem>
              <MenuItem value='3'>Quaterly (3 months)</MenuItem>
              <MenuItem value='6'>Bi-Yearly (6 months)</MenuItem>
              <MenuItem value='12'>Anually (1 year)</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
          <TextField
            
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
              defaultValue={subs.paid}
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
    {subs.id &&
      <ResetButtonStyled
      sx={{marginTop: 8}}
      onClick = {
        async ()=>{
          if(confirm("Are you sure you want to delete ?")){
            const res = await axios.post("/api/delete/subscription", {id: subs.id});
            if (res.status == 200) {
              router.push("/account-settings")
            } else {
              alert("Error occurred while deleting record")
            }
          }
        }
      }
      color='error'
      variant='outlined'
      >
      Remove Subscription
      </ResetButtonStyled>
    }
    </form>
    </CardContent>
  )
}

export function TrainerList({ trainers}) {
  const statusObj = {
    1: { color: 'success', text: 'paid' },
    0: { color: 'error', text: 'unpaid' }
  }
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              <TableCell>Trainer Name</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell> Period</TableCell>
              <TableCell> end_date</TableCell>
              <TableCell>payment Status</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trainers.map(row => (
              <TableRow hover key={row.start_date} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{row.fname}</Typography>
                  </Box>
                </TableCell>
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
                      {new Date(row.end_date)}
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
                      href={'/editTrainer/' + row.id}
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
                      {row.end_date}
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
