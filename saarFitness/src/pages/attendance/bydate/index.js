import { AttendanceDate, AttendanceTable } from 'src/comps/Attendance'
import { db } from 'src/lib/db'

export default function AttendancePage({ attendances }) {
  return <AttendanceDate att={attendances} />
}
export async function getServerSideProps() {
  const today = new Date() // Get the current date
  const formattedDate = today.toISOString().split('T')[0] // Format date as 'YYYY-MM-DD'

  const attendances = await db('attendance')
    .select('attendance.*', 'customer.fname') // Select the columns you need
    .join('customer', 'attendance.customer', 'customer.id') // Join attendance with customers
    .where('arrival', '>=', formattedDate)
  return {
    props: {
      attendances
    }
  }
}
