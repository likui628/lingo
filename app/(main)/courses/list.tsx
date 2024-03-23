import {Course, UserProgress} from "@prisma/client";
import {Card} from "./card";

type Props = {
  courses: Course[]
  activeCourseId?: UserProgress['activeCourseId']
}
export const List = ({courses, activeCourseId}: Props) => {
  return (
    <div className="pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
      {
        courses.map(course => {
          return (
            <Card
              course={course}
              active={course.id === activeCourseId}
              key={course.id}
            />
          )
        })
      }
    </div>
  );
}