import { Prisma } from "@prisma/client";
import { Record } from "@prisma/client/runtime/library";
import { TCart } from "../api/cart/route";

/**
 * Gets user profile information from the auth API and returns formatted user data.
 * Makes a GET request to the /api/auth/me endpoint to get the user's profile.
 * Maps over the profile records to extract specific fields into a formatted object.
 * Returns object with nickname, email, name, picture, and other profile fields.
 */
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
  const familyName = user
    ?.map((p) => p.familyName)
    .filter((p) => p !== undefined)[0];
  const phone = user
    ?.map((p) => p.phoneNumber)
    .filter((p) => p !== undefined)[0];
  const address = user
    ?.map((p) => p.streetAddress)
    .filter((p) => p !== undefined)[0];
  const postalCode = user
    ?.map((p) => p.postalCode)
    .filter((p) => p !== undefined)[0];
  const city = user?.map((p) => p.locality).filter((p) => p !== undefined)[0];

  return {
    nickname,
    email,
    givenName,
    picture,
    country,
    gender,
    familyName,
    phone,
    address,
    postalCode,
    city,
  };
};

export type TProduct = Prisma.ProductGetPayload<{}>;

/**
 * Fetches products from the API and returns them sorted by ID.
 */
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

/**
 * Adds a product to the cart.
 *
 * @param param0 - The cart item details.
 * @param param0.name - The product name.
 * @param param0.price - The product price.
 * @param param0.sex - The product sex.
 * @param param0.imageUrl - The product image URL.
 * @param param0.quantity - The quantity to add.
 * @param param0.email - The user's email.
 * @param param0.productId - The product ID.
 *
 * @returns The updated cart data.
 */
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

/**
 * Sends an email via the API.
 *
 * @param message - The message text to send in the email.
 * @param email - The recipient email address.
 *
 * @returns The API response.
 */
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

/**
 * Fetches country currency information from OpenCage Geocoding API.
 *
 * @param country - The country name to lookup currency info for
 * @returns The ISO code and symbol for the given country's currency
 * @throws Error on failed API response
 */
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
    throw error;
  }
};

/**
 * Gets currency information from external API
 */

export const getCurrency = async (symbol: string) => {
  const response = await fetch(
    `https://mrlectus-stackup-6cd355c4b177.herokuapp.com/exchange`
  );
  const data = await response.json();
  return data.rates[symbol] as number;
};

export type TCartFull = Prisma.CartGetPayload<{}>;

/**
 * Gets cart data for a user from the API by email.
 */
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

/**
 * Deletes a cart by ID from the API
 */
export const deleteCart = async (id: number) => {
  const response = await fetch(`/api/cart/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = (await response.json()) as { message: string };
  return data;
};

/**
 * Updates cart quantity by cart ID
 */

export const updateCartByID = async ({
  id,
  quantity,
}: {
  id: number;
  quantity: number;
}) => {
  const response = await fetch(`/api/cart/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ quantity }),
  });
  const data = (await response.json()) as { message: string };
  return data;
};

/**
 * Deletes all cart items for a user
 */

export const deleteAllCart = async ({ email }: { email: string }) => {
  const response = await fetch("/api/checkout", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  const data = (await response.json()) as { message: string };
  return data;
};
