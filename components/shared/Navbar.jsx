'use client'

import { useSession } from "next-auth/react"
import { useEffect, useRef, useState } from "react"

import Link from "next/link"

import Button from "@components/ui/Button"
import Notifications from "@components/shared/Notifications"
import NotificationsIcon from "@mui/icons-material/Notifications"
import { getNumOfNotifications, readNotifications } from "@utils/api"

const Navbar = () => {
  const session = useSession()
  const [showNotif, setShowNotif] = useState(false)
  const [numNotif, setNumNotif] = useState(0)

  const navRef = useRef()

  const handleClick = () => {
    // show the navigation list in phone view
    navRef.current.classList.toggle('active')
  }

  useEffect(() => {
    if (!session.data) return
    // Get number of new notifications
    const getNumber = async() => {
      const data = await getNumOfNotifications(session.data.user.id)
      if (!data.success) return
      setNumNotif(data.number)
    }
    getNumber()
  }, [session])
  
  const openNotifications = async() => {
    setShowNotif(prev => !prev)

    if (!numNotif) return
    // Read the notifications
    setNumNotif(0)
    await readNotifications(session.data.user.id)
  }

  return (
    <>
      <div className={showNotif ? 'back-box' : ''} onClick={() => setShowNotif(false)}></div>
      <header className="fade">
        <h2 className="logo pan">Events</h2>
        <nav ref={navRef}>
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
          { session.data &&
            <div className="">
              <div className={"notifications-button pan d5" + (numNotif ? ' num' : '')} onClick={openNotifications} num={numNotif}>
                <NotificationsIcon />
              </div>
            </div>
          }
        </div>
      </header>
      {session.data && <Notifications show={showNotif} id={session.data.user.id} close={() => setShowNotif(false)} />}
    </>
  )
}

export default Navbar