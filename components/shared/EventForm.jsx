'use client'

import FileUploader from '@components/ui/FileUploader'
import Input from '@components/ui/Input'
import Button from '@components/ui/Button'
import Toast from '@components/ui/Toast'
import React, { useState } from 'react'
import moment from 'moment'

const fields = {
  category: '',
  title: '',
  tags: '',
  description: '',
  location: '',
  imageUrl: '',
  startDate: moment(),
  endDate: moment().add(2, 'hours'),
  dueDate: {
    is: true,
    date: moment().subtract(1, 'day')
  },
  max: {
    is: false,
    num: 50
  },
  url: '',
  attend: true
}

const EventForm = () => {
  const [files, setFiles] = useState(Array(File))
  const [flds, setFlds] = useState(fields)
  const [msg, setMsg] = useState(['', ''])

  const handleChange = e => {
    setFlds(old => ({ ...old, [e.target.name]: e.target.value}))
  }

  const handleChangeDate = e => {
    if (!e.target.value) return setMsg(["You can't clear", 'error'])
    const date = moment(e.target.value)
    const setDate = () => setFlds(old => ({ ...old, [e.target.name]: date}))
    if (e.target.name === 'startDate') return setDate()
    if (e.target.name === 'endDate' && date < flds.startDate) return setMsg(['The end date is earlier than the start date', 'error'])
    if (e.target.name === 'dueDate' && date > flds.startDate) return setFlds(old => ({ ...old, dueDate: {date: old.dueDate.date, is: false} }))
    else if (e.target.name === 'dueDate') return setFlds(old => ({ ...old, dueDate: {date, is: old.dueDate.is} }))
    else return setDate()
  }

  const handleAttend = type => () => {
    if (type === 'onChange') {
      if (!flds.max.is || !flds.attend) return setFlds(old => ({ ...old, attend: !old.attend }))
      setMsg(["You must uncheck the Max number of people", 'error'])
      const el = document.getElementById('id-max-comp')
      el.classList.add('vibration')
      setTimeout(() => el.classList.remove('vibration'), 500)
    } else {
      if (flds.attend) return
      setFlds(old => ({...old, attend:!old.attend }))
    }
  }

  return (
    <form style={{padding: "0 20px 100px 20px"}}>
      <div className="c1">
        <Input text='category' variant='fill' onChange={handleChange} value={flds.category} name="category" fullWidth />
      </div>
      <div className="c2">
        <Input text='title' variant='fill' onChange={handleChange} value={flds.title} name="title" fullWidth />
        <Input text='tags' variant='fill' onChange={handleChange} value={flds.tags} name="tags" fullWidth />
      </div>
      <div className="c2">
        <Input text='description' variant='fill' onChange={handleChange} value={flds.description} name="description" fullWidth multiLine rows={11} />
        {/* <Input text='files' variant='fill' onChange={handleChange} value={flds.tags} fullWidth /> */}
        <FileUploader text='Cover' setFiles={setFiles} imageUrl={flds.imageUrl} onFieldChange={url => setFlds(old => ({ ...old, imageUrl: url }))} />
      </div>
      <div className="c1">
        <Input text='location' variant='fill' onChange={handleChange} value={flds.location} name="location" fullWidth />
      </div>
      <div className="c2">
        <Input text='Start date' type="datetime-local" variant='fill' onChange={handleChangeDate} value={flds.startDate.format('YYYY-MM-DDTHH:mm')} name="startDate" fullWidth />
        <Input text='End date' type="datetime-local" variant='fill' onChange={handleChangeDate} value={flds.endDate.format('YYYY-MM-DDTHH:mm')} name="endDate" fullWidth />
      </div>
      <div className="c1">
        <div className="check-item">
          <Input text='Due date' type="datetime-local" variant='fill' onChange={handleChangeDate} value={flds.dueDate.date.format('YYYY-MM-DDTHH:mm')} name="dueDate" disabled={!flds.dueDate.is} fullWidth />
          <input type="checkbox" checked={flds.dueDate.is} onChange={() => setFlds(old => ({ ...old, dueDate: {date: old.dueDate.date, is: !old.dueDate.is} }))} />
        </div>
      </div>

      <div className="c2">
        <Input text='URL' type='url' variant='fill' onChange={handleChange} value={flds.url} name="url" fullWidth />
        <div className="check-item" id="id-max-comp" style={{width: "100%"}}>
          <Input text='Max' type="number" variant='fill' onChange={e => setFlds(old => ({ ...old, max: { is: old.max.is, num: e.target.value > 0 ? e.target.value : 1 } }))} value={flds.max.num} name="max" disabled={!flds.max.is} fullWidth />
          <input type="checkbox" value={flds.max.is} onChange={e => setFlds(old => ({ ...old, max: { is: !old.max.is, num: old.max.num } })) || handleAttend('maxChange')()} />
        </div>
      </div>
      <div className="c1" style={{ paddingTop: 25 }}>
          <input type="checkbox" checked={flds.attend} onChange={handleAttend('onChange')} id='id-attend' />
          <label htmlFor='id-attend'><b>"I will attend"</b> Button?</label>
      </div>

      <div className="c1" style={{ paddingTop: 25 }}>
        <Button>PUBLISH</Button>
      </div>

      <Toast text={msg[0]} show={msg[0]!=''} after={() => setMsg(['', ''])} type={msg[1]} />

    </form>
  )
}

export default EventForm