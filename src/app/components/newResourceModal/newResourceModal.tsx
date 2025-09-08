'use client'
import { useState } from 'react'
import { Button, Dialog, DialogPanel, DialogTitle, Description } from '@headlessui/react';

const NewResourceModal = () => {
    let [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
        <Button onClick={() => setIsModalOpen(true)} className=''>New Student</Button>
        <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className=''>
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
                    <DialogTitle className="">Deactivate account</DialogTitle>
                    <Description>This will permanently deactivate your account</Description>
                    <p>Are you sure you want to deactivate your account? All of your data will be permanently removed.</p>
                    <div className="flex gap-4">
                        <button onClick={() => setIsModalOpen(false)}>Cancel</button>
                        <button onClick={() => setIsModalOpen(false)}>Deactivate</button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    </>
  )
}

export default NewResourceModal