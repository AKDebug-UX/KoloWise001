import type {Metadata} from 'next';
import './globals.css'; // Global styles
import { AuthProvider } from '@/hooks/use-auth';
import { ErrorBoundary } from '@/components/error-boundary';

export const metadata: Metadata = {
  title: 'KoloWise - AI-powered Ajo System',
  description: 'Modernizing traditional Nigerian Ajo with AI insights and transparency.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <ErrorBoundary>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
