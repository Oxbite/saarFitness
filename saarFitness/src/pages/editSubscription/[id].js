import SubscriptionForm from 'src/comps/Subscription'
import Error404 from '../404'
import { db } from 'src/lib/db'

export default function ({ subscription, customer }) {
  if (!subscription) {
    return <Error404 />
  }
  console.log(subscription)
  console.log(customer)
  return <SubscriptionForm subscription={subscription} user={customer} postto={'/api/editSubscription'} />
}

export async function getServerSideProps({ params }) {
  const subscriptions = await db('subscription').select('*').where('id', params.id)
  const customer = await db('customer').select('*').where('id', subscriptions[0].customer)
  return {
    props: {
      subscription: subscriptions[0] ?? null,
      customer: customer[0] ?? null
    }
  }
}
