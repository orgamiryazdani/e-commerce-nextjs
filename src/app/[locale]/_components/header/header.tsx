import { getLocale, getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { FC } from 'react';
import { Search } from '../search';
import { LanguageSwitcher } from '../language-switcher';
import { DesktopNavbar } from './desktop-navbar';
import { MobileNavbar } from './mobile-navbar';

export const Header: FC = async () => {
  const t = await getTranslations('Header');
  const locale = await getLocale();

  return (
    <header className="text-[10px] text-white lg:text-sm">
      {/* offer and change language section */}
      <section className="grid h-12 grid-cols-12 items-center justify-center bg-black">
        <div className="col-start-2 col-end-10 items-center justify-center md:col-start-4 md:flex">
          {t('offer')}
          <Link href="/products" className="mx-2 border-b font-semibold">
            {t('ShopNow')}
          </Link>
        </div>
        <LanguageSwitcher />
      </section>
      {/* menu and search section */}
      <section className="flex h-[94px] items-center justify-center border-b border-black/30 text-black">
        <div className="flex h-full w-full max-w-[1170px] flex-col justify-between px-3 pt-[7px] pb-3 md:mt-5 md:h-10 md:flex-row md:items-center xl:px-0">
          <h1 className={`${locale === 'en' ? 'ml-10' : 'mr-10'} text-2xl font-bold`}>
            {t('ShopName')}
          </h1>
          <DesktopNavbar />
          <MobileNavbar />
          <Search />
        </div>
      </section>
    </header>
  );
};
