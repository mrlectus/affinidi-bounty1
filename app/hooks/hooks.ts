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
 * Adds a product to the cart.
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

export const useGetCart = (email: string) => {
  return useQuery({
    queryKey: ["get-cart"],
    queryFn: () => getCart(email),
    enabled: !!email,
  });
};

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

export const useClearCart = () => {
  const client = useQueryClient();
  return useMutation({
    mutationKey: ["clear-cart"],
    mutationFn: ({ email }: { email: string }) => deleteAllCart({ email }),
    onSettled: () => {
      client.invalidateQueries({
        queryKey: ["get-cart"],
      });
    },
  });
};

export const useSendEmail = () => {
  return useMutation({
    mutationKey: ["send-email"],
    mutationFn: ({ message, email }: Record<string, string>) =>
      sendEmail({ message, email }),
    onSuccess: (data) => {
      toast.success(data.message);
    },
  });
};
