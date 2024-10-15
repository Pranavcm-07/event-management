import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import AuthProvider from "./context/AuthProvider";
import Script from "next/script";

const poppins = Poppins({ subsets: ["latin"] ,weight: ["400","500","600","700",'800',"900"],variable:'--font-poppins'});

export const metadata: Metadata = {
  title: "NexEvent",
  description: "NexEvent is a platform for hosting and attending events.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <html lang="en">
      <body className={poppins.variable}>
        <AuthProvider>
        {children}
        </AuthProvider>
      </body>
    </html>
    <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
    </>
  );
}
