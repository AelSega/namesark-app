// app/[locale]/page.tsx
import Link from 'next/link';

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params; // ← AJOUTER
  
  const featuredNames = [
    { name: 'Marie', slug: 'marie', gender: 'F' },
    { name: 'Jean', slug: 'jean', gender: 'M' },
    { name: 'Pierre', slug: 'pierre', gender: 'M' },
    { name: 'Anne', slug: 'anne', gender: 'F' },
    { name: 'Paul', slug: 'paul', gender: 'M' },
    { name: 'Julie', slug: 'julie', gender: 'F' }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">
        {locale === 'fr' ? 'Bienvenue sur NamesArk' : 'Welcome to NamesArk'}
      </h1>
      
      <p className="text-xl text-gray-600 text-center mb-8">
        {locale === 'fr' 
          ? 'Découvrez l\'origine et les statistiques des prénoms' 
          : 'Discover the origin and statistics of names'}
      </p>

      <div className="bg-blue-50 border border-blue-200 p-4 rounded mb-8">
        <p className="text-blue-800 text-center">
          {locale === 'fr'
            ? '🎯 Prénoms les plus populaires'
            : '🎯 Most popular names'}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {featuredNames.map(name => (
          <Link 
            key={name.slug} 
            href={`/${locale}/prenoms/${name.slug}`}
            className="p-4 border rounded-lg hover:bg-gray-50 transition-colors text-center"
          >
            <div className="font-medium text-lg">{name.name}</div>
            <div className="text-sm text-gray-500 mt-1">
              {name.gender === 'M' ? '♂' : '♀'}
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center">
        <Link 
          href={`/${locale}/prenoms`}
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {locale === 'fr' 
            ? 'Voir tous les prénoms →' 
            : 'See all names →'}
        </Link>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center p-4">
          <div className="text-2xl mb-2">📊</div>
          <h3 className="font-semibold mb-2">
            {locale === 'fr' ? 'Statistiques' : 'Statistics'}
          </h3>
          <p className="text-gray-600">
            {locale === 'fr' 
              ? 'Données complètes sur la popularité des prénoms' 
              : 'Complete data on name popularity'}
          </p>
        </div>

        <div className="text-center p-4">
          <div className="text-2xl mb-2">📚</div>
          <h3 className="font-semibold mb-2">
            {locale === 'fr' ? 'Étymologie' : 'Etymology'}
          </h3>
          <p className="text-gray-600">
            {locale === 'fr' 
              ? 'Origine et signification des prénoms' 
              : 'Origin and meaning of names'}
          </p>
        </div>

        <div className="text-center p-4">
          <div className="text-2xl mb-2">🌍</div>
          <h3 className="font-semibold mb-2">
            {locale === 'fr' ? 'International' : 'International'}
          </h3>
          <p className="text-gray-600">
            {locale === 'fr' 
              ? 'Prénoms de différentes cultures' 
              : 'Names from different cultures'}
          </p>
        </div>
      </div>
    </div>
  );
}