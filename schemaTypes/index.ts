import { defineType, defineField } from 'sanity'

/* ---------------- BLOG ---------------- */

const blog = defineType({
  name: 'blog',
  title: 'Blogs',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule =>
        Rule.required()
          .min(10)
          .max(80)
          .warning('Keep title under 80 characters for SEO'),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',

        slugify: input =>
          input
            .trim()
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim()
            .slice(0, 96),

        maxLength: 96,

        isUnique: async (slug, context) => {
          const { document, getClient } = context
          const client = getClient({ apiVersion: '2023-01-01' })

          if (!document?._id) return true

          const id = document._id.replace(/^drafts\./, '')

          const params = {
            draft: `drafts.${id}`,
            published: id,
            slug,
          }

          const query = `!defined(*[
            !(_id in [$draft, $published]) &&
            slug.current == $slug
          ][0]._id)`

          const result = await client.fetch(query, params)
          return result
        },
      },
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'image',
      title: 'Featured Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Important for SEO and accessibility',
        }),
      ],
    }),

    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
          },
        },

        // INLINE IMAGE BLOCK
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: 'Describe the image for SEO',
            }),
          ],
        },
      ],
    }),

    // BONUS FIELDS (SAFE)
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      description: 'Short summary for previews (optional)',
      validation: Rule =>
        Rule.max(200).warning('Keep excerpt under 200 characters'),
    }),

    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
    }),

    defineField({
      name: 'metaTitle',
      title: 'Meta Title (SEO)',
      type: 'string',
      validation: Rule =>
        Rule.max(60).warning('Keep meta title under 60 characters'),
    }),

    defineField({
      name: 'metaDescription',
      title: 'Meta Description (SEO)',
      type: 'text',
      validation: Rule =>
        Rule.max(160).warning('Keep meta description under 160 characters'),
    }),
  ],
})

/* ---------------- SERVICE ---------------- */

const service = defineType({
  name: 'service',
  title: 'Services',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule =>
        Rule.required()
          .min(10)
          .max(80)
          .warning('Keep title under 80 characters for SEO'),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',

        slugify: input =>
          input
            .trim()
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim()
            .slice(0, 96),

        maxLength: 96,

        isUnique: async (slug, context) => {
          const { document, getClient } = context
          const client = getClient({ apiVersion: '2023-01-01' })

          if (!document?._id) return true

          const id = document._id.replace(/^drafts\./, '')

          const params = {
            draft: `drafts.${id}`,
            published: id,
            slug,
          }

          const query = `!defined(*[
            !(_id in [$draft, $published]) &&
            slug.current == $slug
          ][0]._id)`

          const result = await client.fetch(query, params)
          return result
        },
      },
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'image',
      title: 'Service Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Important for SEO',
        }),
      ],
    }),

    // 🔥 UPGRADED DESCRIPTION (SAFE NAME, NEW TYPE)
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
          },
        },

        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            }),
          ],
        },
      ],
    }),

    defineField({
      name: 'metaTitle',
      title: 'Meta Title (SEO)',
      type: 'string',
      validation: Rule =>
        Rule.max(60).warning('Keep meta title under 60 characters'),
    }),

    defineField({
      name: 'metaDescription',
      title: 'Meta Description (SEO)',
      type: 'text',
      validation: Rule =>
        Rule.max(160).warning('Keep meta description under 160 characters'),
    }),
  ],
})

export const schemaTypes = [blog, service]