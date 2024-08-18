'use server'

import { revalidatePath } from 'next/cache'

import { connectToDatabase } from '@/lib/database'
import User from '@/lib/database/models/user.model'
import Order from '@/lib/database/models/order.model'
import Event from '@/lib/database/models/event.model'
import { handleError } from '@/lib/utils'

import { CreateUserParams, GetUserParams, UpdateUserParams } from '@/types'
import bcrypt from 'bcrypt'

  export async function createUser({user}: CreateUserParams) {
    try {
      await connectToDatabase()
      // const existingUser = await User.findOne({ email: user.email })
      // if (existingUser){
      //   if (existingUser.provider===user.provider) {
      //     return JSON.parse(JSON.stringify(existingUser));
      //   }
      // }

      const hashedPassword = user.provider==='google' ? undefined : await bcrypt.hash(user.password, 10)
      const newUser = await User.create({
        username: user.username,
        email: user.email,
        image: user.image || '', 
        provider: user.provider,
        password: hashedPassword, 
    })
      return JSON.parse(JSON.stringify(newUser))
    } catch (error) {
      return { error: (error as any).message }
    }
  }

export async function getUser({email, password}: GetUserParams) {
  try {
    await connectToDatabase()

    const user = await User.find({ email })

    if (!user || user.length==0) throw new Error('Invalid credentials')
    const isMatch = user[0].password===password
    if (!isMatch) throw new Error('Invalid credentials')
    return JSON.parse(JSON.stringify(user))
  } catch (error) {
    return { error: (error as any).message }
  }
}

export async function getUserByEmailAndProvider({email,provider}: GetUserParams) {
  try {
    await connectToDatabase()

    const user = await User.findOne({email,provider});
    return user ? JSON.parse(JSON.stringify(user)) : null;
  } catch (error) {
    return { error: (error as any).message }
    
  }
}

// export async function updateUser(clerkId: string, user: UpdateUserParams) {
//   try {
//     await connectToDatabase()

//     const updatedUser = await User.findOneAndUpdate({ clerkId }, user, { new: true })

//     if (!updatedUser) throw new Error('User update failed')
//     return JSON.parse(JSON.stringify(updatedUser))
//   } catch (error) {
//     handleError(error)
//   }
// }

// export async function deleteUser(clerkId: string) {
//   try {
//     await connectToDatabase()

//     // Find user to delete
//     const userToDelete = await User.findOne({ clerkId })

//     if (!userToDelete) {
//       throw new Error('User not found')
//     }

//     // Unlink relationships
//     await Promise.all([
//       // Update the 'events' collection to remove references to the user
//       Event.updateMany(
//         { _id: { $in: userToDelete.events } },
//         { $pull: { organizer: userToDelete._id } }
//       ),

//       // Update the 'orders' collection to remove references to the user
//       Order.updateMany({ _id: { $in: userToDelete.orders } }, { $unset: { buyer: 1 } }),
//     ])

//     // Delete user
//     const deletedUser = await User.findByIdAndDelete(userToDelete._id)
//     revalidatePath('/')

//     return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null
//   } catch (error) {
//     handleError(error)
//   }
// }