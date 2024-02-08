import { prisma } from "@/storage/prisma";

export async function GET() {
  try {
    const products = await prisma.product.findMany();
    return Response.json(products);
  } catch (e) {
    throw e;
  } finally {
    await prisma.$disconnect();
  }
}
