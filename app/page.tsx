// app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">NamesArk</h1>
        <div className="space-y-4">
          <Link href="/fr" className="block text-blue-600 hover:underline">
            Version Française
          </Link>
          <Link href="/en" className="block text-blue-600 hover:underline">
            English Version
          </Link>
        </div>
      </div>
    </div>
  );
}