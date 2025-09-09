import React from 'react'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className=''>
      <ul className="flex">
        <li><Link href="/">Home</Link></li>
        <li><Link href="students">Students</Link></li>
        <li><Link href="progress">Progress</Link></li>
      </ul>
      {/* <Popover>
        <PopoverButton >Home</PopoverButton>
        <PopoverPanel></PopoverPanel>
      </Popover> */}
    </nav>
  )
}

export default Navbar