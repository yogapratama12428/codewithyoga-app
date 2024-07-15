import { getCourseDetails } from "@/actions/get-course-detail"
import ImageBanner from "./_component/image-banner";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { DescriptionForm } from "./_component/description-card";
import { CourseBuyButton } from "./_component/button-component";
import { DialogComponent } from "./_component/dialog-component";
import { ClassroomCard } from "./_component/classroom-card";

interface CourseCard {
  id: string;
  title: string;
  chaptersLength: number;
  price: number;
  progress: number | null; 
  category: any;
  description: string  
  imageUrl: string;
  chapters: string;

}

const ProjectPage =  async ({
  params
}: {
  params: { slug: string;}
}) => {

    const { getUser } = getKindeServerSession();

    const user = await getUser();

    const course: CourseCard | any  = await getCourseDetails({
      slug: params.slug,
      userId: user?.id,
    });
     
    console.log(course)

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 ">
        <div className="flex flex-col gap-2 mx-2">
            <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
              <ImageBanner imageUrl={course?.imageUrl} />
            </div>

            <div className="mt-2">
              <DescriptionForm     
                id={course?.id}
                title={course?.title}
                chaptersLength={course.chapters.length}
                price={course?.price!}
                category={course?.category?.name}
                progress={course?.progress}
                description={course?.description}
              />
            </div>
      
        </div>

        <div className="flex flex-col gap-2 mx-2">

          <DialogComponent 
            alt="telegram"
            src="/telegram.svg"
            width={30}
            height={30}
            title="Join Grup"
            price={course?.price}
            user={user?.id ?? ''}
          />

          <ClassroomCard 
            alt="telegram"
            src="/googleclassroom.svg"
            width={30}
            height={30}
            title="Go To Dashboard"
            courseId={course.id} 
          />

          <CourseBuyButton 
            price={course.price} 
            courseId={course.id} 
            course_title={course.title}
            given_name={user?.given_name}
            email={user?.email}
        />

        </div>

       
       
      </div>
    )
  }

  export default ProjectPage