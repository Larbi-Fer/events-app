'use client'

import Button from "@components/ui/Button"
import { signOut } from "next-auth/react"

const Home = () => {
  return (
    <Button onClick={async() => await signOut()}>Home</Button>
  )
}

export default Home