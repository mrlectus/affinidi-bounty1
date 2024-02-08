import { prisma } from "@/storage/prisma";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const email = url.pathname.split("/")[3];
    console.log("email-path", email);
    const cart = await prisma.cart.findMany({
      where: {
        userEmail: email,
      },
    });
    return Response.json(cart);
  } catch (e) {
    throw e;
  } finally {
    await prisma.$disconnect();
  }
}
