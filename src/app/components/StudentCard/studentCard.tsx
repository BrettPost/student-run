'use client'
import React from 'react'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Student } from "@/drizzle/schema/student";
import Link from "next/link";

const studentCard = (props: {student: Student}) => {
  return (
    <Link href='/students/[studentId]' as={`/students/${props.student.id}`}>
      <div className='p-2 w-60 h-34 border-3 border-(--primaryColor) border-solid rounded-lg flex items-center justify-center hover:bg-(--primaryColor) hover:text-(--background)'>
        <p className='text-(length:--cardTitleSize)'>{props.student.lastName}</p>
      </div>
    </Link>
  )
}

export default studentCard