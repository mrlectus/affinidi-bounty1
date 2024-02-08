import { prisma } from "@/storage/prisma";
/**
 * Deletes the cart for the user with the given email.
 * - Accepts the user's email address.
 * - Deletes all cart items for that user from the database.
 * - Returns a JSON response indicating if the deletion was successful.
 */

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
