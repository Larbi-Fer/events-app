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
    <header className="fade">
      <h2 className="logo pan">Events</h2>
      <nav ref={ref}>
        { session.data ?
        <ul className="nav-links">
          <li  className="pan"><Link href='/home'>Home</Link></li>
          <li className="pan d1"><Link href='/create'>Create New Event</Link></li>
          <li className="pan d2"><Link href={'/profile/' + session.data?.user.id}>My Profile</Link></li>
        </ul>
        : null}
      </nav>
      <div className="buttons">
        { session.data ?
            <>
              <input className="pan d3" type="text" placeholder="Search ..." />
              <Button className="pan d4" round>{session.data.user.username}</Button>
            </>
          :
            <>
              <Link href='/signup' className="cta pan"><Button round>GET STARTED</Button></Link>
              <Link href='/login' className="cta pan d1"><Button round>LOGIN</Button></Link>
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