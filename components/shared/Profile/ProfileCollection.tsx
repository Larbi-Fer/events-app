'use client'

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import Link from 'next/link';
import Collection from '@components/shared/Collection';
import Button from '@components/ui/Button';

import { getEventsData } from '@utils/api';
import { Session } from 'inspector';

type ProfileCollectionProps = {
  events: any[],
  title: string,
  buttonText: string,
  emptyText: string,
  type: 'My_Tickets' | 'Organized_Events' | 'All_Events',
  buttonHref: string,
}

type selectedProps = 'upcom' | 'prev'

const ProfileCollection = ({ events, title, buttonText, emptyText, type, buttonHref } : ProfileCollectionProps) => {
  var { id: userId } = useParams()
  const session : { [key: string]: any } = useSession()
  // const session : SessionContextValue & { update: UpdateSession data: Session & { user: {id: string | number } } } = useSession()
  // const [session, setSession] = useState(null)
  const [selected, setSelected] = useState<selectedProps>('upcom')
  const [prevEvents, setPrevEvents] = useState<any[]>()
  

  const router = useRouter()

  useEffect(() => {
    (async() => {
      // if there are no upcoming events, set selected to previous
      if (!events.length) setSelected('prev')
    })()
  }, [])

  /* useEffect(() => {
    if(sess.status == "loading") return
    const s : {  } = sess
    setSession(sess)
  }, [sess]) */
  
  

  // get previous events if the selected is previous
  useEffect(() => {
    if (session.status == 'loading') return
    // if the selected is upcoming or there are previous events, return
    if (selected == 'upcom' || prevEvents) return

    const getEvents = async() => {
      const data = await getEventsData(type, parseInt(userId as string), session.data?.user?.email)

      if (!data.success) return
      setPrevEvents(data.events)
    }
    getEvents()
  }, [selected, session])

  const handleDeleteOne = (type: selectedProps, id: number) => {
    if (type == 'upcom') router.refresh()
    else setPrevEvents(prev => prev.filter(event => event.id != id))
  }

  // Select the previous or upcoming events
  const handleSelect = (s:selectedProps) => () => setSelected(s)

  return (
    <div className="profile-coll">

      <div className="top">
        <div className="title">{title}</div>
        {session.data?.user?.id == userId && <div className="button"><Link href={buttonHref}><Button>{buttonText}</Button></Link></div>}
      </div>

      <div className="time">
        <div onClick={handleSelect('prev')} className="first">Previous</div>
        <div onClick={handleSelect('upcom')} className="last">Upcoming</div>
        <span style={{ left: selected == 'prev' ? '-50%' : '50%' }}></span>
      </div>

      <Collection
        events={selected == 'upcom' ? events : prevEvents}
        emptyText={emptyText}
        loading={!prevEvents && selected == 'prev'}
        isAttend={type == 'My_Tickets'}
        editable={type == 'Organized_Events' && (selected == 'upcom' ? events : prevEvents)?.[0]?.creator == session.data?.user?.id}
        handleDeleteOne={handleDeleteOne}
      />

    </div>
  );
};

export default ProfileCollection