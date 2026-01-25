import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProgressBar from "@/components/ui/ProgressBar";
import ScrollReveal from "@/components/ui/ScrollReveal";

const montserrat = Montserrat({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "VN Luxury Realty | Bất Động Sản Cao Cấp Việt Nam",
  description: "Chuyên trang giới thiệu các dự án bất động sản hạng sang, biệt thự và căn hộ cao cấp tại Việt Nam.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${montserrat.variable} scroll-smooth`}>
      <body className="antialiased">
        <ProgressBar />
        <ScrollReveal />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
