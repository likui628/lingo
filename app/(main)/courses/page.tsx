import {prisma} from "@/lib/db";
import {List} from "./list";

const CoursesPage = async () => {

  const data = await prisma.course.findMany({})

  return (
    <div className="h-full max-w-[912px] px-3 mx-auto">
      <h3 className="text-2xl font-bold text-neutral-700">Language Courses</h3>

      <List courses={data} activeCourseId={''}/>
    </div>
  );
}

export default CoursesPage;