import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className='border-t'>
      <div className='flex-center flex-between flex-col sm:flex-row text-center flex gap-4 p-5 wrapper'>
        <Link href='/'>
        <p className="h5-bold">NexEvent</p>
        </Link>
        <p>2024 NexEvent. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer