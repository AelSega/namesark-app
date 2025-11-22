// app/[locale]/prenoms/[slug]/page.tsx
import { getNameBySlug, getNameStatistics } from '@/lib/db'; // Retire getAllNameSlugs
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';

// Génère toutes les pages statiquement
export async function generateStaticParams() {
  // SLUGS STATIQUES - PAS D'APPEL DB
  const slugs = [
    'marie', 'jean', 'pierre', 'anne', 'paul',
    'julie', 'thomas', 'camille', 'luc', 'sophie'
  ];
  
  const locales = ['fr', 'en'];
  
  return slugs.flatMap(slug => 
    locales.map(locale => ({
      locale,
      slug
    }))
  );
}

// Le reste du fichier reste IDENTIQUE...