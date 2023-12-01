import { AttendanceForm } from 'src/comps/Attendance'
import OxbiteTable from 'src/comps/OxbiteTable';
import { db } from 'src/lib/db'
import Error404 from 'src/pages/404'

export default function ByUser({ attendance, customer }) {
  if (!customer) {
    return <Error404 />
  }
  let el;
  if (!attendance) {
    el = <AttendanceForm user={customer} postto = "/api/staffAttendance" />
  }
  else el= <AttendanceForm attendance={attendance} user={customer} postto="/api/staffAttendance" />
  return (
    <>
    {el}
    </>
  )
}

export async function getServerSideProps({ params }) {
  const id = params.id
  const attendance = await db('staff_attendance')
    .select('*')
    .where('staff', id)
    .andWhere('arrival', '>=', new Date().toISOString())
  const customer = await db('staff').select('*').where('id', id)
  return {
    props: {
      attendance: attendance[0] ?? null,
      customer: customer[0] ?? null
    }
  }
}
