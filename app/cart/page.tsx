"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useGetCart, useGetUser } from "../hooks/hooks";
import Image from "next/image";

const CartPage = () => {
  const user = useGetUser();
  const cart = useGetCart(user.data?.email as string);
  return (
    <div className="p-6">
      <div className="flex flex-col gap-4">
        {cart.data?.map((item) => {
          return (
            <Card className="flex items-center p-4">
              <CardContent className="flex gap-4">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={100}
                  height={100}
                />
                <div className="flex flex-col justify-evenly">
                  <p>{item.name}</p>
                  <p className="font-bold">{item.price}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default CartPage;
