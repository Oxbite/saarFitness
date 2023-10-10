import { AttendanceTable } from 'src/comps/Attendance'

export default function AttendancePage({ params }) {
  const customers = [
    {
      id: 1,
      name: 'Nishedh'
    },
    {
      id: 2,
      name: '2cust'
    }
  ]
  // call the api for all the attendance for today
  const attendances = [
    {
      id: 2,
      customerId: 2,
      arrival: new Date().toString()
    }
  ]

  return <AttendanceTable customers={customers} att={attendances} />
}
