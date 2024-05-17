import EventDetail from "@components/shared/EventDetail"
import dbConnection from "@utils/db"

export const generateMetadata = async ({ params: {id} }) => {
  const db = await dbConnection()
  const [[event]] = await db.execute('SELECT * FROM events WHERE id = ?', [id])
  db.end()
  // console.log(event)
  return {
    title: event?.title || 'Not found',
    icon: event?.image,
    description: event?.description || 'Not found',
    image: event?.image,
  }
}

const Event = ({ params: { id } }) => {
  return (
    <EventDetail id={id} />
  )
}

export default Event