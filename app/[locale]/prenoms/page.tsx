// app/[locale]/prenoms/page.tsx
import Link from 'next/link';

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function PrenomsPage({ params }: Props) {
  const { locale } = await params; // 🔥 AJOUTER CETTE LIGNE
  
  const names = [
    { slug: 'marie', name: 'Marie' },
    { slug: 'jean', name: 'Jean' },
    { slug: 'pierre', name: 'Pierre' }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Liste des prénoms</h1>
      <div className="grid grid-cols-3 gap-4">
        {names.map((name) => (
          <Link
            key={name.slug}
            href={`/${locale}/prenoms/${name.slug}`} // 🔥 UTILISER locale AU LIEU DE params.locale
            className="p-4 border rounded hover:bg-gray-50"
          >
            {name.name}
          </Link>
        ))}
      </div>
    </div>
  );
}