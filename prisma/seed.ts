import "dotenv/config";
import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const annaNagar = await prisma.branch.create({
    data: {
      name: "Anna Nagar",
      location: "Chennai",
      artists: {
        create: [{ name: "Makeup Artist 1" }],
      },
    },
  });

  const omr = await prisma.branch.create({
    data: {
      name: "OMR",
      location: "Chennai",
      artists: {
        create: [{ name: "Makeup Artist 2" }],
      },
    },
  });

  await prisma.service.createMany({
    data: [
      {
        name: "Bridal Makeup",
        duration: 180,
        price: 15000,
      },
      {
        name: "Reception Makeup",
        duration: 150,
        price: 12000,
      },
      {
        name: "Engagement Makeup",
        duration: 120,
        price: 10000,
      },
      {
        name: "Party Makeup",
        duration: 90,
        price: 5000,
      },
    ],
  });

  console.log("Seed completed:", annaNagar.name, omr.name);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
