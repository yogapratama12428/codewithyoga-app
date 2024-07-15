'use client'

import { Button } from '@/components/ui/button'
import { Presentation } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

interface ClassroomCardProps {
    alt: string
    src: string
    width: number
    height: number
    title: string
    courseId: string 
    user: string
}



export const ClassroomCard = ({alt, src, width, height, title, courseId, user} : ClassroomCardProps) => {

  const router = useRouter();

  return (
    // <Link href={`/courses/${courseId}`}>
        <Button 
          
          disabled={ !user ? true : false} 
          className='flex flex-col gap-2 w-full h-20 text-white '
          onClick={ 
            () => {
              if (user) {
                router.push(`/courses/${courseId}`)
              }
            }
          }
        >
         <Presentation className='w-6 h-6' />
            Class Room
        </Button>
    // </Link>
  )
}
