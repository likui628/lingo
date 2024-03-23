"use server"

import {auth, currentUser} from "@clerk/nextjs";
import {prisma} from "@/lib/db";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";

export const upsertUserProgress = async (courseId: string) => {
  const {userId} = auth();
  const user = await currentUser();
  if (!userId || !user) {
    throw new Error("Unauthorized")
  }

  const course = await prisma.course.findFirst({
    where: {
      id: courseId
    }
  })
  if (!course) {
    throw new Error("Course not found")
  }

  await prisma.userProgress.upsert({
    where: {
      userId: userId,
    },
    update: {
      userName: user.firstName || "User",
      userImageSrc: user.imageUrl || "/mascot.svg",
      activeCourseId: courseId
    },
    create: {
      userId: userId,
      userName: user.firstName || "User",
      userImageSrc: user.imageUrl || "/mascot.svg",
      activeCourseId: courseId
    }
  })

  revalidatePath("/courses")
  revalidatePath("/learn")
  
  redirect("/learn")
}