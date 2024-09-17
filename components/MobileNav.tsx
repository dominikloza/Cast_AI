'use client'

import React from 'react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { sidebarLinks } from '@/constants'
import RightSidebar from '@/components/RightSidebar'
import { SignedIn, UserButton, useUser } from '@clerk/nextjs'

const MobileNav = () => {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <section>
      <Sheet>
        <SheetTrigger>
          <Image src="/icons/hamburger.svg" height={30} width={30} alt='menu' className='cursor-pointer' />
        </SheetTrigger>
        <SheetContent side="left" className='border-none bg-black-1'>
          <Link href="/" className='flex cursor-pointer items-center gap-2 pb-10 pl-4'>
            <Image src="/images/logo.png" alt='logo' width={23} height={27} />
            <h1 className='text-24 font-extrabold text-white-1 ml-2'>Cast AI</h1>
          </Link>
          <div className='flex flex-col h-[calc(100vh-134px)] justify-between overflow-y-auto'>
            <SheetClose asChild>
              <nav className='flex h-full flex-col gap-6 text-white-1'>
                {sidebarLinks.map(({ route, label, imgUrl }) => {
                  const isActive = pathname === route || pathname.startsWith(`${route}/`);
                  return <SheetClose asChild key={route}><Link href={route} className={cn('flex gap-3 items-center py-4 max-lg:px-4 justify-start transition-all', {
                    'bg-nav-focus border-r-4 border-orange-1': isActive
                  })}>
                    <Image src={imgUrl} alt={label} width={24} height={24} />
                    {label}
                  </Link>
                  </SheetClose>
                })}
              </nav>
            </SheetClose>
            <SheetClose asChild>
              <SignedIn>
                <Link href={`/profile/${user?.id}`} className='flex gap-3 px-4 py-4'>
                  <UserButton />
                  <div className='flex w-full items-center justify-between'>
                    <h1 className='text-16 font-semibold text-white-1'>{user?.firstName} {user?.lastName}</h1>
                    <Image src="/icons/right-arrow.svg" alt='arrow' width={24} height={24} />
                  </div>
                </Link>
              </SignedIn>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>

    </section>
  )
}

export default MobileNav