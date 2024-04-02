/*
  Warnings:

  - A unique constraint covering the columns `[userId,challengeId]` on the table `challenge_progress` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "challenge_progress_userId_challengeId_key" ON "challenge_progress"("userId", "challengeId");
