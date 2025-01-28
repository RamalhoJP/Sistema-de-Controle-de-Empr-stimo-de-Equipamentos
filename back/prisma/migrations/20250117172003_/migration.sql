/*
  Warnings:

  - You are about to drop the column `acquisition_date` on the `Equipment` table. All the data in the column will be lost.
  - Added the required column `acquisitionDate` to the `Equipment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Equipment" DROP COLUMN "acquisition_date",
ADD COLUMN     "acquisitionDate" TIMESTAMP(3) NOT NULL;
