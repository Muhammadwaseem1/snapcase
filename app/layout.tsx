import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "snapcase — text case converter",
  description:
    "Convert any text into camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE and 10+ more formats. Fast, offline, copy in one click.",
  openGraph: {
    title: "snapcase",
    description:
      "Convert any text into camelCase, snake_case, kebab-case and 13+ more formats.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
