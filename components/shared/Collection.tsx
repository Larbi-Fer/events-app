'use client'

import { deleteEvent } from "@utils/api"
import Card from "./Card"
import Message from "@components/ui/Message"
import { useState } from "react"

type CollectionProps = {
  events: any[],
  emptyText: string,
  loading?: boolean,
  isAttend?: boolean,
  editable: boolean,
  handleDeleteOne: (type: 'upcom' | 'prev', id: number) => any
}

const Collection = ({ events, emptyText, loading, isAttend, editable, handleDeleteOne }: CollectionProps) => {
  const [idForDeleteing, setIdForDeleteing] = useState<[number, boolean]>([null, false])
  const [loadingForDeleting, setLoadingForDeleting] = useState(false)

  const handleDelete = async() => {
    setLoadingForDeleting(true)
    setIdForDeleteing([idForDeleteing[0], false])

    const event = events.find(event => event.id == idForDeleteing[0])
    await deleteEvent(idForDeleteing[0], event.creator)
    handleDeleteOne( new Date(event.isDue ? event.dueDate : event.endDate) > new Date() ? 'upcom' : 'prev', idForDeleteing[0] )
    setLoadingForDeleting(false)
    setIdForDeleteing([null, false])
  }

  return (
    <div className={"collection" + (loading ? ' loading' : '')}>
      <div className="events">

        {
          !events || events?.length === 0 ?
            // if no events or events length is 0
            <div className="empty fade">
              {!loading && <img src="/icons/empty.png" alt="empty" />}
              <div className="title">No event</div>
              <div className="empty-text">{emptyText}</div>
            </div> :
            // if there are events
            events?.map((event, i) => {
              event.isAttend = isAttend ? isAttend : event.isAttend
              return <Card data={event} i={i} key={event.id} editable={editable} deleteEvent={id => setIdForDeleteing([id, true])} blur={loadingForDeleting && event.id == idForDeleteing[0]} />
            }
            )
        }
      </div>

      <Message
        title="Delete Event!"
        show={idForDeleteing[1]}
        onClose={() => setIdForDeleteing([null, false])}
        width="sm"
        buttons={[{ text: 'DELETE', onClick: handleDelete }]}
      >
        Are you sure?
      </Message>

    </div>
  )
}

export default Collection