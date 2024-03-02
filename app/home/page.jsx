'use client'

import Button from "@components/ui/Button"
import { signOut, useSession } from "next-auth/react"

const Home = () => {
  const session = useSession()
  return (
    <div>
      <Button onClick={async() => await signOut()}>Home</Button>
      <Button onClick={() => console.log(session)}>session</Button>
    </div>
  )
}

export default Home