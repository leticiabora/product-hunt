import type { Metadata } from 'next';
import Providers from '@/components/Providers/Providers';

export const metadata: Metadata = {
  title: 'Product Hunt',
  description: 'The best new products in tech',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
