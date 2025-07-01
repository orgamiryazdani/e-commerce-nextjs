import { routing } from '@/i18n/routing';
import './globals.css';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import { notFound } from 'next/navigation';
import { Header } from './_components/header';
import NextTopLoader from 'nextjs-toploader';

const inter = Inter({
  display: 'swap',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
});

const vazir = localFont({
  src: [
    {
      path: '../../../public/fonts/Vazirmatn-Thin.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Vazirmatn-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Vazirmatn-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Vazirmatn-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Vazirmatn-Black.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-vazir',
});

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html
      dir={locale === 'fa' ? 'rtl' : 'ltr'}
      lang={locale}
      className={`${inter.variable} ${vazir.variable}`}
    >
      <body className="flex items-center justify-center">
        <NextTopLoader showSpinner={false} color="var(--color-magenta-400)" />
        <div className="h-full w-full max-w-[1440px]">
          <NextIntlClientProvider>
            <Header />
            {children}
          </NextIntlClientProvider>
        </div>
      </body>
    </html>
  );
}
