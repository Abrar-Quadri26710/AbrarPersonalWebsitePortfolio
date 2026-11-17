import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: "Abrar Quadri — Software Engineer | Full-Stack, Networking & Security",
  description: "Personal portfolio of Abrar Quadri. Software Engineer with a focus on full-stack web applications, distributed systems, and interests in networking and cybersecurity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={plusJakarta.variable}>
      <body className="font-sans antialiased bg-[#030605] text-neutral-200 overflow-x-hidden" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
