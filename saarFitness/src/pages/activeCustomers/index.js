import UserTable from 'src/comps/UserTable'

export default function () {
  const tableData = [
    {
      name: 'John Doe',
      email: 'john.doe@example.com',
      dob: '1990-05-15', // Date of Birth
      renewal_date: '2023-12-31',
      renewal_type: 'Annual',
      status: 'paid' // Use lowercase status value
    },
    {
      name: 'Alice Smith',
      email: 'alice.smith@example.com',
      dob: '1995-08-20', // Date of Birth
      renewal_date: '2024-02-15',
      renewal_type: 'Monthly',
      status: 'unpaid' // Use lowercase status value
    },
    {
      name: 'Bob Johnson',
      email: 'bob.johnson@example.com',
      dob: '1985-11-10', // Date of Birth
      renewal_date: '2023-11-15',
      renewal_type: 'Annual',
      status: 'running_out' // Use lowercase status value
    }
    // Add more user objects as needed
  ]

  return <UserTable customers={tableData} total={tableData.length} />
}
