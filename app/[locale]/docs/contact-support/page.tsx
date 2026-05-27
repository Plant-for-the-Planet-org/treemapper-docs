import { DocPage } from '@/components/doc-page';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ContactForm } from './contact-form';

export default async function ContactSupportPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('pages.contactSupport');

  return (
    <DocPage title={t('title')} description={t('description')} pageId="contact-support">
      <div className="mb-8">
        <p className="text-lg text-muted-foreground mb-4">{t('intro')}</p>
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
          <p className="text-sm text-muted-foreground">{t('responseTime')}</p>
        </div>
      </div>

      <ContactForm />

      <div className="mt-12 pt-8 border-t">
        <h2 className="text-xl font-semibold mb-4">{t('alternativeTitle')}</h2>
        <div className="space-y-3">
          <div>
            <strong className="text-sm">{t('emailLabel')}:</strong>{' '}
            <a
              href="mailto:support@plant-for-the-planet.org"
              className="text-primary hover:underline"
            >
              support@plant-for-the-planet.org
            </a>
          </div>
          <div>
            <strong className="text-sm">{t('phoneLabel')}:</strong>{' '}
            <a href="tel:+4988089345" className="text-primary hover:underline">
              +49 (0) 8808 9345
            </a>
          </div>
          <p className="text-sm text-muted-foreground mt-4">{t('hoursNote')}</p>
        </div>
      </div>
    </DocPage>
  );
}
