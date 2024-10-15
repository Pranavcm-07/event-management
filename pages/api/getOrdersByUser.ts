import { getOrdersByUser } from "@/lib/actions/order.actions"
import { NextApiRequest, NextApiResponse } from "next"

export const orderedEvents = async (req : NextApiRequest,res:NextApiResponse) => {
    const {userId,page=1} = req.query
    console.log(page)
    if (!userId || Array.isArray(userId)) return res.status(400).json({error: 'User ID is required as a string'})
    try {
        const events = await getOrdersByUser({userId, page: parseInt(page as string)})
        res.status(200).json({data: events?.data, totalPages:events?.totalPages})
    } catch (error) {
        res.status(500).json({error: (error as Error).message})
    }
}

export default orderedEvents