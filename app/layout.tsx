import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import ConvexClientProvider from "./(components)/ConvexClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Outfit Builder",
  description: "Build and share outfits with your friends!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConvexClientProvider>
      <html lang="en">
        <body className={inter.className}>
          <header className="flex items-center p-4 shadow-md shadow-violet-300 rounded-b-xl bg-violet-800">
            <Link href="/">
              <h1 className="text-2xl font-bold">Outfit Builder</h1>
            </Link>
            <Link href="/create">
              <h1 className="text-2xl ml-4">Create</h1>
            </Link>
          </header>
          <div className="p-2">{children}</div>
        </body>
      </html>
    </ConvexClientProvider>
  );
}
