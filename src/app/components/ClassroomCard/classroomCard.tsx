import React from 'react'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Teacher } from "@/drizzle/schema/teacher";

const classroomCard = (props: {teacher: Teacher}) => {
  return (
    <div>
        <Disclosure>
            <DisclosureButton>{props.teacher.lastName}</DisclosureButton>
            <DisclosurePanel>Welcome {props.teacher.firstName}'s class</DisclosurePanel>
        </Disclosure>
    </div>
  )
}

export default classroomCard