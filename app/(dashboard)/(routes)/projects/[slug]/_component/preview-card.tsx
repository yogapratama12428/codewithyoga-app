'use client'

import { Button } from "@/components/ui/button"
import { Presentation } from "lucide-react";
import { useRouter } from "next/navigation";

interface PreviewCardProps {
    id: string;
    user: string;
}

export const PreviewCard: React.FC<PreviewCardProps> = ({id, user}) => {

    const router = useRouter()

    return (
        <Button 
        disabled={ !user ? true : false} 
        className='flex flex-col gap-2 w-full h-20 text-white '
        onClick={ 
          () => {
            if (user) {
              router.push(`/courses/${id}`)
            }
          }
        }
      >
      <Presentation className='w-6 h-6' />
        Try Class Room
      </Button>
    )
}