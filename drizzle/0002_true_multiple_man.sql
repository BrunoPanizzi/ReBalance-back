ALTER TABLE "stock" RENAME COLUMN "10" TO "ticker";
ALTER TABLE "stock" ALTER COLUMN "ticker" SET DATA TYPE varchar(10);