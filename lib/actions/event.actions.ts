'use server'
import Event from "../database/models/event.model"
import User from "../database/models/user.model"
import { handleError } from "../utils"
import { CreateEventParams } from "@/types"

export const createEvent = async ({event,userId,path}:CreateEventParams)=>{
    try {
        const organizer =await User.findById(userId)
        if(!organizer) throw new Error('Organizer not found')
        const newEvent = await Event.create({...event,organizer:userId,category:event.categoryId})
        return JSON.parse(JSON.stringify(newEvent))
    } catch (error) {
        handleError(error)
    }
}