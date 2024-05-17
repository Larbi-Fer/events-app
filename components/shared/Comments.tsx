'use client'

import '@styles/comments.css'
import { deleteComment as deleteCommentById, getComments, insertComment } from "@utils/api"
import { useEffect, useState } from "react"
import { CommentsLimit } from '@utils/const'
import { fromNow } from '@utils'
import AuthorIcon from '@mui/icons-material/Create';
import ReplyIcon from '@mui/icons-material/Reply';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Input from '@components/ui/Input'
import { Moment } from 'moment'
import Button from '@components/ui/Button'
import Message from '@components/ui/Message'
import Loading from '@components/ui/Loading'

type CommentsProps = {
  eventId: number,
  eventCreatorId: number,
  user?: any,
  fullWidth?: boolean,
}

type CommentProps = {
  id?: number,
  authorId: number,
  eventId: number,
  text: string,
  date?: string | Date | Moment,

  author?: string,
  image?: string,
  replies?: CommentProps[],
  reply?: number,
  isReplyButton?: boolean
}

const Comments = ({ eventId, eventCreatorId, user, fullWidth } : CommentsProps) => {
  const [comments, setComments] = useState<CommentProps[]>()
  const [loading, setLoading] = useState<[boolean, number]>([false, -1])
  const [deleteCom, setDeleteCom] = useState<[number, boolean]>(null)

  useEffect(() => {
    const getData = async() => {
      console.log(eventId)
      const data = await getComments(eventId, [0, CommentsLimit])
      setComments(data.comments)
    }
    getData()
  }, [eventId])
  
  const addComment = (type: 'comment' | 'reply', id?: number, i=-1) => async(e: any) => {
    e.preventDefault()

    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    setLoading([true, i])

    const comment = e.target.elements['id-comment'].value

    const commentData: CommentProps = { authorId: user.id, eventId, text: comment }
    if (type == 'reply') commentData.reply = id
    const data = await insertComment(commentData)
    const insertData = { ...commentData, id: data.insertId, author: user.username, date: new Date(), replies: [], image: user.image }

    setComments(old => {
      if (type === 'comment') return [insertData, ...old];

      return old.map(comment => {
        if (comment.id === id) {
          // Add the new reply to the replies array of the corresponding comment
          return {
            ...comment,
            replies: [...comment.replies, { ...insertData, authorId: user.id }],
          };
        }

        return comment;
      });
    });

    e.target.elements['id-comment'].value = ''
    setLoading([false, -1])
  }

  const deleteComment = async() => {
    const id = deleteCom[0]
    const isReply = deleteCom[1]

    setDeleteCom([id, null])
    await deleteCommentById(id)

    setDeleteCom(null)
    console.log(id, isReply);
    
    setComments(prev =>
      isReply ? prev.map( v => ({ ...v, replies: v.replies.filter( v => v.id != id ) }) ) : prev.filter( v => v.id != id)
    )
  }

  return (
    <div className={"comments" + ( fullWidth ? ' fullWidth' : '' )}>

        <div className="title">Comments</div>

        <form onSubmit={addComment('comment')} className="comment-inp">
          <CommentField loading={[...loading, -1]} disabled={!user} id='comment-field' type='Comment' />
        </form>

        {
        comments ?
          (comments.length ?
            <>
              {comments.map((comment, i) =>
                  <div className={"comment" + (comment.replies.length ? ' with-replies' : '') + ( deleteCom?.[0] == comment.id ? ' disabled' : '' )}>
                    <Comment comment={comment} author={comment.authorId == eventCreatorId} isLogin={user} isUser={comment.authorId == user?.id} onDelete={id => setDeleteCom([id, false])} reply={() => setComments( prev => prev.map(v => v.id == comment.id ? { ...v, isReplyButton: !v.isReplyButton } : v) )} />

                    <form className='reply-form' onSubmit={addComment('reply', comment.id, i)}>
                      {comment.isReplyButton ? <CommentField loading={[...loading, i]} disabled={false} id={'reply-' + comment.id} type='Reply' /> : null}
                    </form>

                    {/* Replies */}
                    <div className="replies">
                      { comment.replies.map(reply =>
                        <div className={"reply" + ( deleteCom?.[0] == reply.id ? ' disabled' : '' )}>
                          <Comment comment={reply} author={reply.authorId == eventCreatorId} isLogin={user} isUser={reply.authorId == user?.id} onDelete={id => setDeleteCom([id, true])} />
                        </div>
                      ) }
                    </div>
                  </div>
              )}
              <Message title='You are about to delete your comment' show={Boolean(deleteCom) && deleteCom[1] !== null} onClose={() => setDeleteCom(null)} buttons={[{ text: 'DELETE', onClick: deleteComment }]} width='md'>
                Are you sure you want to delete this comment.<br />
                {(() => { const len = comments.find(c => c.id == deleteCom?.[0])?.replies.length; return len ? `You have ${len} repl${ len > 1 ? 'ies' : 'y' }.` : '' })()}
              </Message>
            </>
          :
            <div className='empty-notif'>
              <img src="/comments.jpg" alt="comments" className='comments-img' />
              <h2>No comments yet</h2>
              <p>Be the first to comment</p>
            </div>
          ) : <Loading />
        }
      </div>
  )
}

const CommentField = ({ disabled, id, type, loading } : { disabled: boolean, id: string, type: 'Comment' | 'Reply', loading: [boolean, number, number] }) => {
  const load = loading[0] && loading[1] == loading[2]
  return <Input loading={load} disabled={disabled || load} id={id} className='fade' placeholder={type + ' ...'} name='comment' IconAsButton={<SendIcon fontSize='small' onClick={() => console.log("Clicked !!")} />} variant='fill' round required fullWidth />
}

type CommentDesignProps = {
  comment: CommentProps,
  author: boolean,
  isUser: boolean,
  onDelete: (id: number) => any,
  isLogin: boolean,
  reply?: () => any,
}

const Comment = ({ comment, author, isUser, onDelete, reply, isLogin } : CommentDesignProps) => {

  return (
    <>
      <div className="options">
        { (reply && isLogin) && <div className="reply-icon" onClick={reply}>
          <ReplyIcon />
        </div> }
        { isUser && <Button onClick={() => onDelete(comment.id)} circulaire variant='danger' type='color'><DeleteIcon fontSize='small' /></Button> }
      </div>
      <div className="comment-header">
        <div className="image">
          <img src={comment.image} alt="Profile logo" />
        </div>
        <div className="info">
          <div className={"name" + ( author ? ' author' : '' )}>
            {comment.author}
            {author ? <AuthorIcon className='author-icon' fontSize='small' /> : null}
          </div>

          <div className="date">{fromNow(comment.date)}</div>
        </div>
      </div>
      <div className="content">
        <p> {comment.text} </p>
      </div>
    </>
  )
}

export default Comments