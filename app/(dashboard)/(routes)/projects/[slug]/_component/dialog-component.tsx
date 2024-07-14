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


interface DialogComponent {
    alt:string
    src:string
    width:number
    height:number
    title:string
}

export const DialogComponent = ({alt, src, width, height, title } : DialogComponent) => {
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
      <DialogContent className="sm:max-w-[280px] p-2 rounded-lg mx-2">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-col gap-4 py-4 px-2 rounded-md">
          <p className='flex flex-row gap-2 text-center text-sm'>
            <Check className='w-5 h-5 p-1 text-white bg-blue-600 rounded-full border-blue-400 ' />
            full access
          </p>
          <p className='flex flex-row gap-2 text-center text-sm'>
          <Check className='w-5 h-5 p-1 text-white bg-blue-600 rounded-full border-blue-400 ' />
            unlock sourcode
          </p>
           <p className='flex flex-row gap-2 text-center text-sm'>
          <Check className='w-5 h-5 p-1 text-white bg-blue-600 rounded-full border-blue-400 ' />
            get certified 
          </p>
           <p className='flex flex-row gap-2 text-center text-sm'>
         <Check className='w-5 h-5 p-1 text-white bg-blue-600 rounded-full border-blue-400 ' />
            Joining Grup 
          </p>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
