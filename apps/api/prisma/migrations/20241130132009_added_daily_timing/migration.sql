/*
  Warnings:

  - You are about to drop the column `duration` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `end` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `start` on the `Schedule` table. All the data in the column will be lost.
  - Added the required column `eventDuration` to the `Schedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "duration",
DROP COLUMN "end",
DROP COLUMN "start",
ADD COLUMN     "eventDuration" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "DailyTiming" (
    "id" TEXT NOT NULL,
    "dayOfWeek" "DayOfWeek" NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "scheduleId" TEXT,

    CONSTRAINT "DailyTiming_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DailyTiming" ADD CONSTRAINT "DailyTiming_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE SET NULL ON UPDATE CASCADE;
