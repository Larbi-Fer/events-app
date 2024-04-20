'use client'

import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

import Link from "next/link"

import { fromNow } from "@utils"
import { getNotifications, openANotification } from "@utils/api"

type NotifProps = {
  id: number,
  logo: string,
  message: string,
  createdAt: string,
  redirectUrl: string,
  isRead: boolean,
  isOpen: boolean
}[]

const Notifications = ({ id, show, close } : { id: number, show: boolean, close: () => void }) => {
  const [notif, setNotif] = useState<NotifProps>()
  const ref = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    // Open and close notifications box
    if(show) {
      ref.current.classList.remove('inactive')
      ref.current.classList.add('active')
    } else {
      ref.current.classList.remove('active')
      ref.current.classList.add('inactive')
    }

    if (!show || notif) return
    // On opened notifications box in first time, get the notifications
    const getNotif = async () => {
      const data = await getNotifications(id)

      if (!data.success) return
      setNotif(data.notifications)
    }
    getNotif()
  }, [show])
  
  const goToUrl = (url: string, notifId: number) => async e => {
    e.preventDefault()

    if (notif.find(n => n.id == notifId).isOpen) {
      close()
      return router.push(url)
    }
    // Update isOpen field to true
    openANotification(id, notifId)
    setNotif(prev => prev.map(n => n.id == notifId ? {...n, isOpen: true} : n))
    router.push(url)
    close()
  }

  return (
    <div className="notifications" ref={ref}>
      <h1>Notifications</h1>
      <div>
        {notif?.map(n => (
          <Link href={n.redirectUrl} key={n.id} className={"notif c2" + (n.isOpen ? '' : ' new')} onClick={goToUrl(n.redirectUrl, n.id)}>
            <div>
              <img src={n.logo} alt="logo" className="icon" />
            </div>
            <div>
              <p>{n.message}</p>
              <p>{fromNow(new Date(n.createdAt))}</p>
            </div>
          </Link>
        ))}
        {notif == null && <div className="loading black" style={{width: '400px', height: '100px'}}></div>}
        {(notif && notif.length == 0) &&
          <div className="empty-notif">
            <img src="/icons/no_notification.png" alt="No notification" />
            <h2>You don't have any notification right now</h2>
            <p>When someone you follow adds an event<br />
              it will appear here</p>
          </div>
        }
      </div>
    </div>
  )
}

export default Notifications