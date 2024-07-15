import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface ClassroomCardProps {
    alt: string
    src: string
    width: number
    height: number
    title: string
    courseId: string 
}


export const ClassroomCard = ({alt, src, width, height, title, courseId} : ClassroomCardProps) => {
  return (
    <Link href={`/courses/${courseId}`}>
        <Button variant="outline" className='flex flex-col gap-2 w-full h-20'>
            <Image
                alt={alt}
                src={src}
                width={width}
                height={height}
            />
            {title}
        </Button>
    </Link>
  )
}
