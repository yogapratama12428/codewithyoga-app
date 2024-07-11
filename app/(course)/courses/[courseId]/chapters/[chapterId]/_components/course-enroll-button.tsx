"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";

interface CourseEnrollButtonProps {
  price: number;
  courseId: string;
}

export const CourseEnrollButton = ({
  price,
  courseId
}: CourseEnrollButtonProps) => {

  const [isLoading, setIsLoading] = useState(false);

  const payload = {
    price, courseId
  }

  const onClick = async () => {
    try {
      setIsLoading(true);

      const response = await axios.post(`/api/courses/${courseId}/checkout`, payload)
      console.log(response.data)

      window.snap.pay(response.data.snapTransaction.token)

    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(()=>{
    const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js"
    const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY

    const script = document.createElement('script')
    script.src = snapScript
    script.setAttribute('data-client-key', clientKey!)
    script.async = true;

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }


  },[])

  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      size="sm"
      className="w-full md:w-auto"
    >
      Enroll for {formatPrice(price)}
    </Button>
  )
}