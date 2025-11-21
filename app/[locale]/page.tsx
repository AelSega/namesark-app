// app/[locale]/prenoms/page.tsx
import { sql } from '@vercel/postgres';
import Link from 'next/link';

export default async function PrenomsIndex({ params }: { params: { locale: string } }) {
  try {
    const { rows } = await sql`
      SELECT slug, name_display, popularity_score 
      FROM names 
      ORDER BY popularity_score DESC 
      LIMIT 100
    `;
    
    return (
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Prénoms populaires</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {rows.map(name => (
            <Link 
              key={name.slug} 
              href={`/${params.locale}/prenoms/${name.slug}`}
              className="p-4 border rounded hover:bg-gray-50"
            >
              {name.name_display}
            </Link>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    // Fallback si la DB n'est pas accessible
    const fallbackNames = [
      { slug: 'marie', name_display: 'Marie' },
      { slug: 'jean', name_display: 'Jean' },
      { slug: 'pierre', name_display: 'Pierre' },
      { slug: 'anne', name_display: 'Anne' },
      { slug: 'paul', name_display: 'Paul' }
    ];
    
    return (
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Prénoms populaires</h1>
        <p className="text-yellow-600 mb-4">Mode démonstration - données limitées</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {fallbackNames.map(name => (
            <Link 
              key={name.slug} 
              href={`/${params.locale}/prenoms/${name.slug}`}
              className="p-4 border rounded hover:bg-gray-50"
            >
              {name.name_display}
            </Link>
          ))}
        </div>
      </div>
    );
  }
}