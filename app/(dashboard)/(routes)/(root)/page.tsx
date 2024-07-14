import { SearchInput } from "@/components/search-input";
import { getCourses } from "@/actions/get-course";


import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { db } from "@/app/lib/db";
import { Categories } from "./_components/categories";
import { CoursesList } from "@/components/course-list";

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  }
};

const SearchPage = async ({
  searchParams
}: SearchPageProps) => {

  const { getUser } = getKindeServerSession();
  
  const user = await getUser();
  
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc"
    }
  });

  const courses = await getCourses({
    userId: user?.id || 'datakosong',
    ...searchParams,
  });

  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6 space-y-4">
        <Categories
          items={categories}
        />
        <CoursesList items={courses} />
      </div>
    </>
   );
}
 
export default SearchPage;