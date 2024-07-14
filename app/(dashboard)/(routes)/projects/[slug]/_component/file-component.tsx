
import Image from 'next/image'
import React from 'react'

export const FileCard = () => {
  return (
    <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-20">
        <div className='flex flex-col justify-items-center items-center'>
            <Image
                alt='github'
                src='/github.svg'
                width={30}
                height={30}
            />
            <p className='text-sm'>
                Sourcecode
            </p>
        </div>
        
    </div>
  )
}
