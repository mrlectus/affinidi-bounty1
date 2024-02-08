import { prisma } from "@/storage/prisma";
import { NextResponse } from "next/server";

export type TCart = {
  name: string;
  price: number;
  sex: string;
  imageUrl: string;
  quantity: number;
  email: string;
  productId: number;
};

export async function POST(request: Request) {
  try {
    const { name, price, sex, imageUrl, email, productId, quantity } =
      await request.json();
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    const id = await prisma.cart.findFirst({
      where: {
        productId: productId,
      },
    });
    if (user && user?.email === email) {
      if (!id) {
        await prisma.cart.create({
          data: {
            name,
            price,
            sex,
            imageUrl,
            productId,
            quantity,
            User: {
              connect: {
                email: email,
              },
            },
          },
        });
        return NextResponse.json(
          { message: "item add to cart successfully!!" },
          { status: 201 }
        );
      } else {
        return NextResponse.json(
          { message: "item already in cart!!" },
          { status: 400 }
        );
      }
    }
    console.log(user, user?.email);
    return NextResponse.json({ message: "unauthorized!!" }, { status: 401 });
  } catch (e) {
    throw e;
  } finally {
    await prisma.$disconnect();
  }
}
