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

// Fonction utilitaire pour ajouter un délai
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function getNameBySlug(slug: string): Promise<Name | null> {
  try {
    // Délai avant la requête
    await delay(100);
    
    const { rows } = await sql<Name>`
      SELECT * FROM names WHERE slug = ${slug}
    `;
    return rows[0] || null;
  } catch (error) {
    console.error('Database error in getNameBySlug:', error);
    
    // Réessayer une fois après un délai plus long
    try {
      await delay(1000);
      console.log('Retrying getNameBySlug...');
      
      const { rows } = await sql<Name>`
        SELECT * FROM names WHERE slug = ${slug}
      `;
      return rows[0] || null;
    } catch (retryError) {
      console.error('Database retry failed in getNameBySlug:', retryError);
      return null;
    }
  }
}

export async function getNameStatistics(nameId: number): Promise<NameStatistic[]> {
  try {
    // Délai avant la requête
    await delay(100);
    
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
    
    // Réessayer une fois
    try {
      await delay(1000);
      console.log('Retrying getNameStatistics...');
      
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
    } catch (retryError) {
      console.error('Database retry failed in getNameStatistics:', retryError);
      return [];
    }
  }
}

export async function getAllNameSlugs(): Promise<string[]> {
  try {
    // Délai plus long pour cette requête qui peut être lourde
    await delay(200);
    
    const { rows } = await sql<{ slug: string }>`
      SELECT slug FROM names LIMIT 50
    `;
    return rows.map(r => r.slug);
  } catch (error) {
    console.error('Database error in getAllNameSlugs:', error);
    
    // Réessayer avec un délai plus long
    try {
      await delay(2000);
      console.log('Retrying getAllNameSlugs...');
      
      const { rows } = await sql<{ slug: string }>`
        SELECT slug FROM names LIMIT 50
      `;
      return rows.map(r => r.slug);
    } catch (retryError) {
      console.error('Database retry failed in getAllNameSlugs:', retryError);
      return [];
    }
  }
}

// Nouvelle fonction avec timeout global
export async function dbQueryWithTimeout<T>(
  query: Promise<{ rows: T[] }>, 
  timeoutMs: number = 5000
): Promise<{ rows: T[] }> {
  const timeoutPromise = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error('Database timeout')), timeoutMs)
  );

  return Promise.race([query, timeoutPromise]);
}

// Version alternative avec timeout pour getNameBySlug
export async function getNameBySlugWithTimeout(slug: string, timeoutMs: number = 3000): Promise<Name | null> {
  try {
    const { rows } = await dbQueryWithTimeout(
      sql<Name>`SELECT * FROM names WHERE slug = ${slug}`,
      timeoutMs
    );
    return rows[0] || null;
  } catch (error) {
    console.error('Database timeout/error in getNameBySlugWithTimeout:', error);
    return null;
  }
}