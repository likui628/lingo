"use client"

import {Course, UserProgress} from "@prisma/client";
import {Card} from "./card";
import {useTransition} from "react";
import {useRouter} from "next/navigation";
import {upsertUserProgress} from "@/actions/user-progress";
import {toast} from "sonner"

type Props = {
  courses: Course[]
  activeCourseId?: UserProgress['activeCourseId']
}

export const List = ({courses, activeCourseId}: Props) => {
  const [pending, setTransition] = useTransition()

  const router = useRouter()
  const onClick = (id: string) => {
    if (pending) return

    if (id === activeCourseId) {
      return router.push("/learn")
    }

    setTransition(() => {
      upsertUserProgress(id)
        .catch(() => toast.error("Something went wrong."))
    })
  }

  return (
    <div className="pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
      {
        courses.map(course => {
          return (
            <Card
              aria-disabled={pending}
              course={course}
              active={course.id === activeCourseId}
              key={course.id}
              onClick={onClick}
            />
          )
        })
      }
    </div>
  );
}