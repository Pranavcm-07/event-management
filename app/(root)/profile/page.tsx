'use client'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React, { use, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Collections from '@/components/shared/Collections'


const ProfilePage = () => {
  const { data: session } = useSession()
  const userId = session?.user?.id as string
  const [organizedEvents,setOrganizedEvents] = useState([])
  useEffect(()=>{
    const fetchEvents = async()=>{
      if (userId){
        try {
            const res = await fetch(`/api/getEventsByUser?userId=${userId}&page=1`)
            const data = await res.json()
            setOrganizedEvents(data.data) 
        } catch (error) {
          console.log(error)
        }
      }
    }
    fetchEvents()
},[])
  return (
    <>
    <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
        <div className="wrapper justify-center items-center md:justify-between flex">
            <h3 className="h3-bold text-center sm:text-left">My Tickets</h3>
            <Button asChild size='lg' className='button hidden sm:flex'>
                <Link  href='/#events'>
                    Explore More
                </Link>
            </Button>
        </div>
    </section>
    {/* <section className='wrapper my-8'>
      <Collections
          data={event?.data}
          emptyTitle="No events tickets purchased yet"
          emptyStateSubtext="No worries, you can explore more events"
          collectionType="My_Tickets"
          limit={3}
          page={1}
          urlParamName='ordersPage'
          totalPages={2}
        />
    </section> */}
    <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
        <div className="wrapper justify-center items-center md:justify-between flex">
            <h3 className="h3-bold text-center sm:text-left">Events Organised</h3>
            <Button asChild size='lg' className='button hidden sm:flex'>
                <Link href='/events/create'>
                    Create New Event 
                </Link>
            </Button>
        </div>
    </section>
    <section className='wrapper my-8'>
        <Collections
            data={organizedEvents}
            emptyTitle="No events have been created yet"
            emptyStateSubtext="Go ahead and create your first event"
            collectionType="Event_Organized"
            limit={3}
            page={1}
            urlParamName='eventsPage'
            totalPages={2}
            />
      </section>
    </>
  )
}

export default ProfilePage