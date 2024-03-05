import EventForm from '@components/shared/EventForm'
import React from 'react'

export const metadata = {
    title: 'Create a new event',
}

const Create = () => {
  return (
    <div className='container'>
        <h3>Create Event</h3>
        <EventForm type='create' />
    </div>
  )
}

export default Create