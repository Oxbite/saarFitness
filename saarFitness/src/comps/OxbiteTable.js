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


export default function OxbiteTable({headers = [], rows = [], filler, pagination = false, page, handleChangePage}) {
  return(
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {headers.map(head=>{return(
                <TableCell key = {head}>{head}</TableCell>
              )})}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow hover key={row.fname} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                {filler(row, index)}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    { pagination &&
      <TablePagination
        component='div'
        rowsPerPage={100}
        rowsPerPageOptions={[100]}
        count={rows.length}
        page={page}
        onPageChange={handleChangePage}
      />
    }
    </Paper>
  )
}
