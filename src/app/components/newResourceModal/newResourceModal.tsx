'use client'
import { useState } from 'react'
import { Button, Dialog, DialogPanel, DialogTitle, Description } from '@headlessui/react';

const NewResourceModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
        <Button onClick={() => setIsModalOpen(true)} className='mx-20 my-2 p-2 bg-(--primaryColor) text-(--background) border-2 border-(--primaryColor) rounded-3xl hover:scale-120 '>New Student</Button>
        <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className=''>
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
                    <DialogTitle className="">New Student</DialogTitle>
                    <Description>Add a new student to your classroom.</Description>
                    <p>Add a new student to your classroom to track all progress and manage all opportunities for running.</p>
                    <div className="flex gap-4">
                        <button onClick={() => setIsModalOpen(false)}>Cancel</button>
                        <button onClick={() => setIsModalOpen(false)}>Create</button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    </>
  )
}

export default NewResourceModal