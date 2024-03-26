'use client'

import { useSession } from "next-auth/react"
import { useState } from "react"

import Link from "next/link"

import Button from "@components/ui/Button"
import Message from "@components/ui/Message"

import { follow, getFollow } from "@utils/api"

const ProfileInfo = ({ user: userPass }) => {
  const session = useSession()
  const [load, setLoad] = useState(false)
  const [user, setUser] = useState(userPass)
  const [followUsers, setFollowUsers] = useState<'followers' | 'following' | null>()
  const [msg, setMsg] = useState(false)

  const handleFollow = async () => {
    setLoad(true)
    
    // Follow this user
    await follow(session.data.user.id, user.id)
    // Update the user state
    setUser(prev => ({...prev, isFollow: !prev.isFollow, followersCount: prev.isFollow ? prev.followersCount - 1 : prev.followersCount + 1}))

    setLoad(false)
  }

  const showFollow = (type: 'followers' | 'following') => async() => {
    setFollowUsers(type)
    setMsg(true)

    // If the followers or following of this user is already fetched, return
    if (user[type]) return

    // Get the followers or following of this user
    const res = await getFollow(type, user.id)
    setUser(prev => ({...prev, [type]: res[type]}))
  }

  return (
    <>
      <div className="info">
        <div className="avatar">
          <img src={user.image} alt="avatar" className='icon' />
        </div>
        <div>
          <div className="name">{user.username}</div>
          <div className="email">{user.email}</div>
        </div>
        <div className="button-container">

          {(session.data?.user?.id != user.id && session.data) &&
            <Button
              onClick={handleFollow}
              className={load ? 'loading' : ''}
              disabled={load}
              round
              fullWidth
            >
              {user.isFollow ? 'UNFOLLOW' : 'FOLLOW'}
            </Button>}
        </div>
        <div className="follow">
          <div onClick={showFollow("followers")}>
            <div className="follow-count">{user.followersCount}</div>
            <div className="follow-text">Follower{ user.followersCount > 1 ? 's' : '' }</div>
          </div>

          <div onClick={showFollow("following")}>
            <div className="follow-count">{user.followingCount}</div>
            <div className="follow-text">Following</div>
          </div>
        </div>

      </div>

      <Message
        title={followUsers}
        show={msg}
        onClose={() => {setMsg(false); setTimeout(() => setFollowUsers(null), 200)}}
        width="lg"
        withoutCancelButton
      >
        <div className="follow-data">
            { followUsers && user[followUsers] == undefined &&
              <div className="follow-info loading" style={{height: '100px', width: '100%'}}></div>}

            { (user[followUsers] != undefined && !user[followUsers].length ) &&
              <div className="follow-info no-one" style={{height: '100px'}}>
                <div className="title">No {followUsers}</div>  
              </div>}

            {followUsers && user[followUsers]?.map(f => (
              <div key={f[followUsers == 'followers' ? 'follower' : 'followed']} className="follow-info">
                <Link href={`/profile/${f[followUsers == 'followers' ? 'follower' : 'followed']}`} passHref>
                  <div className="avatar">
                      <img src={f.image} alt="avatar" className='icon' />
                  </div>
                  <div>
                      <div className="name">{f.username}</div>
                      <div className="email">{f.email}</div>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </Message>
    </>
  )
}

export default ProfileInfo