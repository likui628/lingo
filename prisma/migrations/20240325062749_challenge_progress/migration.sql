-- CreateTable
CREATE TABLE "challengeProgress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "challengeId" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "challengeProgress_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "challengeProgress" ADD CONSTRAINT "challengeProgress_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "challenges"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
