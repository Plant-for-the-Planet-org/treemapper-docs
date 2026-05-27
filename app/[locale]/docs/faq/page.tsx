import { DocPage } from '@/components/doc-page';
import Link from 'next/link';
import { FAQList } from './faq-accordion';

export default function FAQPage() {
  return (
    <DocPage
      title="Frequently Asked Questions"
      description="Find answers to common questions about TreeMapper."
      pageId="faq"
    >
      <p className="text-lg text-muted-foreground mb-8">
        Browse our most frequently asked questions below. Can&apos;t find what you&apos;re looking
        for?{' '}
        <Link href="/docs/contact-support" className="text-primary hover:underline">
          Contact support
        </Link>{' '}
        for assistance.
      </p>

      <FAQList />

      <div className="mt-12 p-6 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
        <h3 className="text-lg font-semibold mb-2">Still have questions?</h3>
        <p className="text-muted-foreground mb-4">
          Our support team is here to help. Reach out directly for assistance.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            style={{ color: 'white' }}
            href="/docs/contact-support"
            className="inline-flex items-center px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </DocPage>
  );
}
