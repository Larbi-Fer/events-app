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

const EventDetail = ({ id }) => {
  const [event, setEvent] = useState()
  const [dueDate, setDueDate] = useState()

  useEffect(() => {
    
    return async() => {
      const data = await getEvent(id)
      if (!data.success) return
      document.title = data.event.title + ' | event'
      setDueDate(new Date(data.event.isDue ? data.event.dueDate : data.event.startDate))
      setEvent(data.event)
    }
  }, [])

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
        <div className="attend">
          <div className="button">
            <Button disabled={new Date() > dueDate}>I WILL ATTEND</Button>
            <span>0{event.isMax ? `/${event.max}` : ''} People will attend</span>
            {/* <span>200/200 Tickets sold out</span> */}
          </div>
          <div className={"countdown" + (new Date() > dueDate ? ' disabled' : '')}>
            {fromNow(dueDate)}
          </div>
        </div>

      </div>
    : <h3>Loading ...</h3>
  )
}

export default EventDetail