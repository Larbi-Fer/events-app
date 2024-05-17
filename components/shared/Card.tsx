'use client'

import { Moment } from "moment"

import Link from "next/link"

import CheckIcon from "@mui/icons-material/CheckCircleSharp"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"

import { dateBetween } from "@utils"

type CardProps = {
  data: {
    id: number,
    title: string,
    image: string,
    startDate: Moment | Date,
    endDate: Moment | Date,
    description: string,
    username: string,
    isAttend: boolean,
  },
  editable?: boolean,
  i?: number,

  deleteEvent?: (id: number) => any
  blur?: boolean
}

const Card = ({ data, editable, i, deleteEvent, blur } : CardProps) => {

  return (
    <div className={"event-card rise" + (blur ? ' event-blur' : '')} style={{ "--delay": `${i ? i*100 : 0}ms` }}>
    
      <div className="image">
        <img src={data.image} alt="" draggable={false} />
      </div>

      {editable && <div className="tools">
        <div className="edit"><EditIcon fontSize="small" /></div>
        <div className="delete" onClick={() => deleteEvent(data.id)}><DeleteIcon fontSize="small" /></div>
      </div>}

      <Link href={`/event/${data.id}`} className="content">
        <div>
          <div className="date">{dateBetween(data.startDate, data.endDate)}</div>
          <div className="desc">{data.title}</div>
          <div className="desc">{data.description}</div>
          <div className="bottom">
            <div className="creator">{data.username}</div>
            <div className="ticket">
              {Boolean(data.isAttend) && <CheckIcon />}
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Card