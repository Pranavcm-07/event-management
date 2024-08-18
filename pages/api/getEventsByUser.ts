import { getEventsByUser } from "@/lib/actions/event.actions"
import { NextApiRequest, NextApiResponse } from "next"

export const organizedEvents = async (req : NextApiRequest,res:NextApiResponse) => {
    const {userId,page=1} = req.query
    if (!userId || Array.isArray(userId)) return res.status(400).json({error: 'User ID is required as a string'})
    try {
        const events = await getEventsByUser({userId, page: parseInt(page as string)})
        res.status(200).json({data: events?.data, totalPages:events?.totalPages})
    } catch (error) {
        res.status(500).json({error: (error as Error).message})
    }
}

export default organizedEvents