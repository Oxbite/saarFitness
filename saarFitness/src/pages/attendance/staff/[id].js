import { AttendanceForm, AttendanceTable } from 'src/comps/Attendance'
import Error404 from '../../404'
import { db } from 'src/lib/db'
export default function AttendancePage({ attendances, customer }) {
  if (!customer || !attendances) {
    return <Error404 />
  }
  return <AttendanceForm attendance={attendances} user={customer} postto={"/api/staffAttendance"}/>
}

export async function getServerSideProps({ params }) {
  const id = params.id
  const attendance = await db('staff_attendance').select('*').where('id', id)
  let customer
  if (attendance) {
    customer = await db('staff').select('*').where('id', attendance[0].id)
  } else customer = null
  console.log(customer)
  return {
    props: {
      attendances: attendance[0] ?? null,
      customer: customer ?? null
    }
  }
}
