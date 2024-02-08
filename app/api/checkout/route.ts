import { prisma } from "@/storage/prisma";

export const DELETE = async (request: Request) => {
  try {
    const { email } = await request.json();
    await prisma.cart.deleteMany({
      where: {
        userEmail: {
          equals: email,
          mode: "insensitive",
        },
      },
    });
    return Response.json({ message: "cart cleared!!" });
  } catch (e) {
    throw e;
  } finally {
    await prisma.$disconnect();
  }
};
