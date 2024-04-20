import Button from "@components/ui/Button"
import { signOut, useSession } from "next-auth/react"
import EventsList from "@components/shared/home/EventsList"

const Home = ({ searchParams }) => {
  return (
    <div>
      <EventsList q={searchParams.q} tag={searchParams.tag} />
    </div>
  )
}

export default Home