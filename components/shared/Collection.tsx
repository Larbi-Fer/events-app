import Card from "./Card"

type CollectionProps = {
  events: any[],
  emptyText: string,
  loading?: boolean,
  isAttend?: boolean,
  editable: boolean,
}

const Collection = ({ events, emptyText, loading, isAttend, editable }: CollectionProps) => {

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
              return <Card data={event} i={i} key={event.id} editable={editable} />
            }
            )
        }
      </div>

    </div>
  )
}

export default Collection