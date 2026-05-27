'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';

interface FormData {
  name: string;
  email: string;
  subject: string;
  category: string;
  message: string;
  files: File[];
}

export function ContactForm() {
  const t = useTranslations('pages.contactSupport');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: '',
    files: [],
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire up form submission
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            {t('nameLabel')} <span className="text-red-500">*</span>
          </label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleInputChange}
            placeholder={t('namePlaceholder')}
            className="w-full"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            {t('emailLabel')} <span className="text-red-500">*</span>
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            placeholder={t('emailPlaceholder')}
            className="w-full"
          />
        </div>
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium mb-2">
          {t('categoryLabel')} <span className="text-red-500">*</span>
        </label>
        <Select
          id="category"
          name="category"
          required
          value={formData.category}
          onChange={handleInputChange}
          className="w-full"
        >
          <option value="">{t('categoryPlaceholder')}</option>
          <option value="technical">{t('categoryTechnical')}</option>
          <option value="account">{t('categoryAccount')}</option>
          <option value="feature">{t('categoryFeature')}</option>
          <option value="bug">{t('categoryBug')}</option>
          <option value="general">{t('categoryGeneral')}</option>
          <option value="other">{t('categoryOther')}</option>
        </Select>
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium mb-2">
          {t('subjectLabel')} <span className="text-red-500">*</span>
        </label>
        <Input
          id="subject"
          name="subject"
          type="text"
          required
          value={formData.subject}
          onChange={handleInputChange}
          placeholder={t('subjectPlaceholder')}
          className="w-full"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          {t('messageLabel')} <span className="text-red-500">*</span>
        </label>
        <Textarea
          id="message"
          name="message"
          required
          value={formData.message}
          onChange={handleInputChange}
          placeholder={t('messagePlaceholder')}
          rows={8}
          className="w-full"
        />
        <p className="text-xs text-muted-foreground mt-1">{t('messageHint')}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <Button type="submit" className="flex-1 sm:flex-none sm:min-w-[200px]">
          {t('submitButton')}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setFormData({
              name: '',
              email: '',
              subject: '',
              category: '',
              message: '',
              files: [],
            });
            if (fileInputRef.current) {
              fileInputRef.current.value = '';
            }
          }}
        >
          {t('resetButton')}
        </Button>
      </div>

      <p className="text-xs text-muted-foreground">{t('privacyNote')}</p>
    </form>
  );
}
