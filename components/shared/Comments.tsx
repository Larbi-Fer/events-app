'use client'

import '@styles/comments.css'
import { getComments } from "@utils/api"
import { useEffect, useState } from "react"
import { CommentsLimit } from '@utils/const'
import { fromNow } from '@utils'
import authorIcon from '@mui/icons-material/Create';

type CommentsProps = {
  eventId: number,
  eventCreatorId: number | null,
  fullWidth: boolean,
}

const Comments = ({ eventId, eventCreatorId, fullWidth } : CommentsProps) => {
  const [comments, setComments] = useState<any[]>()

  useEffect(() => {
    const getData = async() => {
      console.log(eventId)
      const data = await getComments(eventId, [0, CommentsLimit])
      setComments(data.comments)
    }
    getData()
  }, [eventId])
  

  return (
    comments ?
      <div className={"comments" + ( fullWidth ? ' fullWidth' : '' )}>

        <div className="title">Comments</div>

        {
          comments.map(comment => 
            <div className={"comment" + (comment.replies.length ? ' with-replies' : '')}>
              <div className="comment-header">
                <div className="image">
                  <img src="/profile.jpg" alt="Profile logo" />
                </div>
                <div className="info">
                  <div className={"name" + ( comment.authorId == eventCreatorId ? ' author' : '' )}>{comment.author}</div>
                  <div className="date">{fromNow(comment.date)}</div>
                </div>
              </div>
              <div className="content">
                <p> {comment.text} </p>
              </div>

              {/* Replies */}
              <div className="replies">
                { comment.replies.map(reply =>
                  <div className="reply">

                    <div className="comment-header">
                      <div className="image">
                        <img src="/profile.jpg" alt="Profile logo" />
                      </div>
                      <div className="info">
                        <div className={"name" + ( reply.authorId == eventCreatorId ? ' author' : '' )}>{reply.author}</div>
                        <div className="date">{fromNow(reply.date)}</div>
                      </div>
                    </div>
                    <div className="content">
                      <p>
                        {reply.text}
                      </p>
                    </div>
                  </div>
                ) }
              </div>
            </div>
        
          )
        }
      </div>
    : <h1>Loading ...</h1>
  )
}

export default Comments