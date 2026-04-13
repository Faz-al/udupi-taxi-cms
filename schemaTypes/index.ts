import {defineType, defineField} from 'sanity'

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
    .warning('Keep title under 80 characters for SEO')
}),
    
   defineField({
  name: 'slug',
  title: 'Slug',
  type: 'slug',
  options: {
  source: 'title',

 slugify: input =>
  input
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')     // remove special chars
    .replace(/\s+/g, '-')         // spaces → dash
    .replace(/-+/g, '-')          // remove multiple dashes
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
    }
  },
  validation: Rule => Rule.required(),
}),

    defineField({
      name: 'image',
      title: 'Featured Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{type: 'block'}], // rich text editor
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
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')     // remove special chars
    .replace(/\s+/g, '-')         // spaces → dash
    .replace(/-+/g, '-')          // remove multiple dashes
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
    }
  },
  validation: Rule => Rule.required(),
}),


    defineField({
      name: 'image',
      title: 'Service Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
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