import type { Metadata } from "next";
import "./global.css";

export const metadata: Metadata = {
  title: "TMP Internal System",
  description: "Sistem Internal Taman Makam Pahlawan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

