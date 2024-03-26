import '@styles/profile.css'

import dbConnection from '@utils/db';
import { GET } from '@app/api/profile/[id]/route.js'
import { NextRequest } from 'next/server';

import { getServerSession } from 'next-auth'

import ProfileCollection from '@components/shared/Profile/ProfileCollection';
import ProfileInfo from '@components/shared/Profile/ProfileInfo';

var user, OK = false;

export const generateMetadata = async ({ params: {id} }) => {
  while(!OK) await new Promise(r => setTimeout(r, 100))
  OK = false

  return {
    title: user?.username || 'Not found',
    icon: user?.image || '/profile.jpg',
  }
}


const Profile = async ({ params: { id } }) => {
  const session = await getServerSession()
  
  // get user info
  const db = await dbConnection()
  const [[result]] = await db.execute('SELECT * FROM users WHERE id = ?', [id])
  user = result
  db.end()
  
  OK = true
  if (!user) return (<div className='profile c2'>User not found</div>)

  const R = new NextRequest(`${process.env.NEXTAUTH_URL}/api/profile/${id}?${session ? 'userEmail=' + session.user.email : ''}`)

  const { organized, myTickets, user: userInfo } = (await (await GET(R, { params: { id } })).json())
  user = {...user, ...userInfo}

  return (
    <div className='profile c2'>
      <ProfileInfo user={user} />

      <div className="user-events">
        {myTickets &&
          <ProfileCollection
            events={myTickets}
            title='My Tickets'
            buttonText='Explore more'
            buttonHref='/home'
            emptyText='You can browse more'
            type='My_Tickets'
          />}

        <ProfileCollection
          events={organized}
          title='Events Organized'
          buttonText='Create event'
          buttonHref='/create'
          emptyText={user.email == session?.user?.email ? 'You can create one' : 'Maybe you will find events next time'}
          type='Organized_Events'
        />

      </div>
    </div>
  )
}

export default Profile