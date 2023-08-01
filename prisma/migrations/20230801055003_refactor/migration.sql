-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Event" ADD VALUE 'OUTPUT';
ALTER TYPE "Event" ADD VALUE 'TRANSFER';

-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'GUEST';

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "description" TEXT NOT NULL DEFAULT 'Description not available';
