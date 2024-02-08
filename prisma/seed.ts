import { prisma } from "@/storage/prisma";
import { products } from "./product";

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
