import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className='border-t'>
      <div className='flex-center flex-between flex-col sm:flex-row text-center flex gap-4 p-5 wrapper'>
        <Link href='/'>
          <Image 
            src='/assets/images/logo.svg' 
            alt='Evently logo' 
            width={128} 
            height={38}
          />
        </Link>
        <p>2023 Evently. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer