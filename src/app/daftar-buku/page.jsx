/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import React, { useEffect, useState } from 'react'
import TambahBuku from './tambahBuku'
import EditBuku from './EditBuku'
import DeleteBuku from './DeleteBuku'
import Link from 'next/link'

export default function DaftarBuku() {
    const [data , setData] = useState([])
    
    const url = process.env.API_ENDPOINT
    const nim = process.env.NIM

    useEffect(() => {
        getData()
    },[])
    
    const getData = () => {
            fetch(url, {
                method: "GET",
                headers:{
                    "nim" : nim 
                },
                cache: "reload"
            }).then(res => res.json()).then(data => setData(data.data)).catch(error => console.error(error))
    }

  return (
    <div>
    <div className='min-h-screen flex bg-sky-400 py-8 px-8'>
        <div className='bg-sky-300 w-full pt-3 px-10 '>
            <h1 className='text-3xl font-bold '>Daftar Buku</h1>
            <p className='py-4'>Jumlah buku yang tersedia : {data.length === 0 ? "buku tidak tersedia": `${data.length}`} </p>
            
            <TambahBuku />
            <div className='w-full md:bg-sky-200 h-96 overflow-auto'>
                <h3 className='py-5 px-5 text-xl font-semibold'>Data Buku</h3>
                <div className="flex flex-col px-2 ">
                    <div className="-m-1.5 overflow-x-auto">
                        <div className="p-1.5 min-w-full inline-block align-middle">
                        <div className="overflow-hidden">
                            <table className="min-w-full table-auto divide-y divide-gray-200">
                            <thead>
                                <tr >
                                    <th
                                        className=" text-center text-xs font-bold  uppercase"
                                    >
                                        judul
                                    </th>
                                    <th
                                        
                                        className="text-center text-xs font-bold uppercase"
                                    >
                                        Deskripsi
                                    </th>
                                    <th
                                        
                                        className=" text-center text-xs font-bold  uppercase"
                                    >
                                        harga
                                    </th>
                                    <th
                                        
                                        className="text-center text-xs font-bold  uppercase"
                                    >
                                        penulis
                                    </th>
                                    <th
                                        className=" text-center text-xs font-bold uppercase"
                                    >
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody >
                                {
                                    data.length > 0 && data.map((data , index) => {
                                        return (
                                            <tr key={index} className='border border-b-0' >
                                                <td className=" w-1/6 my-5 text-center text-sm">
                                                    <Link href={`/daftar-buku/detail/${data.id}`}>{data.title}</Link>    
                                                </td>
                                                <td className="text-sm sm:text-justify line-clamp-5">
                                                    {data.description}
                                                </td>
                                                <td className=" w-36 text-center text-sm ">
                                                    Rp.{data.price}
                                                </td>
                                                <td className="text-sm w-36 text-center ">
                                                    {data.author}
                                                </td>
                                                <td className="w-36">
                                                    <div className='flex justify-center'>
                                                        <EditBuku {...data}/>
                                                        <DeleteBuku {...data}/>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                            </table>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}
