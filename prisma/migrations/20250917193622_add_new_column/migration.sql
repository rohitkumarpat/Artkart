/*
  Warnings:

  - Added the required column `totalamount` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Order" ADD COLUMN     "totalamount" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."Product" ADD COLUMN     "role" TEXT NOT NULL;
