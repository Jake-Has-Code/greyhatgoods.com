import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://greyhatgoods.com'),
  title: 'GreyHatGoods — Tools for the Curious',
  description:
    'Cybersecurity-inspired apparel and desk gear for builders, tinkerers, and the tech curious.',
  openGraph: {
    title: 'GreyHatGoods — Tools for the Curious',
    description:
      'Cybersecurity-inspired apparel and desk gear for builders, tinkerers, and the tech curious.',
    images: [{ url: '/greyhat-brand-sheet.jpeg', width: 1080, height: 728 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GreyHatGoods — Tools for the Curious',
    description: 'Gear for security builders, terminal dwellers, and curious minds.',
    images: ['/greyhat-brand-sheet.jpeg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
