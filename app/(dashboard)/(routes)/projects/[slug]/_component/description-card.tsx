import { CourseProgress } from "@/components/course-progress";
import { IconBadge } from "@/components/icon-badge";
import { formatPrice } from "@/lib/format";
import { BookOpen } from "lucide-react";
import Image from "next/image"


interface CourseCardProps {
  id: string;
  title: string;
  chaptersLength: number;
  price: number;
  progress: number | null;
  category: string;
  description: string  
};

export const DescriptionForm = ({
  id,
  title,
  chaptersLength,
  price,
  progress,
  category,
  description,
}: CourseCardProps ) => {
  return (
     <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
        <div className="flex flex-col pt-2 gap-2">
          <div className="text-2xl md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
            {title}
          </div>
           <div className="text-slate-500 text-xs md:text-sm font-medium group-hover:text-sky-700 transition ">
            {description}
          </div>
          <p className="text-xs text-black text-muted-foreground border border-slate-600 rounded-sm w-20 text-center">
            {category}
          </p>
          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-slate-500">
              <IconBadge size="sm" icon={BookOpen} />
              <span>
                {chaptersLength} {chaptersLength === 1 ? "Chapter" : "Chapters"}
              </span>
            </div>
          </div>
          {progress !== null ? (
            <CourseProgress
              variant={progress === 100 ? "success" : "default"}
              size="sm"
              value={progress}
            />
          ) : (
            <p className="text-md md:text-sm font-medium text-slate-700">
              {formatPrice(price)}
            </p>
          )}
        </div>
      </div>
  )
}

