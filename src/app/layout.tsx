import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/Navigation";

export const metadata: Metadata = {
  title: "Mother's Day Tribute",
  description: "Create a beautiful digital keepsake for your mother.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-background text-on-background font-body-md min-h-screen">
        <Navigation />
        {children}
      </body>
    </html>
  );
}
