import EventDetail from "@components/shared/EventDetail"

export const metadate = {
  title: 'Event'
}

const Event = ({ params: { id } }) => {
  return (
    <EventDetail id={id} />
  )
}

export default Event