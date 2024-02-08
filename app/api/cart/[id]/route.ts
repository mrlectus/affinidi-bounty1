import { prisma } from "@/storage/prisma";

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
