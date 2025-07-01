'use client';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { FC } from 'react';

export const DesktopNavbar: FC = () => {
  const t = useTranslations('Header');
  const locale = useLocale();
  const pathname = usePathname();

  const NavbarItems = [
    { id: 1, title: t('Home'), href: `/${locale}` },
    { id: 2, title: t('Contact'), href: `/${locale}/contact` },
    { id: 3, title: t('About'), href: `/${locale}/about` },
    { id: 4, title: t('SignUp'), href: `/${locale}/signup` },
  ] as const;

  return (
    <div className="relative hidden items-center justify-center gap-12 text-base text-black md:flex">
      {NavbarItems.map(({ id, title, href }) => {
        const isActive = pathname === href;

        return (
          <Link key={id} href={href} className="relative">
            <span className="relative">{title}</span>
            {isActive && (
              <motion.div
                layoutId="underline"
                className="absolute right-0 bottom-0 left-0 h-[1px] bg-neutral-300"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
          </Link>
        );
      })}
    </div>
  );
};
