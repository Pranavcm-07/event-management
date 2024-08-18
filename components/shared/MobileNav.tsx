'use client'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import NavItems from "./NavItems"
import { signIn, signOut, useSession } from "next-auth/react"
import AuthButton from "./AuthButton"

  
const MobileNav = () => {
  const { status } = useSession()
  return (
    <nav className="md:hidden">
        <Sheet>
            <SheetTrigger className="align-middle">
                <Image src="/assets/icons/menu.svg" alt="Menu" width={24} height={24} />
            </SheetTrigger>
            <SheetContent className="flex flex-col gap-6 md:hidden bg-white">
                <Image src="/assets/images/logo.svg" alt="Evently logo" width={128} height={38} />
                <Separator />
                <NavItems />
                {status === 'authenticated' ? (
                  <AuthButton styles='md:hidden' auth='Sign Out' onclick={()=>signOut()}/>
                ) : (
                  <AuthButton styles='md:hidden' auth='Sign In' onclick={()=>signIn()}/>
                )}
            </SheetContent>
        </Sheet>
    </nav>
  )
}

export default MobileNav