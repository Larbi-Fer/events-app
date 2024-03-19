'use client'

import { searchAttendees } from "@utils/api"
import { waitForSearch } from "@utils/const"
import moment from "moment"
import Link from "next/link"
import { useState } from "react"

type AttendUsersProps = {
  users: { userId: number, username: string, email: string, image: string, orderDate: Date }[],
  eventId: number,
  num: number,
  max: number,
  due: Date,
}

const AttendUsers = ({ users: usersPass, eventId, num, max, due } : AttendUsersProps) => {
  const [users, setUsers] = useState(usersPass)
  const [loading, setLoading] = useState(false)
  const [time, setTime] = useState<NodeJS.Timeout>()

  const searchAtt = e => {
    const q = e.target.value
    
    clearTimeout(time)

    if (!q) {
      return setUsers(usersPass)
    }

    setLoading(true);
    setTime(setTimeout(async() => {
      const data = await searchAttendees(eventId, q)
      setUsers(data.users)
      setLoading(false)
    }, waitForSearch))
  }

  return (
    <div className='attend-users'>
      <div className="c2">
        <div style={{width: '100%'}}></div>

        <div className="right">
          <input placeholder='Search' className='search fullWidth' onChange={searchAtt} />
        </div>
      </div>
      <section className="table">
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Icon</th>
              <th>Email</th>
              <th>Username</th>
              <th>Order date</th>
            </tr>
          </thead>

          <tbody>
            { !loading && users.map((user, i) =>
              <tr>
                <td>{i+1}</td>
                <td className="profile-image"><img className="icon" src={user.image} alt="icon" /></td>
                <td>{user.email}</td>
                <td><Link href={'/profile/' + user.userId}>{user.username}</Link></td>
                <td>{moment().subtract(1, 'day') < moment(user.orderDate) ? moment(user.orderDate).fromNow() : moment(user.orderDate).format('yy-MM-DD HH:mm A')}</td>
              </tr>
            ) }
            { (!users.length && !loading) &&
              <tr>
                <td style={{ textAlign: 'center' }} colSpan={5}> No one </td>
              </tr>
            }
            { loading &&
              <tr>
                <td colSpan={5} className="loading black"> L </td>
              </tr>
            }
          </tbody>
          <tfoot>
            <tr>
              <th colSpan={3}>Users who will attend: {num}{ max ? '/' + max : null } { max == num && ' - full' }</th>
              <th colSpan={2}>Due: {moment(due).fromNow()}</th>
            </tr>
          </tfoot>
        </table>
      </section>
    </div>
  )
}

export default AttendUsers