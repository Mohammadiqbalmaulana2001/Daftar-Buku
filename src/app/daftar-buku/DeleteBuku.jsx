"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import Modal from './modal';

export default function DeleteBuku(data) {
    const [mutaing, setMutating] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);

    const url = process.env.API_ENDPOINT
    const nim = process.env.NIM
    const router = useRouter();
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
    

    async function handleDalete(data){
        setMutating(true);
            await fetch(`${url}/${data.id}`,{
                method: "DELETE",
                headers:{
                    "nim" : nim 
                },
            })
        setMutating(false);
        router.refresh()
        closeModal()
    }

    
  return (
    <div>
        <button
            type="button"
            onClick={openModal}
            className="inline-flex items-center gap-x-2 text-sm font-semibold  bg-red-600 md:p-1 rounded-md hover:bg-red-400"
        >
        Delete
        </button>

        <Modal isOpen={isModalOpen} onClose={closeModal}>
            <h1 className='text-3xl font-bold mb-5'>{data.title}</h1>
            <p>Apakah Anda yakin ingin menghapus buku ini?</p>
            <div className="mt-5 flex justify-end items-end">
                
                {
                    !mutaing ? (
                        <button
                            type="button"
                            onClick={() => handleDalete(data)}
                            className="inline-flex items-center gap-x-2 text-sm font-semibold bg-red-600 rounded-md hover:bg-red-400 md:p-1"
                        >
                            Delete
                        </button>
                    ): (
                        <button
                            type="button"
                            className="inline-flex items-center gap-x-2 text-sm font-semibold bg-red-600 rounded-md hover:bg-red-400 md:p-1"
                        >
                            Deleting...
                        </button>
                    )
                }
            </div>
        </Modal>
    </div>
  )
}
