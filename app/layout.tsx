import type { Metadata } from 'next';
import { buildFaviconUri } from '@/lib/build-favicon-uri';
import { getLogoSrc } from '@/lib/get-logo-src';
import { inter, FONT_CLASS_MAP } from '@/lib/fonts';
import { TemplateLayout } from '@/components/custom/template-layout';
import { LogoSrcProvider } from '@/components/custom/logo-src-provider';
import { TemplateI18nProvider } from '../lib/i18n/provider';
import '@/app/globals.css';
import './globals.css';
import './custom.css';

export function generateMetadata(): Metadata {
  const faviconUri = buildFaviconUri();
  return {
    title: process.env.NEXT_PUBLIC_DERIV_APP_NAME?.trim() || 'CEO HUB Analysis',
    description: 'Live market probability analysis dashboard',
    ...(faviconUri ? { icons: { icon: faviconUri } } : {}),
  };
}

const fontClass =
  FONT_CLASS_MAP[process.env.NEXT_PUBLIC_FONT_FAMILY ?? 'Inter'] ??
  inter.className;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const logoSrc = getLogoSrc();
  return (
    <html lang="en" className="h-full lg:h-auto" suppressHydrationWarning>
      <body
        className={`${fontClass} bg-background flex min-h-dvh flex-col overflow-x-hidden overflow-y-auto lg:block lg:min-h-screen`}
      >
        <TemplateI18nProvider>
          <TemplateLayout>
            <LogoSrcProvider logoSrc={logoSrc}>{children}</LogoSrcProvider>
          </TemplateLayout>
        </TemplateI18nProvider>
      </body>
    </html>
  );
}
