'use client'
import EventForm from '@/components/shared/EventForm'
import React from 'react'
import { useSession } from 'next-auth/react'

const CreateEvent = () => {
  const { data: session } = useSession()
  const userId = session?.user?.id || ''
  return (
    <>
    <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
      <h3 className='wrapper h3-bold text-center sm:text-left'>Create Event</h3>
    </section>
    <div className='wrapper my-8'>
      <EventForm userId={userId} type='Create' />
    </div>
    </>
  )
}

export default CreateEvent