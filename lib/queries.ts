import {cache} from "react";
import {prisma} from "@/lib/db";
import {auth} from "@clerk/nextjs";

export const getUserProgress = cache(async () => {
  const {userId, user} = auth()
  if (!userId) {
    return null
  }

  const data = await prisma.userProgress.findFirst({
    where: {
      userId: userId
    },
    include: {
      activeCourse: true
    }
  })
  return data
})

export const getCourses = cache(async () => {
  const data = await prisma.course.findMany()

  return data
})

export const getUnits = cache(async () => {
  const {userId} = auth()

  const userProgress = await getUserProgress()
  if (!userId || !userProgress?.activeCourseId) {
    return []
  }

  const data = await prisma.unit.findMany({
    where: {
      courseId: userProgress.activeCourseId,
    },
    include: {
      lessons: {
        orderBy: {
          order: "asc",
        },
        include: {
          challenges: {
            orderBy: {
              order: "asc",
            },
            include: {
              challengeProgress: {
                where: {
                  userId: userId
                }
              }
            }
          }
        }
      },
    }
  })

  const normalizedData = data.map((unit) => {
    const lessonsWithCompletedStatus: any[] = unit.lessons.map((lesson) => {
      if (lesson.challenges.length === 0) {
        return {...lesson, completed: true}
      }

      const completedStatus = lesson.challenges.every((challenge) => {
        return challenge.challengeProgress
          && challenge.challengeProgress.length > 0
          && challenge.challengeProgress.every((progress) => progress.completed)
      })
      return {...lesson, completed: completedStatus}
    })

    return {...unit, lessons: lessonsWithCompletedStatus}
  });

  return normalizedData
})