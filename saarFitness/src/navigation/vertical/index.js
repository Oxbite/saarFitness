// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AccountArrowRight from 'mdi-material-ui/AccountArrowRight'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'

const navigation = () => {
  return [
    {
      title: "Admin dashboard",
      icon: HomeOutline,
      path: "/dashboard"
    },
    {
      title: 'Staff',
      icon: AccountCogOutline,
      path: '/staff'
    },
    {
      title: 'Clients',
      icon: AccountCogOutline,
      path: '/account-settings'
    },
    {
      sectionTitle: 'Pages'
    },

    // {
    //   title: 'Login',
    //   icon: Login,
    //   path: '/pages/login',
    //   openInNewTab: false
    // },
    {
      title: 'Add Clients',
      icon: AccountPlusOutline,
      path: '/addcustomer',
      openInNewTab: false
    },
    {
      title: 'Add Staff',
      icon: AccountPlusOutline,
      path: '/addstaff',
      openInNewTab: false
    },
    {
      title: 'Attendances',
      icon: AccountArrowRight,
      path: '/attendance',
      openInNewTab: false
    },
    {
      title: 'Staff Attendance',
      icon: AccountArrowRight,
      path: '/attendance/staff',
      openInNewTab: false
    }
    // {
    //   sectionTitle: 'User Interface'
    // },
    // {
    //   title: 'Typography',
    //   icon: FormatLetterCase,
    //   path: '/typography'
    // },
    // {
    //   title: 'Icons',
    //   path: '/icons',
    //   icon: GoogleCirclesExtended
    // },
    // {
    //   title: 'Cards',
    //   icon: CreditCardOutline,
    //   path: '/cards'
    // },
    // {
    //   title: 'Tables',
    //   icon: Table,
    //   path: '/tables'
    // },
    // {
    //   icon: CubeOutline,
    //   title: 'Form Layouts',
    //   path: '/form-layouts'
    // }
  ]
}

export default navigation
