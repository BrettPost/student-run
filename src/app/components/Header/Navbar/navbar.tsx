import React from 'react'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className='w-full content-center text-lg'>
      <ul className="flex px-10 justify-evenly">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/classrooms">Classrooms</Link></li>
        <li><Link href="/progress">Progress</Link></li>
      </ul>
      {/* <Popover>
        <PopoverButton >Home</PopoverButton>
        <PopoverPanel></PopoverPanel>
      </Popover> */}
    </nav>
  )
}

export default Navbar