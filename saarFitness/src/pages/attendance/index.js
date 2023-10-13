import { AttendanceTable } from 'src/comps/Attendance'
import { db } from 'src/lib/db'

export default function AttendancePage({ customers, attendances }) {
  return <AttendanceTable customers={customers} att={attendances} postto='/api/editSubscription' />
}
export async function getServerSideProps() {
  const today = new Date() // Get the current date
  const formattedDate = today.toISOString().split('T')[0] // Format date as 'YYYY-MM-DD'

  const attendances = await db('attendance').select('*').where('arrival', '>=', formattedDate)
  const customers = await db('customer')
    .select('*')
    .join('subscription', 'customer.id', '=', 'subscription.customer')
    .where('subscription.end_date', '>=', formattedDate)
    .andWhere('subscription.start_date', '<=', formattedDate)
  return {
    props: {
      customers,
      attendances
    }
  }
}
