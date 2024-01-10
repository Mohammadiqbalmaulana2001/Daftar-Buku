"use client"
import React, { useState } from 'react'
import Modal from './modal';
import { useRouter } from 'next/navigation';

export default function TambahBuku() {
    const [formData, setFormData] = useState({
        title : '',
        description : '',
        price : 10000,
        author : ''
    });
    const [isModalOpen, setModalOpen] = useState(false);
    const [mutating, setMutating] = useState(false);

    const router = useRouter();

    const url = process.env.API_ENDPOINT
    const nim = process.env.NIM

    async function handleSubmit (e) {
        e.preventDefault();

        setMutating(true);
        if (!formData.title || !formData.description || !formData.price || !formData.author) {
            console.error('Harap isi semua bidang');
            return;
        }
        await fetch(url, {
            method: 'POST',
            cache: 'reload',
            headers: {
                'Content-Type': 'application/json',
                'nim' : nim
            },
            body: JSON.stringify(formData),
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then((errorData) => {
                    throw new Error(`Server Error: ${JSON.stringify(errorData)}`);
                })
            }
            return response.json();
        })
        .catch(error => {
            console.error(error.message);
        })
        
        closeModal()
        setMutating(false);
        router.refresh()
    }

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
    return (
    <div>
        <button type="button" className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={openModal}>+ Tambah Buku</button>

        <Modal isOpen={isModalOpen} onClose={closeModal} >
                    <h1 className='text-3xl font-bold mb-5'>Tambah Buku</h1>
                    <form className="max-w-md  mx-auto" onSubmit={handleSubmit}>
                        <div className="relative z-0  mb-5 group xl:w-96">
                            <input
                            type="text"
                            name='title'
                            className="block py-2.5 px-0 w-96 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder=" "
                            
                            />
                            <label
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                            Judul
                            </label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <textarea
                            name='description'
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder=" "
                            />
                            <label
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                            Deskripsi
                            </label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                            type="number"
                            name='price'
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            placeholder=" "
                            />
                            <label
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                            Harga
                            </label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                            type="text"
                            name='author'
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            value={formData.author}
                            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                            placeholder=" "
                            />
                            <label
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                            Penulis
                            </label>
                        </div>
                            <div className='py-4'>
                                <button onClick={closeModal} className='text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>Close</button>

                                {
                                    !mutating ? (
                                        <button
                                        type="submit"
                                        className='text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
                                        >
                                            Save
                                        </button>
                                    ):(
                                        <button
                                        type="submit"
                                        className='text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
                                        >
                                            Saving...
                                        </button>
                                    )
                                }
                                
                            </div>
                        </form>
                </Modal>
    </div>
  )
}
