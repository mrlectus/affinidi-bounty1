import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  TCartFull,
  addToCart,
  deleteAllCart,
  deleteCart,
  getCart,
  getCountryInfo,
  getCurrency,
  getProducts,
  getUserInfo,
  sendEmail,
  updateCartByID,
} from "../service/api";
import { TCart } from "../api/cart/route";
import toast from "react-hot-toast";
import { Record } from "@prisma/client/runtime/library";

/**
 * Fetches user info from the API.
 */

export const useGetUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUserInfo,
  });
};

/**
 * Fetches product data from the API.
 */

export const useGetProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
};

/**
 * Adds a product to the cart.
 */

export const useAddToCart = () => {
  return useMutation({
    mutationKey: ["add-cart"],
    mutationFn: ({
      name,
      price,
      sex,
      imageUrl,
      quantity,
      email,
      productId,
    }: TCart) =>
      addToCart({
        name,
        price,
        sex,
        imageUrl,
        quantity,
        email,
        productId,
      }),
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

/**
 * Fetches country info from the API.
 * @param country - The country code to fetch info for.
 */

export const useGetCountryInfo = (country: string) => {
  return useQuery({
    queryKey: ["country", country],
    queryFn: () => getCountryInfo(country),
    enabled: !!country,
  });
};

/**
 * Fetches currency information.
 */

export const useGetCurrency = (currency: string) => {
  return useQuery({
    queryKey: ["currency", currency],
    queryFn: () => getCurrency(currency),
    enabled: !!currency,
  });
};

/**
 * Fetches the cart for the given email address.
 *
 * @param email - The email address to fetch the cart for.
 */
export const useGetCart = (email: string) => {
  return useQuery({
    queryKey: ["get-cart"],
    queryFn: () => getCart(email),
    enabled: !!email,
  });
};

/**
 * A React Hook that provides a mutation to delete the cart for the logged in user.
 *
 * On mutate, it will:
 * - Cancel any existing cart queries to ensure consistent data.
 * - Get the previous cart data and set it as the new data temporarily.
 *
 * On success, it will:
 * - Show a success toast notification with the response message.
 *
 * On error, it will:
 * - Show an error toast notification.
 * - Rollback to the previous cart data.
 *
 * On settle, it will:
 * - Invalidates any existing cart queries to force a refetch.
 */
export const useDeleteCart = () => {
  const client = useQueryClient();
  return useMutation({
    mutationKey: ["delete-cart"],
    mutationFn: (id: number) => deleteCart(id),
    onMutate: async (newCart) => {
      await client.cancelQueries({
        queryKey: ["get-cart"],
      });
      const previousCart = client.getQueryData(["get-cart"]);
      client.setQueryData(["get-cart"], (prev: TCartFull[]) =>
        prev.filter((item) => item.id !== newCart)
      );
      return { previousCart, newCart };
    },
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (_err, _newCart, context) => {
      toast.error("Error deleting item from cart");
      client.setQueryData(
        ["get-cart", context?.newCart],
        context?.previousCart
      );
    },
    onSettled: () => {
      client.invalidateQueries({
        queryKey: ["get-cart"],
      });
    },
  });
};

/**
 * A React Hook that provides a mutation to update the cart quantity for a specific cart item.
 *
 * On mutate, it will:
 * - Invalidate any existing cart queries to ensure consistent data.
 *
 * On settle, it will:
 * - Refetch the cart data.
 */
export const useUpdateCartByID = () => {
  const client = useQueryClient();
  return useMutation({
    mutationKey: ["update-cart"],
    mutationFn: ({ id, quantity }: { id: number; quantity: number }) =>
      updateCartByID({ id, quantity }),
    onSettled: async () => {
      return await client.invalidateQueries({
        queryKey: ["get-cart"],
      });
    },
  });
};

/**
 * A React Hook that provides a mutation to clear the cart.
 *
 * On mutate, it will:
 * - Delete all cart items for the given email address.
 */
export const useClearCart = () => {
  return useMutation({
    mutationKey: ["clear-cart"],
    mutationFn: ({ email }: { email: string }) => deleteAllCart({ email }),
  });
};

/**
 * A React Hook that provides a mutation for sending an email.
 *
 * On mutate, it will:
 * - Send an email with the provided message and email address.
 *
 * On success, it will:
 * - Display a success toast notification with the response message.
 */
export const useSendEmail = () => {
  return useMutation({
    mutationKey: ["send-email"],
    mutationFn: ({ message, email }: Record<string, string>) =>
      sendEmail({ message, email }),
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: () => {
      toast.success("mail is on it's way");
    },
  });
};
