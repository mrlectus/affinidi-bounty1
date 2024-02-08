"use client";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "./ui/card";
import {
  useAddToCart,
  useGetCountryInfo,
  useGetCurrency,
  useGetProducts,
  useGetUser,
} from "@/app/hooks/hooks";
import { Button } from "./ui/button";
import { Loading } from "./loading";
import { cormorant } from "./product";

export const SuggestedProduct = () => {
  const user = useGetUser();
  const products = useGetProducts();
  const cart = useAddToCart();
  const symbol = useGetCountryInfo(user?.data?.country! as string);
  const currency = useGetCurrency(symbol.data?.iso_code);
  const price = currency?.data ? currency.data.toFixed(0) : 1;
  if (!user.data?.email) return null;
  return (
    <div>
      <h2
        className={
          cormorant.className + " text-xl font-bold uppercase p-2 md:px-24"
        }
      >
        Suggested Products for <span>{user.data.gender}s</span>
      </h2>
      <div className="flex flex-col gap-3 md:grid md:grid-cols-4 md:px-24 md:justify-center sm:grid sm:grid-cols-2">
        {products?.data
          ?.filter((item) => item.sex === user.data?.gender)
          ?.slice(2)
          .map((product) => {
            return (
              <Card
                key={product.id}
                className="flex flex-col justify-between items-center p-3"
              >
                <CardContent className="flex flex-col justify-center items-center md:justify-between">
                  <Image
                    className="w-48 h-48"
                    src={product.imageUrl}
                    alt={product.name}
                    width={150}
                    height={150}
                    loading="lazy"
                  />
                  <p>{product.name}</p>
                  <p>
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
