// ** MUI Imports
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
// ** Icons Imports
import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'
// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'
// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
// ** Demo Components Imports
import Table from 'src/views/dashboard/Table'
import Trophy from 'src/views/dashboard/Trophy'
import TotalEarning from 'src/views/dashboard/TotalEarning'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'
import DepositWithdraw from 'src/views/dashboard/DepositWithdraw'
import SalesByCountries from 'src/views/dashboard/SalesByCountries'
import { Box } from 'mdi-material-ui'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { LogoutOutlined } from '@mui/icons-material'


const Dashboard = () => {
  const [income, setIncome] = useState(null)
   useEffect(()=>{
    const api = async()=>{
      const res = await axios.get("/api/getIncome");
      if (res.data){
        setIncome(res.data);
      }
    }
     api();
   },
   []);
  if (!income){
    return <></>
  }
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={8}>
          <StatisticsCard total_unpaid={income.unpaidCount} total_income={income.yearly + income.monthly + income.quarterly} total_customers={income.customerCount} outstanding_income={income.unpaidAmount} />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TotalEarning yearly={income.yearly} quarterly={income.quarterly} monthly={income.monthly} />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Grid container spacing={6}>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats={income.staffCount}
                icon={<Poll />}
                color='success'
                title='Staff Count'
                link = "/addstaff"
                linktext = "Add Staff"
              />
            </Grid>
            <Grid item xs={6}>
          <Card style={{cursor: "pointer"}} onClick={async()=>{
          const res = await axios.get("/api/logout");
          if(res.data) {
            location.reload()
          }
      }}>
        <CardContent>

      <LogoutOutlined />
          <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>{"Logout"}</Typography>
        </CardContent>
      </Card>

            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard
