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