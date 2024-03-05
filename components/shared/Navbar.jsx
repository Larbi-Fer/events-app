'use client'

import { useSession } from "next-auth/react"
import { useRef } from "react"

import Link from "next/link"

import Button from "@components/ui/Button"

const Navbar = () => {
  const session = useSession()
  const ref = useRef()

  const handleClick = () => {
    // show the navigation list in phone view
    ref.current.classList.toggle('active')
  }

  return (
    <header>
      <h2 className="logo">Events</h2>
      <nav ref={ref}>
        { session.data ?
        <ul className="nav-links">
          <li><Link href='/home'>Home</Link></li>
          <li><Link href='/create'>Create New Event</Link></li>
          <li><Link href='#'>My events</Link></li>
        </ul>
        : null}
      </nav>
      <div className="buttons">
        { session.data ?
            <>
              <input type="text" placeholder="Search ..." />
              <Button round>Profile</Button>
            </>
          :
            <>
              <Link href='/signup' className="cta"><Button round>GET STARTED</Button></Link>
              <Link href='/login' className="cta"><Button round>LOGIN</Button></Link>
            </>
        }
        <div className="show-items" onClick={handleClick}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </header>
  )
}

export default Navbar