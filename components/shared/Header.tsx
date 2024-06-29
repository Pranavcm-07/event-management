import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MobileNav from './MobileNav'
import NavItems from './NavItems'

const Header = () => {
  return (
    <header className='w-full border-b'>
        <div className="wrapper flex justify-between items-center">
            <Link href='/' className='w-36'>
                <Image src="/assets/images/logo.svg" alt="Evently logo" width={128} height={38} />
            </Link>
            <nav className='hidden md:flex-between w-full max-w-xs'>
                <NavItems />
            </nav>
            <div className="flex gap-3 justify-end w-32">
                <MobileNav />
            </div>
        </div>
    </header>
  )
}

export default Header