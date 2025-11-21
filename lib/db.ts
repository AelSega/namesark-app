// lib/db.ts
import { sql } from '@vercel/postgres';

export interface Name {
  id: number;
  name_normalized: string;
  name_display: string;
  slug: string;
  gender: string;
  language_origin: string;
  etymology_short: string | null;
  etymology_full: string | null;
  popularity_score: number;
}

export interface NameStatistic {
  year: number;
  count: number;
  rank: number | null;
  country_code: string;
}

export async function getNameBySlug(slug: string): Promise<Name | null> {
  try {
    const { rows } = await sql<Name>`
      SELECT * FROM names WHERE slug = ${slug}
    `;
    return rows[0] || null;
  } catch (error) {
    console.error('Database error in getNameBySlug:', error);
    return null;
  }
}

export async function getNameStatistics(nameId: number): Promise<NameStatistic[]> {
  try {
    const { rows } = await sql<NameStatistic>`
      SELECT 
        ns.year, 
        ns.count, 
        ns.rank,
        c.code as country_code
      FROM name_statistics ns
      JOIN countries c ON ns.country_id = c.id
      WHERE ns.name_id = ${nameId}
      ORDER BY ns.year ASC
    `;
    return rows;
  } catch (error) {
    console.error('Database error in getNameStatistics:', error);
    return [];
  }
}

// 🔥 NOTE: Cette fonction n'est plus utilisée dans generateStaticParams
// mais on la garde au cas où
export async function getAllNameSlugs(): Promise<string[]> {
  try {
    const { rows } = await sql<{ slug: string }>`
      SELECT slug FROM names LIMIT 50
    `;
    return rows.map(r => r.slug);
  } catch (error) {
    console.error('Database error in getAllNameSlugs:', error);
    return [];
  }
}