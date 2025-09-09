import React from 'react'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'

const classroomCard = (props: {classroom: string}) => {
  return (
    <div>
        <Disclosure>
            <DisclosureButton>{props.classroom}</DisclosureButton>
            <DisclosurePanel>Welcome to the class</DisclosurePanel>
        </Disclosure>
    </div>
  )
}

export default classroomCard