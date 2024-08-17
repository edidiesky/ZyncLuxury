import React from 'react'

export default function Preloader() {
    return (
        <div className='h-screen z-[3000000] font-booking_font4 
        w-screen fixed top-0 left-0 bg-[#000]
         flex items-end justify-end
         text-3xl text-white'>
            <div className="p-24 flex items-center">
                <ul className="flex h-[400px] overflow-hidden items-center flex-col gap-2">
                    <li className=''>2</li>
                    <li className=''>4</li>
                    <li className=''>6</li>
                    <li className=''>8</li>
                    <li className=''>9</li>
                </ul>
                <ul className="flex h-[400px] overflow-hidden items-center flex-col gap-2">
                    <li className=''>2</li>
                    <li className=''>4</li>
                    <li className=''>6</li>
                    <li className=''>8</li>
                    <li className=''>9</li>
                </ul>
            </div>
        </div>
    )
}
