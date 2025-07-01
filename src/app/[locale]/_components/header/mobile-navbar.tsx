'use client';
import { FC, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const MobileNavbar: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();

  return (
    <div className="md:hidden">
      <motion.nav initial={false} animate={isOpen ? 'open' : 'closed'}>
        <motion.div
          className={`absolute top-0 bottom-0 ${locale === 'en' ? 'left-0' : 'right-0'} w-72 bg-neutral-100`}
          variants={sidebarVariants(locale)}
          animate={isOpen ? 'open' : 'closed'}
          custom={1000}
          initial="closed"
        />
        <Navigation toggle={() => setIsOpen(!isOpen)} />
        <MenuToggle toggle={() => setIsOpen(!isOpen)} />
      </motion.nav>
    </div>
  );
};

const navVariants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const Navigation = ({ toggle }: { toggle: () => void }) => {
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
    <motion.ul
      className={`absolute top-20 ${locale === 'en' ? 'left-8' : 'right-8'} flex flex-col gap-y-7 pt-8`}
      variants={navVariants}
    >
      {NavbarItems.map(({ id, title, href }) => (
        <motion.li
          key={id}
          onClick={toggle}
          className={`w-fit cursor-pointer rounded-sm ${href === pathname ? 'text-base font-bold text-neutral-400' : 'text-sm text-neutral-300'}`}
          variants={itemVariants}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link className="w-full" href={href}>
            {title}
          </Link>
        </motion.li>
      ))}
    </motion.ul>
  );
};

const itemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const sidebarVariants = (locale: string) =>
  ({
    open: (custom = 1000) => ({
      clipPath:
        locale === 'en'
          ? `circle(${custom * 2 + 200}px at 40px 40px)`
          : `circle(${custom * 2 + 200}px at calc(100% - 400px) 400px)`,
      transition: {
        type: 'spring' as const,
        stiffness: 20,
        restDelta: 2,
      },
    }),
    closed: {
      clipPath:
        locale === 'en' ? 'circle(0px at 25px 65px)' : 'circle(0px at calc(100% - 25px) 65px)',
      transition: {
        delay: 0.2,
        type: 'spring' as const,
        stiffness: 400,
        damping: 40,
      },
    },
  }) as Variants;

interface PathProps {
  d?: string;
  variants: Variants;
  transition?: { duration: number };
}

const Path = (props: PathProps) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
);

const MenuToggle = ({ toggle }: { toggle: () => void }) => {
  const locale = useLocale();

  return (
    <button
      className={`absolute top-12 ${locale === 'en' ? 'left-4' : 'right-4'} h-12 w-12 cursor-pointer bg-transparent`}
      onClick={toggle}
    >
      <svg width="23" height="23" viewBox="0 0 23 23">
        <Path
          variants={{
            closed: { d: 'M 2 2.5 L 20 2.5' },
            open: { d: 'M 3 16.5 L 17 2.5' },
          }}
        />
        <Path
          d="M 2 9.423 L 20 9.423"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          transition={{ duration: 0.1 }}
        />
        <Path
          variants={{
            closed: { d: 'M 2 16.346 L 20 16.346' },
            open: { d: 'M 3 2.5 L 17 16.346' },
          }}
        />
      </svg>
    </button>
  );
};
