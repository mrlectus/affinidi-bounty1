import { Prisma } from "@prisma/client";
import { Record } from "@prisma/client/runtime/library";
import { TCart } from "../api/cart/route";

export const getUserInfo = async () => {
  const response = await fetch("/api/auth/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  const user: Array<Record<string, string | string[]>> = data?.profile;
  const nickname = user
    ?.map((p) => p.nickname)
    .filter((p) => p !== undefined)[0];
  const email = user?.map((p) => p.email).filter((p) => p !== undefined)[0];
  const givenName = user
    ?.map((p) => p.givenName)
    .filter((p) => p !== undefined)[0];
  const picture = user?.map((p) => p.picture).filter((p) => p !== undefined)[0];
  const gender = user?.map((p) => p.gender).filter((p) => p !== undefined)[0];
  const country = user?.map((p) => p.country).filter((p) => p !== undefined)[0];
  return { nickname, email, givenName, picture, country, gender };
};

export type TProduct = Prisma.ProductGetPayload<{}>;
export const getProducts = async () => {
  const response = await fetch("/api/products", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data.sort(
    (a: { id: number }, b: { id: number }) => a.id - b.id
  ) as TProduct[];
};

export const addToCart = async ({
  name,
  price,
  sex,
  imageUrl,
  quantity,
  email,
  productId,
}: TCart) => {
  const response = await fetch("/api/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      price,
      sex,
      imageUrl,
      quantity,
      email,
      productId,
    }),
  });
  const data = await response.json();
  return data;
};

export const sendEmail = async ({ message, email }: Record<string, string>) => {
  const response = await fetch(
    `https://mrlectus-stackup-6cd355c4b177.herokuapp.com/send`,
    {
      method: "POST",
      body: JSON.stringify({ message, email }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data;
};

export const getCountryInfo = async (country: string) => {
  try {
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${country}&limit=1&address_only=1&key=${process.env.NEXT_PUBLIC_GEO_SECRET}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    const currency = data.results[0].annotations.currency;
    return {
      iso_code: currency.iso_code,
      symbol: currency.symbol,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getCurrency = async (symbol: string) => {
  const response = await fetch(
    `http://api.exchangeratesapi.io/v1/latest?access_key=${process.env.NEXT_PUBLIC_CAPI}&base=EUR`
  );
  const data = await response.json();
  return data.rates[symbol] as number;
};

export type TCartFull = Prisma.CartGetPayload<{}>;
export const getCart = async (email: string) => {
  const response = await fetch(`/api/cart/${email}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = (await response.json()) as TCartFull[];
  return data;
};
