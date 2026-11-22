import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Calisfy AI — Train. Master. Progress.',
  description: 'Modern calisthenics training platform, skill progressions, and workout planner.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
