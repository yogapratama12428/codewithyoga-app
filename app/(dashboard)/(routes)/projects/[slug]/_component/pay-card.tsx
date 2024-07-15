import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from 'next/image'
import { Check, CircleCheck } from 'lucide-react'
import { Separator } from '@/components/ui/separator'


interface DialogComponent {
    alt:string
    src:string
    width:number
    height:number
    title:string
    price:number
}

export const PayComponent = ({alt, src, width, height, title, price } : DialogComponent) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
       
        <Button variant="outline" className='flex flex-col gap-2 w-full h-20'>
           <Image
                alt={alt}
                src={src}
                width={width}
                height={height}
            />
             {title}
        </Button>
       
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] p-2 rounded-lg mx-2">
        <DialogHeader>
          <DialogTitle className='text-center'>Penawaran Terbaik</DialogTitle>
          <DialogDescription className='text-center text-3xl text-black font-bold py-4'> 
            Rp.{price}
          </DialogDescription>
          <Separator />
        </DialogHeader>
        <div className="grid grid-col gap-6 py-4 px-2 rounded-md" id='snap-container'>
          
        </div>
        <DialogFooter className='flex flex-col gap-2'>
          <Button type="submit" className="w-full">
            Login
          </Button>
          <Button type="submit" className="w-full">{
            `enroll this course`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
