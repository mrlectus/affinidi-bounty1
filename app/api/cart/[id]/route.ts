import { prisma } from "@/storage/prisma";
/**
 * Handles GET requests to retrieve cart data by user email.
 * Connects to the database, queries the cart table by userEmail,
 * and returns the cart data. Handles errors and ensures the
 * database connection is closed properly.
 */

export const GET = async (request: Request) => {
  try {
    const url = new URL(request.url);
    const email = url.pathname.split("/")[3];
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
};
/**
 * Handles DELETE requests to delete a cart item by id.
 * Connects to the database, deletes the cart item matching the id,
 * and returns a success message. Handles errors and ensures the
 * database connection is closed properly.
 */

export const DELETE = async (request: Request) => {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split("/")[3];
    await prisma.cart.delete({
      where: {
        id: Number(id),
      },
    });
    return Response.json({ message: "Item deleted successfully" });
  } catch (e) {
    throw e;
  } finally {
    await prisma.$disconnect();
  }
};
/**
 * Handles PATCH requests to update cart item quantity by id.
 * Connects to the database, updates the quantity for the cart item
 * matching the id, and returns a success message.
 * Handles errors and ensures the database connection is closed properly.
 */

export const PATCH = async (request: Request) => {
  try {
    const { quantity } = await request.json();
    const url = new URL(request.url);
    const id = url.pathname.split("/")[3];
    await prisma.cart.update({
      data: {
        quantity: quantity,
      },
      where: {
        id: Number(id),
      },
    });
    return Response.json({ message: "Item updated" });
  } catch (e) {
    throw e;
  } finally {
    await prisma.$disconnect();
  }
};
