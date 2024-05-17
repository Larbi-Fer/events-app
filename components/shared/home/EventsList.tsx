'use client'

import { useEffect, useState } from "react"

import Button from "@components/ui/Button"
import Collection from "../Collection"

import { getEventsForHome } from "@utils/api"
import { showEventsLimit } from "@utils/const"

type EventsListProps = {
  q?: string,
  tag?: string,
}

const EventsList = ({ q, tag } : EventsListProps) => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [eventsNum, setEventsNum] = useState(0)

  useEffect(() => {
    // Get Events
    (async () => {
      setLoading(true)
      const res = await getEventsForHome(q, tag)
      if (!res.success) return

      setEvents(res.events)
      setEventsNum(res.events.length)
      setLoading(false)
    })()
  }, [q, tag])
  
  const loadMore = async () => {
    setLoading(true)
    const res = await getEventsForHome(q, tag, eventsNum)
    if (!res.success) return

    setEvents(prevEv => [...prevEv, ...res.events])
    setEventsNum(eventsNum + res.events.length)
    setLoading(false)
  }

  return (
    <div>
      <Collection events={events} editable={false} emptyText="Come back later" loading={loading} handleDeleteOne={(t, i) => {}} />
      {
        eventsNum != 0 && (eventsNum % showEventsLimit) == 0 && !loading && <Button onClick={loadMore} className="load-more">Load More</Button>
      }
    </div>
  )
}

export default EventsList