import { UserForm } from 'src/comps/staff'
import Error404 from '../404'
import { db } from 'src/lib/db'

export default function Page({ staff }) {
  if (!staff) {
    return <Error404 />
  }

  return <UserForm staff={staff} postto='/api/editStaff' />
}

export async function getServerSideProps({ params }) {
  const { id } = params
  const staff = await db('staff').select('*').where('id', id)

  return {
    props: {
      staff: staff.length > 0 ? staff[0] : null
    }
  }
}
