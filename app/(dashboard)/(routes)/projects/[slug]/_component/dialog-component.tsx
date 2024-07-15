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
    user:string
}

export const DialogComponent = ({alt, src, width, height, title, price, user } : DialogComponent) => {
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
      <DialogContent className="sm:max-w-[450px] p-2 rounded-lg mx-2">
        <DialogHeader>
          <DialogTitle className='text-center'></DialogTitle>
          <DialogDescription className='text-center text-3xl text-black font-bold py-4'> 
            Rp.{price}
          </DialogDescription>
          <Separator />
        </DialogHeader>
        <div className="grid grid-col gap-6 py-4 px-2 rounded-md">
          <p className='flex flex-row gap-2 text-center text-sm'>
            <Check className='w-5 h-5 p-1 text-white bg-blue-500 rounded-full border-blue-400 ' />
            full access
          </p>
          <p className='flex flex-row gap-2 text-center text-sm'>
          <Check className='w-5 h-5 p-1 text-white bg-blue-500 rounded-full border-blue-400 ' />
            unlock sourcode
          </p>
           <p className='flex flex-row gap-2 text-center text-sm'>
          <Check className='w-5 h-5 p-1 text-white bg-blue-500 rounded-full border-blue-400 ' />
            get certified 
          </p>
           <p className='flex flex-row gap-2 text-center text-sm'>
         <Check className='w-5 h-5 p-1 text-white bg-blue-500 rounded-full border-blue-400 ' />
            Joining Grup 
          </p>
        </div>
        <DialogFooter className='flex flex-col gap-2'>
          {
            user? (
              <Button className="w-full">
                {`buy now`}
              </Button>
            ) : (
              <Button disabled className="w-full">
                {`please login`}
              </Button>
            )
          }
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
