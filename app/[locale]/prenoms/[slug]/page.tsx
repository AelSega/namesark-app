// app/[locale]/prenoms/[slug]/page.tsx
import { getNameBySlug, getNameStatistics } from '@/lib/db';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

// Génère seulement quelques pages de test SANS appel DB
export async function generateStaticParams() {
  const testSlugs = ['marie', 'jean', 'pierre', 'anne', 'paul'];
  const locales = ['fr', 'en'];
  
  return testSlugs.flatMap(slug => 
    locales.map(locale => ({
      locale,
      slug
    }))
  );
}

// Métadonnées SEO - sans DB
export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug } = await params;
  
  return {
    title: `${slug.charAt(0).toUpperCase() + slug.slice(1)} - Origine et Statistiques`,
    description: `Découvrez tout sur le prénom ${slug}`,
  };
}

export default async function NamePage({ params }: Props) {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  
  // Données mock pour tester sans DB
  const mockName = {
    name_display: slug.charAt(0).toUpperCase() + slug.slice(1),
    gender:  'M' ,
    etymology_full: `Le prénom ${slug} a une origine ancienne et une signification riche. Cette page de démonstration montre comment sera affichée l'étymologie complète une fois les données chargées.`,
    etymology_short: `Prénom d'origine variée signifiant "valeur" ou "grâce".`
  };
  
  const mockStatistics = [
    { year: 2020, count: 1500, rank: 5 },
    { year: 2021, count: 1400, rank: 6 },
    { year: 2022, count: 1300, rank: 7 }
  ];
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">{mockName.name_display}</h1>
      
      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded mb-6">
        <p className="text-yellow-800">
          ⚠️ Mode démonstration - Les données réelles seront chargées une fois la base de données connectée
        </p>
      </div>
      
      <p className="text-gray-600 mb-6">
        Genre: {mockName.gender === 'M' ? 'Masculin' : 'Féminin'}
      </p>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Étymologie</h2>
        <p className="text-gray-800">{mockName.etymology_full}</p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Statistiques</h2>
        <div className="bg-gray-50 p-4 rounded">
          <p>Données disponibles de {mockStatistics[0].year} à {mockStatistics[mockStatistics.length - 1].year}</p>
          <p>Total d'attributions: {mockStatistics.reduce((sum, s) => sum + s.count, 0).toLocaleString()}</p>
          
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Évolution récente:</h3>
            <ul className="space-y-1">
              {mockStatistics.map(stat => (
                <li key={stat.year} className="flex justify-between">
                  <span>{stat.year}:</span>
                  <span>{stat.count.toLocaleString()} naissances (rang {stat.rank})</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}