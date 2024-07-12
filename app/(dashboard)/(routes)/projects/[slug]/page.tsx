import { getCourseDetails } from "@/actions/get-course-detail"

const ProjectPage = async ({ params }: { params: { slug: string } }) => {
    
    const course_detail = await getCourseDetails(params.slug)
     
    console.log(course_detail)

    return <div>My Post: {course_detail}</div>
  }

  export default ProjectPage