import { Button } from '@components/ui/Button'
import dbConnection from '@utils/db'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'

const Profile = async(p) => {
  const session = await getServerSession()
  
  if (!session) {
    return (
      <div>
        Login first <br />
        <Link href='/login'>LOGIN</Link>
      </div>
    )
  }
  const db = await dbConnection()
  const [[user]] = await db.execute('SELECT id FROM users WHERE email = ?', [session.user.email])
  db.end()
  redirect('/profile/' + user.id)
}

export default Profile