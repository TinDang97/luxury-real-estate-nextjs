import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "@/app/globals.css"; // Fixed path after move
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProgressBar from "@/components/ui/ProgressBar";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from "next/navigation";

const montserrat = Montserrat({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "VN Luxury Realty | Bất Động Sản Cao Cấp Việt Nam",
  description: "Chuyên trang giới thiệu các dự án bất động sản hạng sang, biệt thự và căn hộ cao cấp tại Việt Nam.",
};

export function generateStaticParams() {
  return [{locale: 'en'}, {locale: 'vn'}, {locale: 'ko'}];
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const { locale } = await params;
  
  // Ensure that the incoming `locale` is valid
  if (!['en', 'vn', 'ko'].includes(locale)) {
    notFound();
  }
 
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  // Fetch recent projects for the header dropdown
  const { client } = await import('@/sanity/lib/client');
  const { recentProjectsQuery } = await import('@/sanity/lib/queries');
  const recentProjects = await client.fetch(recentProjectsQuery, { language: locale });
 
  return (
    <html lang={locale} className={`${montserrat.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          <ProgressBar />
          <ScrollReveal />
          <Header recentProjects={recentProjects} />
            <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
