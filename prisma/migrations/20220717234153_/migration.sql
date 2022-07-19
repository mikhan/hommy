/*
  Warnings:

  - Added the required column `name` to the `Neighbor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Neighbor" ADD COLUMN     "name" VARCHAR(256) NOT NULL;
