'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { projectSchema, type ProjectFormData } from '@/lib/validations/project';
import { slugify } from '@/lib/utils/slugify';
import { toast } from 'sonner';
import Input from './ui/Input';
import Textarea from './ui/Textarea';
import Button from './ui/Button';
import Switch from './ui/Switch';
import type { Project } from '@/lib/projects';

interface ProjectFormProps {
  project?: Project;
}

export default function ProjectForm({ project }: ProjectFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultValues: ProjectFormData = project
    ? {
        name: project.name,
        slug: project.slug,
        shortDescription: project.shortDescription,
        outcomeMetric: project.outcomeMetric,
        thumbnailUrl: project.thumbnailUrl,
        heroImageUrl: project.heroImageUrl,
        impactSummary: project.impactSummary,
        year: project.year,
        role: project.role,
        tags: project.tags || [],
        techStack: project.techStack || [],
        context: project.context,
        approach: project.approach,
        execution: project.execution,
        outcome: project.outcome,
        seoTitle: project.name,
        seoDescription: project.shortDescription,
        published: true,
        nextProjectSlug: project.nextProjectSlug || '',
        prevProjectSlug: project.prevProjectSlug || '',
      }
    : {
        name: '',
        slug: '',
        shortDescription: '',
        outcomeMetric: '',
        thumbnailUrl: '',
        heroImageUrl: '',
        impactSummary: '',
        year: new Date().getFullYear().toString(),
        role: '',
        tags: [],
        techStack: [],
        context: { title: 'The Challenge', body: '' },
        approach: { title: 'Strategy & AI Leverage', body: '', callout: '' },
        execution: { title: 'Building It', body: '', images: [] },
        outcome: { title: 'Results & Impact', metrics: [{ value: '', label: '' }], summary: '' },
        seoTitle: '',
        seoDescription: '',
        published: false,
        nextProjectSlug: '',
        prevProjectSlug: '',
      };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues,
    mode: 'onChange',
  });

  const { fields: metricFields, append: appendMetric, remove: removeMetric } = useFieldArray({
    control,
    name: 'outcome.metrics',
  });

  const watchName = watch('name');
  const watchPublished = watch('published');

  // Auto-generate slug from name
  useEffect(() => {
    if (watchName && !project) {
      setValue('slug', slugify(watchName));
    }
  }, [watchName, project, setValue]);

  const [tagsInput, setTagsInput] = useState(project?.tags?.join(', ') || '');
  const [techStackInput, setTechStackInput] = useState(project?.techStack?.join(', ') || '');

  const onSubmit = async (data: ProjectFormData) => {
    setIsSubmitting(true);

    // Parse tags and techStack from comma-separated strings
    data.tags = tagsInput.split(',').map((t) => t.trim().toUpperCase()).filter(Boolean);
    data.techStack = techStackInput.split(',').map((t) => t.trim()).filter(Boolean);

    try {
      // For now, just show a success message
      // Will be replaced with actual API call
      console.log('Project data:', data);
      toast.success(project ? 'Project updated successfully!' : 'Project created successfully!');
      router.push('/admin/projects');
    } catch (error) {
      toast.error('Failed to save project. Please try again.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl space-y-12">
      {/* Basic Information */}
      <section className="bg-white border border-foreground/10 rounded-xl p-6">
        <h2 className="text-lg font-medium text-foreground mb-6">Basic Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            id="name"
            label="Project Name"
            placeholder="e.g., Surfgeo"
            error={errors.name?.message}
            required
            {...register('name')}
          />
          <Input
            id="slug"
            label="Slug"
            placeholder="e.g., surfgeo"
            hint="URL-friendly identifier"
            error={errors.slug?.message}
            required
            {...register('slug')}
          />
          <div className="md:col-span-2">
            <Textarea
              id="shortDescription"
              label="Short Description"
              placeholder="One-line description of the project"
              rows={2}
              maxLength={200}
              showCount
              error={errors.shortDescription?.message}
              required
              {...register('shortDescription')}
            />
          </div>
          <Input
            id="outcomeMetric"
            label="Outcome Metric"
            placeholder="e.g., GEO ↑ 400%"
            error={errors.outcomeMetric?.message}
            required
            {...register('outcomeMetric')}
          />
          <Input
            id="year"
            label="Year"
            placeholder="e.g., 2024"
            error={errors.year?.message}
            required
            {...register('year')}
          />
          <div className="md:col-span-2">
            <Input
              id="role"
              label="Role"
              placeholder="e.g., Product Design & Development"
              error={errors.role?.message}
              required
              {...register('role')}
            />
          </div>
        </div>
      </section>

      {/* Images */}
      <section className="bg-white border border-foreground/10 rounded-xl p-6">
        <h2 className="text-lg font-medium text-foreground mb-6">Images</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            id="thumbnailUrl"
            label="Thumbnail URL"
            placeholder="/images/projects/project-thumb.jpg"
            hint="Aspect ratio: 16:10"
            error={errors.thumbnailUrl?.message}
            {...register('thumbnailUrl')}
          />
          <Input
            id="heroImageUrl"
            label="Hero Image URL"
            placeholder="/images/projects/project-hero.jpg"
            hint="Aspect ratio: 21:9 or 16:9"
            error={errors.heroImageUrl?.message}
            {...register('heroImageUrl')}
          />
        </div>
      </section>

      {/* Tags & Tech Stack */}
      <section className="bg-white border border-foreground/10 rounded-xl p-6">
        <h2 className="text-lg font-medium text-foreground mb-6">Tags & Tech Stack</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Tags</label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="AI, SEO, NEXTJS (comma-separated)"
              className="w-full px-4 py-3 bg-white border border-foreground/20 rounded-md text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground"
            />
            <p className="mt-1 text-sm text-foreground/60">Separate tags with commas</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Tech Stack</label>
            <input
              type="text"
              value={techStackInput}
              onChange={(e) => setTechStackInput(e.target.value)}
              placeholder="Next.js, React, PostgreSQL (comma-separated)"
              className="w-full px-4 py-3 bg-white border border-foreground/20 rounded-md text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground"
            />
            <p className="mt-1 text-sm text-foreground/60">Separate technologies with commas</p>
          </div>
        </div>
      </section>

      {/* Impact Summary */}
      <section className="bg-white border border-foreground/10 rounded-xl p-6">
        <h2 className="text-lg font-medium text-foreground mb-6">Impact Summary</h2>
        <Textarea
          id="impactSummary"
          label="Impact Summary"
          placeholder="One paragraph summarizing the project's impact"
          rows={3}
          error={errors.impactSummary?.message}
          required
          {...register('impactSummary')}
        />
      </section>

      {/* Content Sections */}
      <section className="bg-white border border-foreground/10 rounded-xl p-6">
        <h2 className="text-lg font-medium text-foreground mb-6">Context Section</h2>
        <div className="space-y-4">
          <Input
            id="context.title"
            label="Section Title"
            error={errors.context?.title?.message}
            required
            {...register('context.title')}
          />
          <Textarea
            id="context.body"
            label="Content"
            placeholder="Describe the challenge or context..."
            rows={6}
            error={errors.context?.body?.message}
            required
            {...register('context.body')}
          />
        </div>
      </section>

      <section className="bg-white border border-foreground/10 rounded-xl p-6">
        <h2 className="text-lg font-medium text-foreground mb-6">Approach Section</h2>
        <div className="space-y-4">
          <Input
            id="approach.title"
            label="Section Title"
            error={errors.approach?.title?.message}
            required
            {...register('approach.title')}
          />
          <Textarea
            id="approach.body"
            label="Content"
            placeholder="Describe the strategy and approach..."
            rows={6}
            error={errors.approach?.body?.message}
            required
            {...register('approach.body')}
          />
          <Textarea
            id="approach.callout"
            label="Callout (Optional)"
            placeholder="Key insight or quote..."
            rows={3}
            {...register('approach.callout')}
          />
        </div>
      </section>

      <section className="bg-white border border-foreground/10 rounded-xl p-6">
        <h2 className="text-lg font-medium text-foreground mb-6">Execution Section</h2>
        <div className="space-y-4">
          <Input
            id="execution.title"
            label="Section Title"
            error={errors.execution?.title?.message}
            required
            {...register('execution.title')}
          />
          <Textarea
            id="execution.body"
            label="Content"
            placeholder="Describe the execution details..."
            rows={6}
            error={errors.execution?.body?.message}
            required
            {...register('execution.body')}
          />
        </div>
      </section>

      <section className="bg-white border border-foreground/10 rounded-xl p-6">
        <h2 className="text-lg font-medium text-foreground mb-6">Outcome Section</h2>
        <div className="space-y-6">
          <Input
            id="outcome.title"
            label="Section Title"
            error={errors.outcome?.title?.message}
            required
            {...register('outcome.title')}
          />

          {/* Metrics */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-4">Metrics</label>
            <div className="space-y-4">
              {metricFields.map((field, index) => (
                <div key={field.id} className="flex gap-4 items-start">
                  <Input
                    placeholder="e.g., 400%"
                    {...register(`outcome.metrics.${index}.value`)}
                  />
                  <Input
                    placeholder="e.g., Increase in AI citations"
                    {...register(`outcome.metrics.${index}.label`)}
                  />
                  <button
                    type="button"
                    onClick={() => removeMetric(index)}
                    className="p-3 text-red-500 hover:bg-red-50 rounded-md"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => appendMetric({ value: '', label: '' })}
              >
                Add Metric
              </Button>
            </div>
          </div>

          <Textarea
            id="outcome.summary"
            label="Summary"
            placeholder="Summarize the results..."
            rows={4}
            error={errors.outcome?.summary?.message}
            required
            {...register('outcome.summary')}
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
        </div>
      </section>

      {/* Publishing */}
      <section className="bg-white border border-foreground/10 rounded-xl p-6">
        <h2 className="text-lg font-medium text-foreground mb-6">Publishing</h2>
        <Switch
          checked={watchPublished}
          onChange={(checked) => setValue('published', checked)}
          label="Publish this project"
          description="When published, the project will be visible on the public website."
        />
      </section>

      {/* Actions */}
      <div className="sticky bottom-0 bg-background py-4 border-t border-foreground/10 flex items-center justify-between">
        <Button
          type="button"
          variant="ghost"
          onClick={() => router.push('/admin/projects')}
        >
          Cancel
        </Button>
        <div className="flex gap-4">
          <Button type="submit" loading={isSubmitting}>
            {project ? 'Update Project' : 'Create Project'}
          </Button>
        </div>
      </div>
    </form>
  );
}

