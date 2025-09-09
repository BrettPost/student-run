import React from 'react'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'

const studentCard = (props: {student: string}) => {
  return (
    <div>
        <Disclosure>
            <DisclosureButton>{props.student}</DisclosureButton>
            <DisclosurePanel>Extra Information - Hello Student</DisclosurePanel>
        </Disclosure>
    </div>
  )
}

export default studentCard