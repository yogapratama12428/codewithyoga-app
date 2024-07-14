"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { formatPrice } from "@/lib/format";
import useSnap from "@/hooks/use-snap";

interface CourseBuyButtonProps {
  price: number;
  courseId: string;
  given_name: string | null | undefined;
  email: string | null | undefined;
  course_title: string;
}

export const CourseBuyButton = ({
  price,
  courseId,
  given_name,
  email,
  course_title,
}: CourseBuyButtonProps) => {

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
        window.snap.pay(response.data.data.snap_token)
      }

    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

 

  return (
     <div 
      className="group hover:shadow-sm  items-center  transition overflow-hidden border rounded-lg h-20 bg-slate-800 text-white text-bold"
      
     >
        <div className='flex flex-col justify-items-center '>
          <button
           onClick={onClick}
            disabled={isLoading}
            className="md:w-auto w-full h-20 items-center"
          >
            Enroll for {formatPrice(price)}
          </button>
        </div>
      </div>
   
  )
}