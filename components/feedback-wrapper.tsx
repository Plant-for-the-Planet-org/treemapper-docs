'use client';

import dynamic from 'next/dynamic';

const Feedback = dynamic(() => import('@/components/feedback').then(m => m.Feedback), { ssr: false });

export function FeedbackWrapper({ pageId }: { pageId: string }) {
  return <Feedback pageId={pageId} />;
}
