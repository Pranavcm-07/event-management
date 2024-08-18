'use client'
import React from 'react'
import EventForm from './EventForm'
import { IEvent } from '@/lib/database/models/event.model'
import { useSession } from 'next-auth/react'

type UpdateEventFormProps = {
    event: IEvent
}

const UpdateEventForm = ({event}:UpdateEventFormProps) => {
    const { data: session } = useSession()
    const userId = session?.user?.id || ''
  return (
    <>
    <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
      <h3 className='wrapper h3-bold text-center sm:text-left'>Update Event</h3>
    </section>
    <div className='wrapper my-8'>
    <EventForm userId={userId} type='Update' event={event} eventId={event._id}/>
    </div>
    </>
  )
}

export default UpdateEventForm