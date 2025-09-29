import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { prismaclient } from "@/lib/db";
import Link from "next/link";
import { Home, ShoppingCart, Package, Info } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ArtKart Dashboard",
  description: "Dashboard layout with role-based navigation",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = await currentUser();
  if (!user) return null;

  const dbuser = await prismaclient.user.findUnique({
    where: { clerkId: user.id },
    select: { role: true },
  });

  const role = dbuser?.role;

  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <header className="flex justify-between items-center w-full px-6 h-16 border-b">
            <SignedOut>
              <div className="flex gap-4">
                <SignInButton />
                <SignUpButton />
              </div>
            </SignedOut>

            <SignedIn>
              <div className="flex-1 flex justify-center">
                {/* Seller Navigation */}
                {role === "seller" && (
                  <nav className="flex gap-6">
                    <Link href="/dashboard/s_dashboard/viewproduct">
                      <span className="flex items-center gap-2 px-5 py-2 rounded-lg bg-white/10 text-white font-semibold shadow-md backdrop-blur-sm hover:bg-white/30 hover:scale-105 transition transform duration-300">
                        <Home size={18} />
                        Home
                      </span>
                    </Link>
                    <Link href="/dashboard/s_dashboard">
                      <span className="flex items-center gap-2 px-5 py-2 rounded-lg bg-white/10 text-white font-semibold shadow-md backdrop-blur-sm hover:bg-white/30 hover:scale-105 transition transform duration-300">
                        ➕ Sell Product
                      </span>
                    </Link>
                  </nav>
                )}

                {/* Customer Navigation */}
                {role === "customer" && (
                  <nav className="flex gap-6">
                    <Link href="/dashboard/c_dashboard">
                      <span className="flex items-center gap-2 px-5 py-2 rounded-lg bg-white/10 text-white font-semibold shadow-md backdrop-blur-sm hover:bg-white/30 hover:scale-105 transition transform duration-300">
                        <Home size={18} />
                        Home
                      </span>
                    </Link>

                    <Link href="/dashboard/c_dashboard/my_cart">
                      <span className="flex items-center gap-2 px-5 py-2 rounded-lg bg-white/10 text-white font-semibold shadow-md backdrop-blur-sm hover:bg-white/30 hover:scale-105 transition transform duration-300">
                        <ShoppingCart size={18} />
                        My Cart
                      </span>
                    </Link>

                    <Link href="/dashboard/c_dashboard/order">
                      <span className="flex items-center gap-2 px-5 py-2 rounded-lg bg-white/10 text-white font-semibold shadow-md backdrop-blur-sm hover:bg-white/30 hover:scale-105 transition transform duration-300">
                        <Package size={18} />
                        Orders
                      </span>
                    </Link>

                    <Link href="/dashboard/about">
                      <span className="flex items-center gap-2 px-5 py-2 rounded-lg bg-white/10 text-white font-semibold shadow-md backdrop-blur-sm hover:bg-white/30 hover:scale-105 transition transform duration-300">
                        <Info size={18} />
                        About
                      </span>
                    </Link>
                  </nav>
                )}
              </div>

              <div className="flex justify-end">
                <UserButton />
              </div>
            </SignedIn>
          </header>

          {/* Main content */}
          <main>{children}</main>

          {/* Footer */}
          <footer className="text-center text-xs text-gray-400 py-4">
            © {new Date().getFullYear()} ArtKart. All rights reserved.
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
