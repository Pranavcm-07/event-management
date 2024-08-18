'use client'
import { IEvent } from '@/lib/database/models/event.model'
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import Checkout from './Checkout'


const CheckOutButton = ({event}:{event:IEvent}) => {
    const {data:session} = useSession()
    const userId = session?.user?.id as string
    const eventFinished = new Date(event.endDateTime) < new Date()
  return (
    <div className="flex items-center gap-3">
        {eventFinished ? (
            <p className='p-2 text-red-400'>Sorry, tickets are no longer available</p>
        ) : (
            <>  
                {!session ? (
                    <Button asChild className='button rounded-full' size='lg'>
                        <Link href='/api/auth/signin'>
                            Buy Tickets
                        </Link>
                    </Button>
                ) : (
                    <Checkout event={event} userId={userId}/>
                )}
            </>
        )}
    </div>
  )
}

export default CheckOutButton