import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

type AuthButton = {
    styles: string
    auth: string
    onclick?: () => void
}
const AuthButton = ({styles,auth,onclick}:AuthButton) => {
  return (
    <Button 
        onClick={onclick} 
        className={`${styles} rounded-full py-2 px-4 border-primary-500 bg-primary-50 text-primary-500 hover:bg-primary-500 hover:text-primary-50`} 
        variant='outline'
    >
        {auth==='Sign In' ? (
            <Link href='/api/auth/signin'>
                {auth}
            </Link>
        ) : (
            <>
                {auth}
            </>
        )}
    </Button>
  )
}

export default AuthButton