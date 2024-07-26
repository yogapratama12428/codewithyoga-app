import { getCourseDetails } from "@/actions/get-course-detail"
import ImageBanner from "./_component/image-banner";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { DescriptionForm } from "./_component/description-card";
import { CourseBuyButton } from "./_component/button-component";
import { DialogComponent } from "./_component/dialog-component";
import { Metadata, ResolvingMetadata } from "next";
import { getProject } from "@/actions/get-project";
import { PreviewCard } from "./_component/preview-card";

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

type Props = {
  params: {
    slug: string;
  }
}

export async function generateMetadata(
  { params }: Props ): Promise<Metadata> {
  // read route params
  const slug = params.slug
 
  // fetch data
  const course = await getProject(slug)

  return {
    title: course?.title,
    description: course?.description,
    applicationName: 'Online Course',
    referrer: 'origin-when-cross-origin',
    authors: [ { name: 'Yoga Pratama Pangestu' }],
    creator: 'Yoga Pratama Pangestu',
    publisher: 'Codewithyoga',
    openGraph: {
      title: 'Online Course',
      description: 'codewithyoga menyediakan kelas online bersertifikat dan komunitas untuk belajar skills IoT Developer dan coding yang dibimbing oleh mentor profesional, Bergabunglah bersama kami!',
      url: 'https://codewithyoga.com',
      siteName: 'codewithyoga.com',
      images: [
        {
          url: course?.imageUrl!, // Must be an absolute URL
          width: 800,
          height: 600,
          alt: course?.title,
        },
      ],
      locale: 'id_ID',
      type: 'website',
    },
  }
}

const ProjectPage =  async ({
  params
}: Props) => {

    const { getUser } = getKindeServerSession();

    const user = await getUser();

    const course: CourseCard | any  = await getCourseDetails({
      slug: params.slug,
      userId: user?.id,
    });

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

          <DialogComponent  
            alt="github"
            src="/github.svg"
            width={30}
            height={30}
            title="Sourcecode"
            price={course?.price}
            user={user?.id ?? ''}
          />

          
          <div className="group hover:shadow-sm items-center w-auto inset-x-0 bottom-0 ">
            <CourseBuyButton 
              price={course.price} 
              courseId={course.id} 
              course_title={course.slug}
              given_name={user?.given_name}
              email={user?.email}
              purchase={course.purchase?.courseId}
              user={user?.id ?? ''}
            />
          </div>

          {/* {
            !course.purchase && (
              <PreviewCard 
              id={course.id}
              user={user?.id ?? ''}
            />
            )
          } */}
        </div>
      
       
      </div>
    )
  }

  export default ProjectPage