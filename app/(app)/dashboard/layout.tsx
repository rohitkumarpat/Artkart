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
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <header className="flex justify-between items-center w-full px-6 h-16 border-b">   
            <SignedOut>
                <SignInButton />
                <SignUpButton>
                </SignUpButton>
            </SignedOut>

            <SignedIn>
              <div className="flex-1 flex justify-center">
                {role === "seller" && (
                  <nav className="flex gap-4">
                    <Link href="/dashboard/s_dashboard/viewproduct">
                      <span className="px-5 py-2 rounded-lg bg-white/10 text-white font-semibold shadow-md backdrop-blur-sm hover:bg-white/30 hover:scale-105 transition transform duration-300">
                        Home
                      </span>
                    </Link>
                    <Link href="/dashboard/s_dashboard">
                      <span className="px-5 py-2 rounded-lg bg-white/10 text-white font-semibold shadow-md backdrop-blur-sm hover:bg-white/30 hover:scale-105 transition transform duration-300">
                        Sell Product
                      </span>
                    </Link>
                  </nav>
                )}

                {role === "customer" && (
                  <nav className="flex gap-8">
                    <Link href="/dashboard/c_dashboard">
                      <span className="px-5 py-2 rounded-lg bg-white/10 text-white font-semibold shadow-md backdrop-blur-sm hover:bg-white/30 hover:scale-105 transition transform duration-300">
                         Home
                      </span>
                    </Link>

                    <Link href="/dashboard/c_dashboard/my_cart">
                      <span className="px-5 py-2 rounded-lg bg-white/10 text-white font-semibold shadow-md backdrop-blur-sm hover:bg-white/30 hover:scale-105 transition transform duration-300">
                         Mycart
                      </span>
                    </Link>

                    <Link href="/dashboard/c_dashboard/order">
                      <span className="px-5 py-2 rounded-lg bg-white/10 text-white font-semibold shadow-md backdrop-blur-sm hover:bg-white/30 hover:scale-105 transition transform duration-300">
                         Order
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
          <footer></footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
