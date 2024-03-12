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
    if (session.status == 'loading') return
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
            <div className="c2">
            <b>Category: </b><h3 className="category">{event.category}</h3>
              <p> | <b>By: </b> <Link href={`/profile/${event.creator}`}>{event.username}</Link></p>
            </div>
            <img src={event.image} alt="" />
          </div>

          <div className="right">
            <h1 className='title'>{event.title}</h1>
            <div className="tags">
              { event.tags?.split(',').map(tag => <label>{tag}</label>) }
            </div>

            <div className="location">
              <i><PlaceIcon /></i>
              <lable className="text">{event.location}</lable>
            </div>

            <div className="schedule">
              <i><CalendarIcon /></i>
              <lable className="text">{dateBetween(event.startDate, event.endDate)}</lable>
            </div>

            <div className="desc">
              <h2>Description: </h2>
              <p>{event.description}</p>
            </div>

            <div className="url">
              <Link href={event.url} target='_blank'>{event.url}</Link>
            </div>


          </div>

        </div>
        {event.creator != session.data?.user.id ?
          <div className="attend">
            <div className="button">
              <Button onClick={handleAttend} disabled={(new Date() > dueDate || (((event.isMax && event.attend >= event.max) || !session.data) && !event.user.isAttend))}>
                {event.user.isAttend ? 'CANCEL' : 'I WILL ATTEND'}
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
          :
          <div className="c2 footer-section">
              <AttendUsers users={event.attendees} num={event.attend} max={event.max} due={dueDate} />
            <div style={{width: '100%'}}>Test</div>
          </div>
        }

      </div>
    : <h3>Loading ...</h3>
  )
}

export default EventDetail