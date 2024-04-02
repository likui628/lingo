"use server"

import {auth} from "@clerk/nextjs";
import {prisma} from "@/lib/db";
import {revalidatePath} from "next/cache";

export const upsertChallengeProgress = async (challengeId: string) => {
  const {userId} = auth();
  if (!userId) {
    throw new Error("Unauthorized")
  }

  const userProgress = await prisma.userProgress.findFirst({
    where: {
      userId
    }
  })
  if (!userProgress) {
    throw new Error("User progress not found")
  }

  const challenge = await prisma.challenge.findFirst({
    where: {
      id: challengeId
    }
  })
  if (!challenge) {
    throw new Error("Challenge not found")
  }

  if (userProgress.hearts === 0) {
    return {
      error: "hearts"
    }
  }

  const challengeProgress = await prisma.challengeProgress.findUnique({
    where: {
      userId_challengeId: {
        userId,
        challengeId
      }
    }
  })
  const isPractice = !!challengeProgress
  const data = {
    hearts: userProgress.hearts,
    points: userProgress.points
  }
  if (isPractice) {
    data.points += 1
    data.hearts = Math.min(data.hearts + 1, 5)
  } else {
    await prisma.challengeProgress.create({
      data: {
        userId,
        challengeId,
        completed: true
      }
    })
    data.points += 10
  }

  await prisma.userProgress.update({
    where: {
      userId
    },
    data
  })

  const lessonId = challenge.lessonId
  revalidatePath("/learn");
  revalidatePath("/lesson");
  revalidatePath(`/lesson/${lessonId}`);

  return data
}