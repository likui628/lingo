import {UnitBanner} from "./unit-banner";
import {Lesson} from "@prisma/client";
import {LessonButton} from "./lesson-button";

type Props = {
  title: string,
  description: string,
  lessons: (Lesson & { completed: boolean })[]
  activeLesson?: Lesson
}
export const Unit = (
  {
    title,
    description,
    lessons,
    activeLesson
  }: Props) => {
  return (
    <>
      <UnitBanner
        title={title}
        description={description}
      />
      <div className="flex items-center flex-col relative">
        {
          lessons.map((lesson, index) => {
            const isCurrent = lesson.id === activeLesson?.id
            const isLocked = !lesson.completed && !isCurrent
            return (
              <LessonButton
                id={lesson.id}
                index={index}
                key={lesson.id}
                totalCount={lessons.length}
                completed={lesson.completed}
                current={isCurrent}
                locked={isLocked}
                percentage={0}
              />
            )
          })
        }
      </div>
    </>
  )
}