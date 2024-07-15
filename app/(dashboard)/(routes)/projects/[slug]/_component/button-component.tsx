"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

import { formatPrice } from "@/lib/format";
import useSnap from "@/hooks/use-snap";
import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs";
import { Button } from "@/components/ui/button";
import { ClassroomCard } from "./classroom-card";

interface CourseBuyButtonProps {
  price: number;
  courseId: string;
  given_name: string | null | undefined;
  email: string | null | undefined;
  course_title: string;
  purchase: string
  user:string
}

export const CourseBuyButton = ({
  price,
  courseId,
  given_name,
  email,
  course_title,
  purchase,
  user
}: CourseBuyButtonProps) => {

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const payload = {
    price, courseId, given_name, email, course_title
  }

  const snapEmbed = useSnap()

  const onClick = async () => {
    try {
      setIsLoading(true);

      const response = await axios.post(`/api/courses/${courseId}/checkout`, payload)
      console.log(response.data)

      if (response && response.data.status === 'success') {
        snapEmbed
        // snapEmbed(response.data.data.snap_token, 'snap-container')
        window.snap.pay(response.data.data.snap_token, {
          onSuccess: function (result: any) {
            /* You may add your own implementation here */
            console.log("success");
            // router.push(`/course/${courseId}`)
            
          },
          onPending: function (result: any) {
            /* You may add your own implementation here */
            console.log("wating your payment!");
          },
          onError: function (result: any) {
            /* You may add your own implementation here */
            console.log("payment failed!");
          },
          onClose: function () {
            /* You may add your own implementation here */
            console.log('you closed the popup without finishing the payment');
            router.push('/thanks')
        }
        })
      }

    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

 

  return (
     <div 
      className="group hover:shadow-sm items-center  overflow-hidden border rounded-lg h-20 bg-slate-800 text-white text-bold"
      
     >
        {
          email ? (
            !purchase ? (
              <div className='flex flex-col justify-items-center '>
                <button
                  onClick={onClick}
                  disabled={isLoading}
                  className="md:w-auto w-full h-20 items-center"
                >
                Enroll for {formatPrice(price)}
              </button>
              </div>
            ) : (
              <div className='flex flex-col justify-items-center '>
                <ClassroomCard
                  alt="telegram"
                  src="/googleclassroom.svg"
                  width={30}
                  height={30}
                  title="Go To Dashboard"
                  courseId={courseId} 
                  user={user}
                />
              </div>
              
            )
            
          ) : (
            <div className='flex flex-col justify-items-center h-full'>
              <Button className="h-20">
              
                <LoginLink>
                  enroll for {formatPrice(price)}
                </LoginLink>
              </Button>
              
          </div>
          )
        }
       
      </div>
   
  )
}