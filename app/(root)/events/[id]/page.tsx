import CheckOutButton from '@/components/shared/CheckOutButton'
import Collections from '@/components/shared/Collections'
import { getEventById, getRelatedEventsByCategory } from '@/lib/actions/event.actions'
import { formatDateTime } from '@/lib/utils'
import { SearchParamProps } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const EventDetails = async({params: {id} , searchParams}:SearchParamProps) => {
    const event = await getEventById(id)
    const relatedEvents = await getRelatedEventsByCategory({
        categoryId: event.category._id,
        eventId: event._id,
        page: searchParams.page as string
    })
  return (
    <>
        <section className='flex justify-center bg-primary-50 bg-dotted-pattern bg-contain'>
            <div className='grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl'>
                <Image
                    src={event.imageUrl}
                    alt='Hero Image'
                    width={1000}
                    height={1000}
                    className='w-full object-cover object-center min-h-[300]'
                />
                <div className='flex w-full gap-8 flex-col md:p-10 p-5'>
                    <div className="flex flex-col gap-6">
                        <h2 className="h2-bold">
                            {event.title}
                        </h2>
                        <div className='flex flex-col gap-3 md:flex-row md:items-center'>
                            <div className="flex gap-3">
                                <p className='p-bold-20 rounded-full bg-green-500/10 px-5 py-2 text-green-700'>
                                    {event.isFree ? 'Free' : `$${event.price}`}
                                </p>
                                <p className='p-medium-16 rounded-full bg-grey-500/10 px-4 py-2.5 text-grey-500'>
                                    {event.category.name}
                                </p>
                            </div>
                            <p className='p-medium-18 ml-2 mt-2 sm:mt-0'>
                                by{' '}
                                <span className='text-primary-500'>{event.organizer.username}</span>
                            </p>
                        </div>
                    </div>

                    <CheckOutButton event={event} />
                    <div className='flex flex-col gap-5'>
                        <div className='flex gap-2 md:gap-3'>
                            <Image src='/assets/icons/calendar.svg' width={32} height={32} alt='Calendar Icon' />
                            <div className='p-medium-16 lg:p-regular-20 flex flex-wrap items-center'>
                                <p>
                                    {formatDateTime(event.startDateTime).dateOnly} - {' '}
                                    {formatDateTime(event.startDateTime).timeOnly}
                                </p>
                                <p>
                                    {formatDateTime(event.endDateTime).dateOnly} - {' '}
                                    {formatDateTime(event.endDateTime).timeOnly}
                                </p>
                            </div>
                        </div>
                        <div className='p-regular-20 flex items-center gap-3'>
                            <Image src='/assets/icons/location.svg' width={32} height={32} alt='Location Icon' />
                            <p className='p-medium-16 lg:p-regular-20'>{event.location}</p>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p className="p-bold-20 text-grey-600">What You'll Learn:</p>
                        <p className='p-medium-16 lg:p-regular-18'>{event.description}</p>
                        <Link href={event.url} target='_blank'>
                        <p className='p-medium-16 lg:p-regular-18 truncate text-primary-500 underline'>{event.url}</p>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
        <section className='flex wrapper my-8 gap-8 md:gap-12 flex-col'>
            <h2 className="h2-bold">Related Events</h2>
            <Collections
                data={relatedEvents?.data}
                emptyTitle="No events found"
                emptyStateSubtext="Come back later"
                collectionType="All_Events"
                limit={3}
                page={searchParams?.page as string}
                totalPages={relatedEvents?.totalPages}
            />
        </section>
    </>
  )
}

export default EventDetails