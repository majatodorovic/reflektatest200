import { CartContextProvider } from "./api/cartContext";
import Script from "next/script";
import Navigation from "@/components/Navigation/Navigation";
import NavigationMobile from "@/components/Navigation/NavigationMobile";
import Footer from "@/components/Footer/Footer";
import TopBar from "@/components/TopBar/TopBar";
import Credits from "@/components/Credits/Credits";
import { AppWrapper } from "../context/state";

import "/styles/globals.css";
import "keen-slider/keen-slider.min.css";
import "react-toastify/dist/ReactToastify.css";
import CookieAlert from "@/components/CookieAlert/CookieAlert";
import { UserProvider } from "@/context/userContext";
import { QueryProvider } from "@/_components/query-provider";

export const metadata = {
  title: "Reflekta - Početna",
  description:
    "Dobrodošli na online prodavnicu Reflekta. Ovde možete pronaći najveći asortiman vrhunskih svetiljki.",
  keywords: [
    "reflekta",
    "svetiljke",
    "svetiljka",
    "led",
    "led svetiljke",
    "led rasveta",
    "led rasveta srbija",
  ],
  openGraph: {
    type: "website",
    locale: "sr_RS",
    url: "https://reflekta.rs",
    title: "Reflekta",
    description:
      "Dobrodošli na online prodavnicu Reflekta. Ovde možete pronaći najveći asortiman vrhunskih svetiljki.",
    site_name: "Reflekta",
    images: [
      {
        url: "https://api.reflekta.rs/croonus-uploads/config/b2c/logo-9d36d2206a200637a491d22d319d390e.png",
        width: 800,
        height: 600,
        alt: "Reflekta",
        description:
          "Dobrodošli na online prodavnicu Reflekta. Ovde možete pronaći najveći asortiman vrhunskih svetiljki.",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          crossOrigin="anonymous"
          src="https://kit.fontawesome.com/f141ac3909.js"
        />{" "}
        <Script
          crossOrigin="anonymous"
          src="https://kit.fontawesome.com/9aea6cbcd7.js"
        />
      </head>
      <body className={`mx-auto bg-white`}>
        <QueryProvider>
          <UserProvider>
            <AppWrapper>
              <CartContextProvider>
                <Navigation />
                <CookieAlert />
                <NavigationMobile />
                {children}
                <Footer />
                <Credits />
              </CartContextProvider>
            </AppWrapper>
          </UserProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
