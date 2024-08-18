import React from 'react'
import { getEventById } from '@/lib/actions/event.actions'
import UpdateEventForm from '@/components/shared/UpdateEventForm'

type UpdateEventProps = {
    params: {
        id: string
    }
}


const UpdateEvent = async ({params : {id}}:UpdateEventProps) => {
    const event = await getEventById(id)
  return <UpdateEventForm event={event} />
}

export default UpdateEvent