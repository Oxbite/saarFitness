import { db } from 'src/lib/db'
import Error404 from '../404'
import { StaffTable } from 'src/comps/staff'

export default function ({ staff }) {
  if (!staff) {
    return <Error404 />
  }
  return <StaffTable staff={staff} />
}

export async function getServerSideProps() {
  return {
    props: {
      staff: await db('staff').select('*')
    }
  }
}
