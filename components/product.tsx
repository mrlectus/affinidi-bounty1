"use client";
import { Card, CardContent, CardFooter } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import {
  useAddToCart,
  useGetCountryInfo,
  useGetCurrency,
  useGetProducts,
  useGetUser,
} from "@/app/hooks/hooks";
import { Loading, StackLoading } from "./loading";
import { Cormorant_Upright } from "next/font/google";

export const cormorant = Cormorant_Upright({
  weight: ["400", "700"],
  subsets: ["latin", "latin-ext", "vietnamese"],
});

/**
 * Renders a list of product cards to display in the store.
 * Fetches product data, currency conversion, cart interactions.
 * Uses React hooks for data and cart interactions.
 */

export const Product = () => {
  const user = useGetUser();
  const products = useGetProducts();
  const cart = useAddToCart();
  const symbol = useGetCountryInfo(user?.data?.country as string);
  const currency = useGetCurrency(symbol.data?.iso_code);
  const price = currency?.data ? currency.data.toFixed(0) : 1;
  return (
    <div className="p-4">
      <h2
        className={
          cormorant.className + " text-xl font-bold uppercase p-2 md:px-24"
        }
      >
        Store Products
      </h2>
      <div className="flex flex-col gap-3 md:grid md:grid-cols-4 md:px-24 md:justify-center sm:grid sm:grid-cols-2">
        {products?.isLoading && <StackLoading />}
        {products?.data?.slice(0, 4).map((product) => {
          return (
            <Card
              key={product?.id}
              className="flex flex-col justify-between items-center p-3"
            >
              <CardContent className="flex flex-col justify-center items-center md:justify-between">
                <Image
                  className="w-48 h-48"
                  src={product.imageUrl}
                  alt={product.name}
                  width={100}
                  height={100}
                  loading="lazy"
                />
                <p className="text-center">{product.name}</p>
                <p className="flex flex-col text-center justify-between border">
                  {symbol.data?.symbol ? symbol.data.symbol : "$"}
                  {product.price * Number(price)}
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  disabled={!user.data}
                  onClick={() =>
                    cart.mutate({
                      email: user.data?.email as string,
                      ...product,
                      productId: product.id,
                      quantity: 1,
                    })
                  }
                  className="bg-blue-800"
                >
                  {cart.isPending ? <Loading /> : "Add to Cart"}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
