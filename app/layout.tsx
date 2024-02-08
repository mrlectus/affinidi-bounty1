import "./globals.css";
import { Navbar } from "@/components/navbar";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import QueryProvider from "./provider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
});
/**
 * Root layout component.
 * Provides context providers and global app components.
 */

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <head>
        <meta
          http-equiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        ></meta>
      </head>
      <QueryProvider>
        <UserProvider>
          <body>
            <Navbar />
            {children}
            <ReactQueryDevtools
              initialIsOpen={false}
              buttonPosition="bottom-left"
            />
            <Toaster />
          </body>
        </UserProvider>
      </QueryProvider>
    </html>
  );
}
