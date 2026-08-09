import type { Metadata } from "next";
import "./globals.css";
import StyledComponentsRegistry from "../lib/registry";

export const metadata: Metadata = {
  title: "K.Sushi | Cerritos, CA",
  description: "K.Sushi is a family-owned sushi restaurant in Cerritos, CA, serving fresh rolls, sushi, and Korean-inspired specialties. View our menu and order online.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}