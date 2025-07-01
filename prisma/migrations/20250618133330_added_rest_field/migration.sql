/*
  Warnings:

  - Added the required column `rest` to the `workouts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."workouts" ADD COLUMN     "rest" INTEGER NOT NULL;
