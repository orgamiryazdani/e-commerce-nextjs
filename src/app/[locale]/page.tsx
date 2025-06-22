import { getTranslations } from 'next-intl/server';

export default async function Home() {
  const t = await getTranslations('HomePage');

  return (
    <div>
      <h1>{t('title')}</h1>
      <h2>{t('content')}</h2>
    </div>
  );
}
