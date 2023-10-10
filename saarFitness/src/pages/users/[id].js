import { UserForm } from 'src/comps/UserForm'
import UserTable from 'src/comps/UserTable'

export default function () {
  const userdata = {
    fname: 'John Doe',
    address: '123 Main Street',
    dob: '1990-05-15',
    gender: 'Male',
    city: 'New York',
    phone: '123-456-7890',
    email: 'johndoe@example.com',
    height: '180 cm',
    weight: '75 kg',
    training_type: 'Strength Training',
    emergency_contact: 'Jane Doe (Spouse)',
    period: '6 months'
  }

  return <UserForm customer={userdata} cond={[{ year: '2020', detail: 'very cool', type: 'physical' }]} />
}
