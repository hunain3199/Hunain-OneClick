import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Whatsapp() {
  return (
    <div className='fixed right-4 bottom-5'>
      <Link href="https://wa.me/12674128822" target='_blank'><div>
       <Image  src='/whatsapp.gif' alt='whatsapp' height={30} width={60}/>
        </div></Link>
    </div>
  )
}
