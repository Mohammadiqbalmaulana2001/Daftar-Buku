'use client'
import { useEffect, useState } from "react";
import Link from 'next/link'
export default function DetailBuku(props) {
    const [data, setData] = useState([]);
    const params = props;
    const url = process.env.API_ENDPOINT
    const nim = process.env.NIM
    

    const detailBuku = async() => {
        await fetch(`${url}/${params.params.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'nim' : nim
            },
        }).then(res => res.json()).then(data => setData(data.data))
    }
    
    useEffect(() => {
        detailBuku()
    }, [])
    
  return (
    <div className="w-full h-screen bg-sky-400 flex items-center justify-center ">
        <div className="bg-sky-300 rounded-xl w-1/2 h-5/6 p-10 overflow-auto">
            <h1 className="text-center text-3xl font-semibold pb-3">{data.title}</h1>
            <p className="text-justify  first-line:tracking-widest
                    md:first-letter:text-6xl  md:first-letter:font-bold first-letter:text-black
                    first-letter:mr-3 first-letter:float-left">{data.description}</p>
            <p className="py-5  "><span className="font-bold">penulis:</span> {data.author}</p>
            <Link href="/daftar-buku" className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">kembali</Link>
        </div>
    </div>
  )
}
