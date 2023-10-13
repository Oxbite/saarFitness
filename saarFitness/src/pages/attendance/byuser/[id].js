import { AttendanceForm } from 'src/comps/Attendance'
import { db } from 'src/lib/db'
import Error404 from 'src/pages/404'

export default function ByUser({ attendance, customer }) {
  if (!customer) {
    return <Error404 />
  }
  if (!attendance) {
    return <AttendanceForm user={customer} />
  }
  return <AttendanceForm attendance={attendance} user={customer} />
}

export async function getServerSideProps({ params }) {
  const id = params.id
  const attendance = await db('attendance')
    .select('*')
    .where('customer', id)
    .andWhere('arrival', '<=', new Date().toISOString())
  const customer = await db('customer').select('*').where('id', id)
  console.log(customer)
  return {
    props: {
      attendance: attendance[0] ?? null,
      customer: customer[0] ?? null
    }
  }
}
