'use client';
import { IconSearch } from '../icons/icons';
import { ChangeEvent, FC } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const Search: FC = () => {
  const t = useTranslations('Header');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const locale = useLocale();

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('search', e.target.value);
    router.push(pathname + '?' + params.toString());
  };

  return (
    <div className="flex items-center justify-center">
      <input
        defaultValue={searchParams.get('search') || ''}
        type="text"
        className={`h-9 w-full md:w-[200px] ${locale === 'fa' ? 'rounded-r-sm' : 'rounded-l-sm'} bg-neutral-50 px-5 outline-none placeholder:text-xs`}
        placeholder={t('SearchPlaceholder')}
        onChange={(e) => searchHandler(e)}
      />
      <div
        className={`flex h-9 w-8 items-center justify-center ${locale === 'fa' ? 'rounded-l-sm' : 'rounded-r-sm'} bg-neutral-50 pt-1 ${locale === 'fa' ? 'pl-1' : 'pr-1'} text-black`}
      >
        <IconSearch />
      </div>
    </div>
  );
};
