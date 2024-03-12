import moment from "moment"
import Link from "next/link"

type AttendUsersProps = {
  users: { userId: number, username: string, email: string, orderDate: Date }[],
  num: number,
  max: number,
  due: Date
}

const AttendUsers = ({ users, num, max, due } : AttendUsersProps) => {
  return (
    <div className='attend-users'>
      <div className="c2">
        <div style={{width: '100%'}}>
          
        </div>

        <div className="right">
          <input placeholder='Search' className='search fullWidth' />
        </div>
      </div>
      <section className="table">
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Username</th>
              <th>Order date</th>
              <th>Email</th>
            </tr>
          </thead>

          <tbody>
            { users.map((user, i) =>
              <tr>
                <td>{i+1}</td>
                <td><Link href={'/profile/' + user.userId}>{user.username}</Link></td>
                <td>{moment().subtract(1, 'day') < moment(user.orderDate) ? moment(user.orderDate).fromNow() : moment(user.orderDate).format('yy-MM-DD HH:mm A')}</td>
                <td>{user.email}</td>
              </tr>
            ) }
            { !users.length &&
              <tr>
                <td style={{ textAlign: 'center' }} colSpan={4}> No one </td>
              </tr>
            }
          </tbody>
          <tfoot>
            <tr>
              <th colSpan={2}>Users who will attend: {num}{ max ? '/' + max : null } { max == num && ' - full' }</th>
              <th colSpan={2}>Due: {moment(due).fromNow()}</th>
            </tr>
          </tfoot>
        </table>
      </section>
    </div>
  )
}

export default AttendUsers