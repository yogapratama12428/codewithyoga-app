import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/providers/toaster-provider";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "codewithyoga",
  description: "codewithyoga menyediakan kelas online bersertifikat dan komunitas untuk belajar skills IoT Developer dan coding yang dibimbing oleh mentor profesional, Bergabunglah bersama kami!",
  applicationName: 'Online Course',
  referrer: 'origin-when-cross-origin',
  authors: [ { name: 'Yoga Pratama Pangestu' }],
  creator: 'Yoga Pratama Pangestu',
  publisher: 'Codewithyoga',
  openGraph: {
    title: 'Online Course',
    description: 'codewithyoga menyediakan kelas online bersertifikat dan komunitas untuk belajar skills IoT Developer dan coding yang dibimbing oleh mentor profesional, Bergabunglah bersama kami!',
    url: 'https://codewithyoga.com',
    siteName: 'codewithyoga.com',
    locale: 'id_ID',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider />
        {children}
      </body>
    </html>
  );
}
