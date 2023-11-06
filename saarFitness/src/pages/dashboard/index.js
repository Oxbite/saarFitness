import LoginOrDefault from 'src/comps/login'
import Dashboard from './index_dashboard'

export default function DB() {
  return <LoginOrDefault def={<Dashboard />} />
}
