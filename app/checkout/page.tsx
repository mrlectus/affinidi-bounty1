"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useClearCart, useGetUser, useSendEmail } from "../hooks/hooks";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/loading";

const CheckoutPage = () => {
  const user = useGetUser();
  const clear = useClearCart();
  const send = useSendEmail();
  return (
    <>
      <div className="flex justify-center mt-4 text-xl font-bold md:px-24">
        <h2>Checkout</h2>
      </div>
      <div className="p-4 md:px-[200px] lg:px-[400px]">
        <form>
          <div className="p-2">
            <Label>First Name</Label>
            <Input
              defaultValue={user.data?.givenName}
              className="ring-0 outline-none mt-2 rounded-md border-2 border-black"
            />
          </div>
          <div className="p-2">
            <Label>Last Name</Label>
            <Input
              defaultValue={user.data?.familyName}
              className="ring-0 outline-none mt-2 rounded-md border-2 border-black"
            />
          </div>
          <div className="p-2">
            <Label>Email</Label>
            <Input
              defaultValue={user.data?.email}
              className="ring-0 outline-none mt-2 rounded-md border-2 border-black"
            />
          </div>
          <div className="p-2">
            <Label>Phone Number</Label>
            <Input
              defaultValue={user.data?.phone}
              className="ring-0 outline-none mt-2 rounded-md border-2 border-black"
            />
          </div>
          <div className="p-2">
            <Label>Address</Label>
            <Input
              defaultValue={user.data?.address}
              className="ring-0 outline-none mt-2 rounded-md border-2 border-black"
            />
          </div>
          <div className="p-2">
            <Label>Postal Code</Label>
            <Input
              defaultValue={user.data?.postalCode}
              className="ring-0 outline-none mt-2 rounded-md border-2 border-black"
            />
          </div>
          <div className="p-2">
            <Label>City</Label>
            <Input
              defaultValue={user.data?.city}
              className="ring-0 outline-none mt-2 rounded-md border-2 border-black"
            />
          </div>
          <div className="p-2">
            <Label>Country</Label>
            <Input
              defaultValue={user.data?.country}
              className="ring-0 outline-none mt-2 rounded-md border-2 border-black"
            />
          </div>
          <div>
            <Button
              onClick={() => {
                clear.mutate({ email: user.data?.email as string });
                send.mutate({
                  email: user.data?.email as string,
                  message: "Hello, Your items are on the way",
                });
              }}
              className="bg-blue-600 w-full"
            >
              {clear.isPending || send.isPending ? <Loading /> : "Checkout"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CheckoutPage;
