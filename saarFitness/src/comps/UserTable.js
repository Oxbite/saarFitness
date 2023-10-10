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
import { useState } from 'react'
import Link from 'next/link'
const statusObj = {
  paid: { color: 'success', text: 'paid' },
  unpaid: { color: 'error', text: 'unpaid' },
  running_out: { color: 'warning', text: 'expiring soon!' }
}
function compareUsers(user1, user2) {
  // Define the order of statuses based on priority
  const statusOrder = { unpaid: 0, running_out: 1, paid: 2 }

  // Compare users based on status priority
  const statusPriority1 = statusOrder[user1.status]
  const statusPriority2 = statusOrder[user2.status]

  return statusPriority1 - statusPriority2
}
export default function UserTable({ customers: [], total }) {
  const [page, setPage] = useState(0)
  const [rows, setRows] = useState([...customers])
  const [rowsPerPage, setRowsPerPage] = useState(10)

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
              <TableCell>Email</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Renewal Date</TableCell>
              <TableCell> Renewal Type</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow hover key={row.name} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
                      <Link href={'/users/' + row.id}>
                        <Box sx={{ cursor: 'pointer', textDecoration: 'underline' }}>
                          {row.name}
                          <AccountEdit />
                        </Box>
                      </Link>
                    </Typography>
                    <Typography variant='caption'>{row.designation}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{Math.floor((new Date() - new Date(row.dob)) / (365.25 * 24 * 60 * 60 * 1000))}</TableCell>
                <TableCell>{row.renewal_date}</TableCell>
                <TableCell>{row.renewal_type}</TableCell>
                <TableCell>
                  <Chip
                    label={statusObj[row.status].text}
                    color={statusObj[row.status].color}
                    sx={{
                      height: 24,
                      fontSize: '0.75rem',
                      textTransform: 'capitalize',
                      '& .MuiChip-label': { fontWeight: 500 }
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component='div'
        rowsPerPage={100}
        rowsPerPageOptions={[100]}
        count={total}
        page={page}
        onPageChange={handleChangePage}
      />
    </Paper>
  )
  //   const [rows, setRows] = useState([...customers])
  //   return (
  //     <Card>
  //       <TableContainer>
  //         <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
  //           <TableHead>
  //             <TableRow>
  //               <TableCell>Name</TableCell>
  //               <TableCell>Email</TableCell>
  //               <TableCell>Age</TableCell>
  //               <TableCell>Renewal Date</TableCell>
  //               <TableCell> Renewal Type</TableCell>
  //               <TableCell>Status</TableCell>
  //             </TableRow>
  //           </TableHead>
  //           <TableBody>
  //             {rows.map(row => (
  //               <TableRow hover key={row.name} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
  //                 <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
  //                   <Box sx={{ display: 'flex', flexDirection: 'column' }}>
  //                     <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
  //                       {row.name}
  //                       <AccountEdit />
  //                     </Typography>
  //                     <Typography variant='caption'>{row.designation}</Typography>
  //                   </Box>
  //                 </TableCell>
  //                 <TableCell>{row.email}</TableCell>
  //                 <TableCell>{row.date}</TableCell>
  //                 <TableCell>{Math.floor((new Date() - row.dob) / (365.25 * 24 * 60 * 60 * 1000))}</TableCell>
  //                 <TableCell>{row.renewal_date}</TableCell>
  //                 <TableCell>{row.renewal_type}</TableCell>
  //                 <TableCell>
  //                   <Chip
  //                     label={statusObj[row.status].text}
  //                     color={statusObj[row.status].color}
  //                     sx={{
  //                       height: 24,
  //                       fontSize: '0.75rem',
  //                       textTransform: 'capitalize',
  //                       '& .MuiChip-label': { fontWeight: 500 }
  //                     }}
  //                   />
  //                 </TableCell>
  //               </TableRow>
  //             ))}
  //           </TableBody>
  //         </Table>
  //       </TableContainer>
  //     </Card>
  //   )
}
