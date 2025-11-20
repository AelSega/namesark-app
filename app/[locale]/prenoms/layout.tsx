// app/[locale]/prenoms/layout.tsx
import {ReactNode} from 'react';

interface Props {
  children: ReactNode;
  params: Promise<{locale: string}>;
}

export default async function PrenomsLayout({ children, params }: Props) {
  const { locale } = await params;
  
  return (
    <div className="prenoms-layout">
      {children}
    </div>
  );
}
