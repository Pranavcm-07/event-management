'use client'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React, { use, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Collections from '@/components/shared/Collections'
import { IOrder } from '@/lib/database/models/order.model'
import { SearchParamProps } from '@/types'


const ProfilePage = ({searchParams}:SearchParamProps) => {
  const { data: session } = useSession()
  const userId = session?.user?.id as string
  const [organizedEvents,setOrganizedEvents] = useState([])
  const [orderedEvents,setOrderedEvents] = useState([])
  const [totalPages,setTotalPages] = useState({events:1,orders:1})

  const eventsPage = Number(searchParams?.eventsPage) || 1
  const ordersPage = Number(searchParams?.ordersPage) || 1

  useEffect(()=>{
    const fetchEvents = async()=>{
      if (userId){
        try {
            const res = await fetch(`/api/getEventsByUser?userId=${userId}&page=${eventsPage}`)
            const data = await res.json()
            setOrganizedEvents(data.data) 
            setTotalPages({...totalPages,events:data.totalPages})
        } catch (error) {
          console.log(error)
        }
      }
    }
    fetchEvents()
},[eventsPage])
useEffect(()=>{
  const fetchOrders = async()=>{
    if (userId){
      try {
          const res = await fetch(`/api/getOrdersByUser?userId=${userId}&page=${ordersPage}`)
          const data = await res.json()
          const events = data?.data.map((order:IOrder)=>order.event)
          setOrderedEvents(events) 
          setTotalPages({...totalPages,orders:data.totalPages})
      } catch (error) {
        console.log(error)
      }
    }
  }
  fetchOrders()
},[ordersPage])
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
    <section className='wrapper my-8'>
      <Collections
          data={orderedEvents}
          emptyTitle="No events tickets purchased yet"
          emptyStateSubtext="No worries, you can explore more events"
          collectionType="My_Tickets"
          limit={3}
          page={ordersPage}
          urlParamName='ordersPage'
          totalPages={totalPages.orders}
        />
    </section>
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
            page={eventsPage}
            urlParamName='eventsPage'
            totalPages={totalPages.events}
            />
      </section>
    </>
  )
}

export default ProfilePage