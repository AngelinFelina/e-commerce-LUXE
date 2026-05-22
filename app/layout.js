import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartSidebar from "./components/CartSidebar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata = {
  title: "LUXE — Premium E-Commerce",
  description: "Discover curated premium products. Elevate your lifestyle with LUXE — your destination for exclusive fashion, electronics, and more.",
  keywords: "luxury, fashion, electronics, premium, shop, e-commerce",
  openGraph: {
    title: "LUXE — Premium E-Commerce",
    description: "Discover curated premium products.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <CartProvider>
          <WishlistProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <CartSidebar />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
