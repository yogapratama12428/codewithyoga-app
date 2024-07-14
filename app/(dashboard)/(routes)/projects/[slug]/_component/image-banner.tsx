import Image from 'next/image'
import React from 'react'


interface ImageBannerProps {
    imageUrl: string | any;
}

const ImageBanner = ({imageUrl} : ImageBannerProps) => {
  return (
    <div className='relative w-full aspect-video rounded-md overflow-hidden'>
    {
      imageUrl && (
        <Image
          alt="Upload"
          fill
          className="object-cover rounded-md"
          src={imageUrl}
        />
      )
    }
    </div>  
  )
}

export default ImageBanner