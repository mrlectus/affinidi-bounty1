import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addToCart,
  getCart,
  getCountryInfo,
  getCurrency,
  getProducts,
  getUserInfo,
} from "../service/api";
import { TCart } from "../api/cart/route";
import toast from "react-hot-toast";

export const useGetUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUserInfo,
  });
};

export const useGetProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
};

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

export const useGetCountryInfo = (country: string) => {
  return useQuery({
    queryKey: ["country"],
    queryFn: () => getCountryInfo(country),
    enabled: !!country,
  });
};

export const useGetCurrency = (currency: string) => {
  return useQuery({
    queryKey: ["currency"],
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
