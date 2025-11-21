// lib/db.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

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
  const { data } = await supabase
    .from('names')
    .select('*')
    .eq('slug', slug)
    .single();
  return data;
}

export async function getNameStatistics(nameId: number): Promise<NameStatistic[]> {
  const { data } = await supabase
    .from('name_statistics')
    .select('year, count, rank, countries!inner(code)')
    .eq('name_id', nameId)
    .order('year');
  
  return data?.map(s => ({
    year: s.year,
    count: s.count,
    rank: s.rank,
    country_code: s.countries.code
  })) || [];
}

export async function getAllNameSlugs(): Promise<string[]> {
  const { data } = await supabase
    .from('names')
    .select('slug')
    .limit(100);
  
  return data?.map(r => r.slug) || [];
}