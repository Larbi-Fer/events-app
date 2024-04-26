'use client'

import { useSession } from "next-auth/react"
import { useRef, useState } from "react"

import Link from "next/link"

import Button from "@components/ui/Button"
import Message from "@components/ui/Message"

import { follow, getFollow, updateIcon, updateUsername } from "@utils/api"
import { TitlePrefix } from "@utils/const"
import IconUploader from "@components/ui/IconUploader"
import { useUploadThing } from "@utils/uploadthing"

const ProfileInfo = ({ user: userPass }) => {
  const session = useSession()
  const [load, setLoad] = useState(false)
  const [user, setUser] = useState(userPass)
  const [followUsers, setFollowUsers] = useState<'followers' | 'following' | null>()
  const [msg, setMsg] = useState(false)

  const [editUser, setEditUser] = useState(false)
  const editRef = useRef<HTMLInputElement>()
  const [editIcon, setEditIcon] = useState<[boolean, string]>([false, null])
  const [files, setFiles] = useState([])
  const { startUpload } = useUploadThing("imageUploader")

  const [loading, setLoading] = useState<'icon' | 'username' | null >(null)

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

  const turnUsernameEditable = () => {
    if (user.id != session.data.user.id) return
    setEditUser(true)
    setTimeout(() => editRef.current.focus(), 100)
  }

  const editUsername = async (e) => {
    console.log(123);
    
    e.preventDefault()
    setEditUser(false)
    const username = editRef.current.value
    if (username == user.username) return

    // Send the new username to the server
    await updateUsername(user.id, username);
    // Update the user's username
    setUser(prev => ({...prev, username}))
    document.title = username + TitlePrefix
  }

  const editProfileIcon = async() => {
    if(loading) return
    setLoading('icon')

    let newUrl:string;
    // Upload the image
    if(files.length > 0) {
      const uploadedImages = await startUpload(files)

      if(!uploadedImages) {
        return
      }
      newUrl = uploadedImages[0].url
    }
    // Update data in database
    await updateIcon(user.id, newUrl)
    setEditIcon([false, null])
    setUser(prev => ({...prev, image: newUrl}))
    setLoading(null)
  }

  return (
    <>
      <div className="info">
        <div className="avatar">
          {editIcon[0]
            ?
              <>
                <IconUploader text='Cover' setFiles={setFiles} imageUrl={editIcon[1]} onFieldChange={url => setEditIcon(prev => [prev[0], url])} />
                <div className="group">
                  <Button disabled={!files.length || loading == 'icon'} variant="secondary" round onClick={editProfileIcon} className={loading == 'icon' ? 'loading' : ''}>Save</Button>
                  <Button round onClick={() => setEditIcon(prev => [false, prev[1]])}>Cancel</Button>
                </div>
              </>
            : <img src={user.image} alt="avatar" className='icon' onDoubleClick={() => user.id == session.data.user.id && setEditIcon(prev => [true, prev[1]])} />}
        </div>
        <div>
          {!editUser
            ? <div className="name" onDoubleClick={turnUsernameEditable}>{user.username}</div>
            :
            <form onSubmit={editUsername}>
              <input ref={editRef} defaultValue={user.username} onBlur={() => setEditUser(false)} style={{textAlign: 'center', background: 'transparent', outline: 'none', border: 'none'}} />
            </form> 
          }
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