// app/[locale]/prenoms/page.tsx
import Link from 'next/link';

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function PrenomsIndex({ params }: Props) {
  const { locale } = await params;
  
  // Données mock pour tester
  const popularNames = [
    { slug: 'marie', name_display: 'Marie' },
    { slug: 'jean', name_display: 'Jean' },
    { slug: 'pierre', name_display: 'Pierre' },
    { slug: 'anne', name_display: 'Anne' },
    { slug: 'paul', name_display: 'Paul' },
    { slug: 'julie', name_display: 'Julie' },
    { slug: 'thomas', name_display: 'Thomas' },
    { slug: 'camille', name_display: 'Camille' }
  ];
  
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Prénoms populaires</h1>
      
      <div className="bg-blue-50 border border-blue-200 p-4 rounded mb-6">
        <p className="text-blue-800">
          💡 Mode démonstration - {popularNames.length} prénoms d exemple
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {popularNames.map(name => (
          <Link 
            key={name.slug} 
            href={`/${locale}/prenoms/${name.slug}`}
            className="p-4 border rounded hover:bg-gray-50 transition-colors"
          >
            <div className="font-medium">{name.name_display}</div>
            <div className="text-sm text-gray-500 mt-1">Voir les détails</div>
          </Link>
        ))}
      </div>
    </div>
  );
}