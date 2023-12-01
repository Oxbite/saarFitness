import { StaffAttendance } from 'src/comps/Attendance'
import { db } from 'src/lib/db'

export default function AttendancePage({ attendances }) {
  console.log('attendances',attendances)
  return <StaffAttendance data={attendances} />
}
export async function getServerSideProps() {
  const today = new Date() // Get the current date
  const formattedDate = today.toISOString().split('T')[0] // Format date as 'YYYY-MM-DD'

  const attendances = await db('staff')
  .select('staff.id as id', 'staff.fname', 'attendance.id as attendance_id', 'attendance.arrival', 'attendance.departure')
  .leftJoin('staff_attendance as attendance', function () {
    this.on('staff.id', '=', 'attendance.staff').andOn('attendance.arrival', '>=', db.raw('?', [formattedDate]));
  });
  return {
    props: {
      attendances
    }
  }
}
