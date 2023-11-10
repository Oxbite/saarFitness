import {TrainerForm} from 'src/comps/Subscription'
import Error404 from '../404'
import { db } from 'src/lib/db'

export default function ({ subscription, customer, trainers }) {
  if (!subscription) {
    return <Error404 />
  }
  console.log(subscription)
  console.log(customer)
  return <TrainerForm trainers={trainers} trainerx={subscription} user={customer} postto={'/api/editSubscription'} />
}

export async function getServerSideProps({ params }) {
  const trainer = await db('trainer').select('*').where('id', params.id)
  const customer = await db('customer').select('*').where('id', trainer[0].customer)
  const trainers = await db('staff').select('*')
  return {
    props: {
      subscription: trainer[0] ?? null,
      customer: customer[0] ?? null,
      trainers: trainers,
    }
  }
}
