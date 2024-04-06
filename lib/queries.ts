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

export const getCourseProgress = cache(async () => {
  const {userId} = auth()
  const userProgress = await getUserProgress()
  if (!userId || !userProgress?.activeCourseId) {
    return null
  }

  const unitsInActiveCourse = await prisma.unit.findMany({
    where: {
      courseId: userProgress.activeCourseId
    },
    orderBy: {
      order: "asc"
    },
    include: {
      lessons: {
        orderBy: {
          order: "asc"
        },
        include: {
          unit: true,
          challenges: {
            orderBy: {
              order: "asc"
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
      }
    }
  })

  const firstUncompletedLesson = unitsInActiveCourse
    .flatMap((unit) => unit.lessons)
    .find(lesson => {
      return lesson.challenges.some(challenge => {
        return !challenge.challengeProgress
          || challenge.challengeProgress.length == 0
          || challenge.challengeProgress
            .some(progress => progress.completed === false)
      })
    })


  return {
    activeLesson: firstUncompletedLesson,
    activeLessonId: firstUncompletedLesson?.id,
  }
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
        return {...lesson, completed: false}
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

export const getLesson = cache(async (id?: string) => {
  const {userId} = auth()
  if (!userId) {
    return null
  }

  let lessonId = id;
  if (!lessonId) {
    const courseProgress = await getCourseProgress()
    lessonId = courseProgress?.activeLessonId
  }
  if (!lessonId) {
    return null
  }

  const data = await prisma.lesson.findFirst({
    where: {
      id: lessonId
    },
    include: {
      challenges: {
        orderBy: {
          order: "asc"
        },
        include: {
          challengeOptions: true,
          challengeProgress: {
            where: {
              userId
            }
          }
        }
      }
    }
  })
  if (!data || !data.challenges) {
    return null
  }

  const normalizedChallenges = data.challenges.map(lesson => {
    const completedStatus = lesson.challengeProgress
      && lesson.challengeProgress.length > 0
      && lesson.challengeProgress.every(progress => progress.completed)
    return {
      ...lesson,
      completed: completedStatus,
    }
  })
  return {...data, challenges: normalizedChallenges};
})

export const getLessonProgress = cache(async () => {
  const courseProgress = await getCourseProgress()
  if (!courseProgress?.activeLessonId) {
    return 0;
  }

  const lesson = await getLesson(courseProgress.activeLessonId);
  if (!lesson) {
    return 0;
  }

  const completedChallenges = lesson.challenges.filter(challenge => challenge.completed)
  return Math.round(completedChallenges.length / lesson.challenges.length * 100)
})

export const getLeaderboard = cache(async () => {
  const data = await prisma.userProgress.findMany({
    orderBy: {points: "desc"},
    take: 10,
  })
  return data
})

export const isAdmin = async () => {
  const {userId} = auth()
  if (!userId) {
    return false
  }

  const admin = await prisma.admin.findUnique({
    where: {
      userId
    }
  })
  return !!admin
}