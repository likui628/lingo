import {UnitBanner} from "./unit-banner";
import {Lesson} from "@prisma/client";
import {LessonButton} from "./lesson-button";

type Props = {
  title: string,
  description: string,
  lessons: (Lesson & { completed: boolean })[]
}
export const Unit = ({title, description, lessons}: Props) => {
  return (
    <>
      <UnitBanner
        title={title}
        description={description}
      />
      <div className="flex items-center flex-col relative">
        {
          lessons.map((lesson, index) => (
            <LessonButton
              id={lesson.id}
              index={index}
              key={lesson.id}
              title={lesson.title}
              totalCount={lessons.length}
              completed={lesson.completed}
              percentage={0}
            />
          ))
        }
      </div>
    </>
  )
}