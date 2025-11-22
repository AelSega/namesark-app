// app/[locale]/prenoms/[slug]/page.tsx
import Link from 'next/link';

interface Props {
  params: Promise<{ locale: string }>;
}

// ← AJOUTER CETTE FONCTION
export function generateStaticParams() {
  return [
    { locale: 'fr' },
    { locale: 'en' }
  ];
}

/* export async function generateStaticParams() {
  const slugs = ['marie', 'jean', 'pierre'];
  const locales = ['fr', 'en'];
  
  return slugs.flatMap(slug => 
    locales.map(locale => ({ locale, slug }))
  );
} */

export default async function NamePage({ params }: Props) {
  const { locale } = await params;
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">Prénom: {locale}</h1>
      <p>Page pour le prénom {locale}</p>
    </div>
  );
}