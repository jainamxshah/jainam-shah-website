'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { articleSchema, type ArticleFormData } from '@/lib/validations/article';
import { slugify, calculateReadTime } from '@/lib/utils/slugify';
import { toast } from 'sonner';
import Input from './ui/Input';
import Textarea from './ui/Textarea';
import Button from './ui/Button';
import Switch from './ui/Switch';
import Select from './ui/Select';
import type { Article } from '@/lib/articles';

const categoryOptions = [
  { value: 'AI & Product', label: 'AI & Product' },
  { value: 'Growth', label: 'Growth' },
  { value: 'Product', label: 'Product' },
  { value: 'Design', label: 'Design' },
  { value: 'AI & Growth', label: 'AI & Growth' },
  { value: 'Strategy', label: 'Strategy' },
];

interface ArticleFormProps {
  article?: Article;
}

export default function ArticleForm({ article }: ArticleFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultValues: ArticleFormData = article
    ? {
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt,
        content: article.content,
        category: article.category,
        readTime: article.readTime,
        featuredImage: article.featuredImage || '',
        seoTitle: article.seo.metaTitle,
        seoDescription: article.seo.metaDescription,
        seoOgImage: article.seo.ogImage || '',
        published: true,
      }
    : {
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        category: '',
        readTime: '',
        featuredImage: '',
        seoTitle: '',
        seoDescription: '',
        seoOgImage: '',
        published: false,
      };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema),
    defaultValues,
    mode: 'onChange',
  });

  const watchTitle = watch('title');
  const watchContent = watch('content');
  const watchPublished = watch('published');

  // Auto-generate slug from title
  useEffect(() => {
    if (watchTitle && !article) {
      setValue('slug', slugify(watchTitle));
    }
  }, [watchTitle, article, setValue]);

  // Auto-calculate read time
  useEffect(() => {
    if (watchContent) {
      setValue('readTime', calculateReadTime(watchContent));
    }
  }, [watchContent, setValue]);

  const onSubmit = async (data: ArticleFormData) => {
    setIsSubmitting(true);

    try {
      // For now, just show a success message
      // Will be replaced with actual API call
      console.log('Article data:', data);
      toast.success(article ? 'Article updated successfully!' : 'Article created successfully!');
      router.push('/admin/articles');
    } catch (error) {
      toast.error('Failed to save article. Please try again.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl space-y-8">
      {/* Basic Information */}
      <section className="bg-white border border-foreground/10 rounded-xl p-6">
        <h2 className="text-lg font-medium text-foreground mb-6">Basic Information</h2>
        <div className="space-y-6">
          <Input
            id="title"
            label="Title"
            placeholder="e.g., Why Most AI Products Fail"
            error={errors.title?.message}
            required
            {...register('title')}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              id="slug"
              label="Slug"
              placeholder="e.g., why-most-ai-products-fail"
              hint="URL-friendly identifier"
              error={errors.slug?.message}
              required
              {...register('slug')}
            />
            <Select
              id="category"
              label="Category"
              options={categoryOptions}
              error={errors.category?.message}
              required
              {...register('category')}
            />
          </div>
          <Textarea
            id="excerpt"
            label="Excerpt"
            placeholder="Brief summary that appears in article listings..."
            rows={3}
            maxLength={200}
            showCount
            error={errors.excerpt?.message}
            required
            {...register('excerpt')}
          />
        </div>
      </section>

      {/* Featured Image */}
      <section className="bg-white border border-foreground/10 rounded-xl p-6">
        <h2 className="text-lg font-medium text-foreground mb-6">Featured Image</h2>
        <Input
          id="featuredImage"
          label="Featured Image URL"
          placeholder="/images/articles/article-image.jpg"
          hint="Aspect ratio: 21:9"
          error={errors.featuredImage?.message}
          {...register('featuredImage')}
        />
      </section>

      {/* Content */}
      <section className="bg-white border border-foreground/10 rounded-xl p-6">
        <h2 className="text-lg font-medium text-foreground mb-6">Content</h2>
        <div className="space-y-4">
          <Textarea
            id="content"
            label="Article Content"
            placeholder="Write your article content here...

Use ## for headings
Use > for blockquotes
Use - for bullet points"
            rows={20}
            error={errors.content?.message}
            required
            className="font-mono text-sm"
            {...register('content')}
          />
          <div className="flex items-center gap-4 text-sm text-foreground/60">
            <span>
              Words: {watchContent?.split(/\s+/).filter(Boolean).length || 0}
            </span>
            <span>|</span>
            <span>Read time: {watchContent ? calculateReadTime(watchContent) : '0 min read'}</span>
          </div>
          <Input
            id="readTime"
            label="Read Time"
            placeholder="e.g., 5 min read"
            error={errors.readTime?.message}
            required
            {...register('readTime')}
          />
        </div>
      </section>

      {/* SEO */}
      <section className="bg-white border border-foreground/10 rounded-xl p-6">
        <h2 className="text-lg font-medium text-foreground mb-6">SEO Metadata</h2>
        <div className="space-y-4">
          <Input
            id="seoTitle"
            label="SEO Title"
            maxLength={60}
            hint="Max 60 characters"
            error={errors.seoTitle?.message}
            {...register('seoTitle')}
          />
          <Textarea
            id="seoDescription"
            label="SEO Description"
            rows={3}
            maxLength={160}
            showCount
            hint="Max 160 characters"
            error={errors.seoDescription?.message}
            {...register('seoDescription')}
          />
          <Input
            id="seoOgImage"
            label="OG Image URL (Optional)"
            placeholder="Leave empty to use featured image"
            error={errors.seoOgImage?.message}
            {...register('seoOgImage')}
          />
        </div>
      </section>

      {/* Publishing */}
      <section className="bg-white border border-foreground/10 rounded-xl p-6">
        <h2 className="text-lg font-medium text-foreground mb-6">Publishing</h2>
        <Switch
          checked={watchPublished}
          onChange={(checked) => setValue('published', checked)}
          label="Publish this article"
          description="When published, the article will be visible on the public website."
        />
      </section>

      {/* Actions */}
      <div className="sticky bottom-0 bg-background py-4 border-t border-foreground/10 flex items-center justify-between">
        <Button
          type="button"
          variant="ghost"
          onClick={() => router.push('/admin/articles')}
        >
          Cancel
        </Button>
        <div className="flex gap-4">
          <Button type="submit" loading={isSubmitting}>
            {article ? 'Update Article' : 'Create Article'}
          </Button>
        </div>
      </div>
    </form>
  );
}

