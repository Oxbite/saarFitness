import { AttendanceTable } from 'src/comps/Attendance'

export default function AttendancePage({ params }) {
  const customers = []
  // call the api for all the attendance for today
  const attendances = []
  return <AttendanceTable customers={customers} attendances={attendances} />
}
