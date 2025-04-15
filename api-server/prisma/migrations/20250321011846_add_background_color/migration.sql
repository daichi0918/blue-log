/*
  Warnings:

  - Added the required column `backgroundColor` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "backgroundColor" VARCHAR(7) NOT NULL;
