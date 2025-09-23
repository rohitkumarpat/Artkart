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
                      <span className="bg-blue-500 text-white px-3 py-1 rounded-full cursor-pointer hover:bg-blue-600">
                        Home
                      </span>
                    </Link>
                    <Link href="/dashboard/s_dashboard">
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full cursor-pointer hover:bg-green-600">
                        Sell Product
                      </span>
                    </Link>
                  </nav>
                )}

                {role === "customer" && (
                  <nav className="flex gap-4">
                    <Link href="/dashboard/c_dashboard">
                      <span className="bg-purple-500 text-white px-3 py-1 rounded-full cursor-pointer hover:bg-purple-600">
                         Home
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
