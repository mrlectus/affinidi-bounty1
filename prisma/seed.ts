import { prisma } from "@/storage/prisma";
import { products } from "./product";

/**
 * Main async function that seeds the products into the database.
 * Loops through the products array and creates each product record using prisma.
 * Catches any errors and logs them before rethrowing.
 * Finally block disconnects from prisma after seeding is complete.
 */
const main = async () => {
  products.forEach(async (product) => {
    await prisma.product.create({
      data: product,
    });
  });
};

main()
  .catch((e) => {
    console.error(e);
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
