"use client";

import { Card } from "@/components/ui/card";
import {
  useDeleteCart,
  useGetCart,
  useGetCountryInfo,
  useGetCurrency,
  useGetUser,
  useUpdateCartByID,
} from "../hooks/hooks";
import Image from "next/image";
import { StackLoading } from "@/components/loading";
import { Button } from "@/components/ui/button";
import Link from "next/link";

/**
 * Renders the cart page.
 *
 * Fetches and displays the logged in user's cart items.
 * Provides functionality to delete items from cart.
 * Displays cart total based on user's country currency.
 */

const CartPage = () => {
  const user = useGetUser();
  const cart = useGetCart(user.data?.email as string);
  const delete_ = useDeleteCart();
  const symbol = useGetCountryInfo(user?.data?.country as string);
  const currency = useGetCurrency(symbol.data?.iso_code);
  const price = currency?.data ? currency.data.toFixed(0) : 1;
  const update = useUpdateCartByID();

  if (cart.isLoading || cart?.isPending) {
    return <StackLoading />;
  }

  if (cart.data?.length === 0 || !cart.data) {
    return (
      <div className="flex mt-10 h-full justify-center items-center">
        <h1>Your cart is empty</h1>
      </div>
    );
  }
  return (
    <div className="p-6 sm:px-24 md:px-48 lg:px-64">
      <div className="flex flex-col gap-4 items-center w-full">
        {cart.data?.map((item) => {
          return (
            <Card
              key={item.id}
              className="flex gap-2 flex-col w-full justify-center"
            >
              <div className="flex gap-4 flex-row items-center w-full justify-between p-2">
                <Button
                  onClick={() => delete_.mutate(item.id)}
                  className="w-6 h-6 text-white rounded-full bg-red-600 flex items-center justify-center"
                >
                  X
                </Button>
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="w-auto h-auto"
                  loading="lazy"
                />
                <div className="flex flex-col justify-evenly">
                  <p>{item.name}</p>
                  <p className="font-bold">
                    {symbol.data?.symbol ? symbol.data.symbol : "$"}
                    {item.price * Number(price) * item.quantity}
                  </p>
                </div>
                <div className="flex h-full flex-col items-center gap-2 justify-between">
                  <Button
                    onClick={() =>
                      update.mutate({
                        id: item.id,
                        quantity: item.quantity + 1,
                      })
                    }
                    className="text-white rounded-full bg-black w-6 h-6 flex items-center justify-center"
                  >
                    +
                  </Button>
                  {!update.isPending ? (
                    <p>{item.quantity}</p>
                  ) : (
                    <p style={{ opacity: 0.5 }}>
                      {update?.variables?.quantity}
                    </p>
                  )}
                  <button
                    onClick={() =>
                      update.mutate({
                        id: item.id,
                        quantity: item.quantity - 1,
                      })
                    }
                    className="text-white rounded-full bg-black w-7 h-6 flex items-center justify-center"
                  >
                    -
                  </button>
                </div>
              </div>
            </Card>
          );
        })}
        <div className="flex font-bold border-0 border-black border-t-2 w-full justify-between">
          <span>Total:</span>
          <span>
            {symbol.data?.symbol ? symbol.data.symbol : "$"}
            {cart.data?.reduce(
              (acc, curr) => acc + curr.price * curr.quantity * Number(price),
              0
            )}
          </span>
        </div>
        <Link
          className="h-10 bg-blue-600 text-white rounded-xl p-2 hover:bg-blue-400 font-bold"
          href="/checkout"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
};

export default CartPage;
