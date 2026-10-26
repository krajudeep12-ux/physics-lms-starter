import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PhysicsPath | Learn. Practise. Improve.",
  description: "A starter Physics learning and online test platform for JEE and NEET preparation.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
