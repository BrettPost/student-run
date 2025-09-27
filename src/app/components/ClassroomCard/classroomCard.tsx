'use client'
import React from 'react'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Teacher } from "@/drizzle/schema/teacher";
import Link from "next/link";

const classroomCard = (props: {teacher: Teacher}) => {
  return (
    <Link href='/teachers/[teacherId]' as={`/teachers/${props.teacher.id}`}>
      <div className='p-2 w-60 h-34 border-3 border-(--primaryColor) border-solid rounded-lg flex items-center justify-center hover:bg-(--primaryColor) hover:text-(--background)'>
        <p className='text-(length:--cardTitleSize)'>{props.teacher.lastName}</p>
      </div>
    </Link>
  )
}

export default classroomCard