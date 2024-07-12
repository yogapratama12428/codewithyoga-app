"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import useSnap from "@/hooks/use-snap";

interface CourseEnrollButtonProps {
  price: number;
  courseId: string;
  given_name: string | null;
  email: string | null;
  course_title: string;
}

export const CourseEnrollButton = ({
  price,
  courseId,
  given_name,
  email,
  course_title,
}: CourseEnrollButtonProps) => {

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