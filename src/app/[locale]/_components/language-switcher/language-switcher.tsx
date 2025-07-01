'use client';
import { useLocale, useTranslations } from 'next-intl';
import { IconArrowDown } from '../icons/icons';
import { FC, useState, useTransition } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useParams, useSearchParams } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import { Loading } from '../loading';

type Language = 'fa' | 'en';

export const LanguageSwitcher: FC = () => {
  const t = useTranslations('Header');
  const [modal, setModal] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();
  const locale = useLocale();

  const changeLanguageHandler = (language: Language) => {
    setModal(false);
    const queryString = searchParams.toString();
    const fullPath = pathname + (queryString.length > 0 ? `?${queryString}` : '');
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        { pathname: fullPath, params },
        { locale: language },
      );
    });
  };

  return (
    <>
      {isPending && (
        <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center bg-black/20">
          <Loading />
        </div>
      )}
      <div className="relative col-start-10 col-end-12 md:col-start-11">
        <div onClick={() => setModal(!modal)} className="container cursor-pointer gap-x-1.5">
          <span>{t('language')}</span>
          <IconArrowDown className="h-8 w-8 pt-1.5" fill="white" />
        </div>
        <AnimatePresence initial={false}>
          {modal && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 3.5 }}
              exit={{ opacity: 0, y: -5 }}
              key="box"
              className={`absolute top-7 ${locale === 'en' ? 'right-0' : 'left-0'} flex w-28 cursor-pointer flex-col rounded-sm bg-neutral-600 p-1 [&>*]:rounded-sm [&>*]:p-1 [&>*]:transition-all [&>*]:duration-200 [&>*]:ease-in [&>*]:hover:bg-neutral-200 [&>*]:hover:text-black`}
            >
              <span onClick={() => changeLanguageHandler('fa')}>{t('languageFA')}</span>
              <span onClick={() => changeLanguageHandler('en')}>{t('languageEN')}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
