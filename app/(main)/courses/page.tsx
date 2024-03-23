import {List} from "./list";
import {getCourses, getUserProgress} from "@/lib/queries";

const CoursesPage = async () => {
  const [
    courses,
    userProgress
  ] = await Promise.all([
    getCourses(),
    getUserProgress()
  ])

  const activeCourseId = userProgress?.activeCourseId;
  return (
    <div className="h-full max-w-[912px] px-3 mx-auto">
      <h3 className="text-2xl font-bold text-neutral-700">Language Courses</h3>

      <List courses={courses} activeCourseId={activeCourseId}/>
    </div>
  );
}

export default CoursesPage;