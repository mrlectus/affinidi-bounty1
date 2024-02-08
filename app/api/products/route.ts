import { prisma } from "@/storage/prisma";
/**
 * GET handler for /api/products route.
 *
 * Retrieves all products from the database and returns them in a JSON response.
 */

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
