"use server"

import {auth, currentUser} from "@clerk/nextjs";
import {prisma} from "@/lib/db";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";
import {getUserProgress} from "@/lib/queries";

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

export const reduceHearts = async (challengeId: string) => {
  const {userId} = auth();
  if (!userId) {
    throw new Error("Unauthorized")
  }

  const challenge = await prisma.challenge.findUnique({
    where: {id: challengeId}
  })
  if (!challenge) {
    throw new Error("Challenge not found")
  }

  const userProgress = await getUserProgress()
  if (!userProgress) {
    throw new Error("User progress not found")
  }

  if (userProgress.hearts === 0) {
    return {
      error: "hearts"
    }
  }

  await prisma.userProgress.update({
    where: {
      userId,
    },
    data: {
      hearts: {
        set: Math.max(userProgress.hearts - 1, 0)
      }
    }
  })

  const lessonId = challenge.lessonId
  
  revalidatePath("/learn");
  revalidatePath(`/lesson/${lessonId}`);
}