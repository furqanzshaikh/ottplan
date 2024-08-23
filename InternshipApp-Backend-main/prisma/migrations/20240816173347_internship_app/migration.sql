-- CreateTable
CREATE TABLE "Intern" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "degree" TEXT NOT NULL,
    "passoutYear" INTEGER NOT NULL,
    "college" TEXT NOT NULL,
    "skills" TEXT NOT NULL,
    "experience" TEXT NOT NULL,
    "certificate" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "joiningDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "address" TEXT NOT NULL,

    CONSTRAINT "Intern_pkey" PRIMARY KEY ("id")
);
