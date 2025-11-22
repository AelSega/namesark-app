// app/[locale]/prenoms/[slug]/page.tsx
import { getNameBySlug, getNameStatistics, getAllNameSlugs } from '@/lib/db';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';


// // Génère toutes les pages statiquement
// export async function generateStaticParams() {
//   const slugs = await getAllNameSlugs();
//   const locales = ['fr', 'en'];
  
//   return slugs.flatMap(slug => 
//     locales.map(locale => ({
//       locale,
//       slug
//     }))
//   );
// }

// Génère toutes les pages statiquement
export async function generateStaticParams() {
  // Remplace l'appel DB par des slugs statiques
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





// Métadonnées SEO
export async function generateMetadata({ params }: { params: { slug: string, locale: string } }) {
  const name = await getNameBySlug(params.slug);
  
  if (!name) return {};
  
  return {
    title: `${name.name_display} - Origine, Étymologie et Statistiques`,
    description: name.etymology_short || `Découvrez tout sur le prénom ${name.name_display}`,
  };
}

export default async function NamePage({ 
  params 
}: { 
  params: { slug: string, locale: string } 
}) {
  setRequestLocale(params.locale);
  
  const name = await getNameBySlug(params.slug);
  
  if (!name) {
    notFound();
  }
  
  const statistics = await getNameStatistics(name.id);
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">{name.name_display}</h1>
      
      {name.gender && (
        <p className="text-gray-600 mb-6">
          Genre: {name.gender === 'M' ? 'Masculin' : 'Féminin'}
        </p>
      )}
      
      {name.etymology_full && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Étymologie</h2>
          <p className="text-gray-800">{name.etymology_full}</p>
        </section>
      )}
      
      {statistics.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Statistiques</h2>
          <div className="bg-gray-50 p-4 rounded">
            <p>Données disponibles de {statistics[0].year} à {statistics[statistics.length - 1].year}</p>
            <p>Total d attributions: {statistics.reduce((sum, s) => sum + s.count, 0).toLocaleString()}</p>
          </div>
        </section>
      )}
    </div>
  );
}