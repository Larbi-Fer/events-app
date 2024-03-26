'use client'

import '@styles/eventDetail.css'
import PlaceIcon from '@mui/icons-material/LocationOnOutlined';
import CalendarIcon from '@mui/icons-material/DateRangeOutlined';
import { useEffect, useState } from 'react'
import { getEvent } from '@utils/api'
import { dateBetween } from '@utils'
import Link from 'next/link';
import Button from '@components/ui/Button';
import { fromNow } from '@/utils';
import { setAttend } from '../../utils/api';
import { useSession } from 'next-auth/react';
import AttendUsers from './AttendUsers';
import Comments from './Comments';
import Loading from '@components/ui/Loading';

const EventDetail = ({ id }) => {
  const [event, setEvent] = useState()
  const [dueDate, setDueDate] = useState()
  const session = useSession();

  useEffect(() => {
    
    const getData = async() => {
      // session.update({ test: 123 })
      const data = await getEvent(id, session.data?.user.id)
      if (!data.success) return
      document.title = data.event.title + ' | event'
      setDueDate(new Date(data.event.isDue ? data.event.dueDate : data.event.startDate))
      console.log(data.event, session.data)
      setEvent(data.event)
    }
    if (session.status == 'loading' || event) return
    getData()
  }, [session])

  const handleAttend = async() => {
    if (!session.data || new Date() > dueDate) return
    const { data } = await setAttend(session.data.user.id, event.id);
    console.log(data)
    setEvent( old => ({...old, attend: old.attend + ( data.isAttend ? 1 : -1 ), user: {...old.user, isAttend: data.isAttend}}) )
  }

  return (
    event ?
      <div className="event">
        <div className="c2">
          <div className="left">
            <div className="c2 rise">
              <b>Category: </b><h3 className="category">{event.category}</h3>
              <p> | <b>By: </b> <Link href={`/profile/${event.creator}`}>{event.username}</Link></p>
            </div>
            <img src={event.image} alt="" className='rise d1' />
          </div>

          <div className="right">
            <h1 className='title rise'>{event.title}</h1>
            <div className="tags rise d1">
              { event.tags?.split(',').map(tag => <label>{tag}</label>) }
            </div>

            <div className="location rise d2">
              <i><PlaceIcon /></i>
              <lable className="text rise d3">{event.location}</lable>
            </div>

            <div className="schedule rise d4">
              <i><CalendarIcon /></i>
              <lable className="text rise d5">{dateBetween(event.startDate, event.endDate)}</lable>
            </div>

            <div className="desc rise d6">
              <h2>Description: </h2>
              <p>{event.description}</p>
            </div>

            <div className="url d7 rise">
              <Link href={event.url} target='_blank'>{event.url}</Link>
            </div>


          </div>

        </div>
        {event.creator != session.data?.user.id ?
          <>
            { event.attendButton &&
              <div className="attend">
                <div className="button">
                  <Button onClick={handleAttend} disabled={(new Date() > dueDate || (((event.isMax && event.attend >= event.max) || !session.data) && !event.user.isAttend))}>
                    {session.data ? (event.user.isAttend ? 'CANCEL' : 'I WILL ATTEND') : 'LOGIN TO ATTEND'}
                  </Button>
                  <span className={event.isMax && event.attend >= event.max ? 'disabled' : null}>
                    {event.attend}{event.isMax ? `/${event.max}` : ''}
                    {(event.isMax ? '' : ' ') + (event.isMax && event.attend >= event.max ? 'Tickets sold out' :  'People will attend')}
                  </span>
                </div>
                <div className={"countdown" + (new Date() > dueDate ? ' disabled' : '')}>
                  {fromNow(dueDate)}
                </div>
              </div>
            }

            <Comments eventId={event.id} eventCreatorId={event.creator} user={session.data?.user} />
          </>
          :
          event.attendButton ?
          <div className="c2 footer-section">
            <AttendUsers users={event.attendees} eventId={event.id} num={event.attend} max={event.max} due={dueDate} />
            <div style={{width: '100%'}}>
              <Comments eventId={event.id} eventCreatorId={event.creator} user={session.data?.user} fullWidth />
            </div>
          </div> :
          <Comments eventId={event.id} eventCreatorId={event.creator} user={session.data?.user} />
        }

      </div>
    : <Loading />
  )
}

export default EventDetail