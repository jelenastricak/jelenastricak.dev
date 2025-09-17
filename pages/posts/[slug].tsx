import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { GetStaticPaths, GetStaticProps } from 'next'
import { remark } from 'remark'
import html from 'remark-html'
import SEO from '../../components/SEO'

type PostProps = {
  title: string
  date: string
  content: string
  cover: string | null
  slug: string
  excerpt: string
}

export default function Post({ title, date, content, cover, slug, excerpt }: PostProps) {
  const publishedTime = new Date(date).toISOString()
  const canonical = `https://jelenastricak.dev/posts/${slug}`

  // Extract keywords from title and content
  const keywords = [
    "Jelena Stricak",
    "AI consultant",
    "historian",
    ...title.toLowerCase().split(' ').filter(word => word.length > 3),
    "artificial intelligence",
    "education",
    "technology",
    "neurodivergent",
    "freelancer"
  ]

  return (
    <>
      <SEO
        title={title}
        description={excerpt}
        canonical={canonical}
        image={cover || "https://jelenastricak.dev/og-image.jpg"}
        article={true}
        publishedTime={publishedTime}
        keywords={keywords}
      />
      <article className="container px-6 py-16">
        <header className="mb-8">
          <h1 className="font-serif text-3xl md:text-4xl mb-4">{title}</h1>
          <div className="flex items-center gap-4 text-sm text-gold mb-6">
            <time dateTime={publishedTime}>
              {new Date(date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            <span>By Jelena Stricak</span>
          </div>
          {cover && (
            <img
              src={cover}
              alt={title}
              className="w-full rounded mb-6"
              loading="lazy"
            />
          )}
        </header>
        <div
          className="prose prose-invert prose-lg max-w-none prose-headings:text-gold prose-a:text-cream hover:prose-a:text-gold"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        {/* Article Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": title,
              "description": excerpt,
              "image": cover || "https://jelenastricak.dev/og-image.jpg",
              "author": {
                "@type": "Person",
                "name": "Jelena Stricak",
                "url": "https://jelenastricak.dev"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Herodot",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://jelenastricak.dev/herodot-logo.png"
                }
              },
              "datePublished": publishedTime,
              "dateModified": publishedTime,
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": canonical
              }
            })
          }}
        />
      </article>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const postsDir = path.join(process.cwd(), 'md-articles')
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'))
  const paths = files.map(f => ({ params: { slug: f.replace(/\.md$/, '') } }))
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string
  const filePath = path.join(process.cwd(), 'md-articles', slug + '.md')
  const file = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(file)

  // Extract title from first line if not in frontmatter
  const contentLines = content.split('\n').filter(line => line.trim())
  const firstLine = contentLines[0] || ''
  const fallbackTitle = firstLine.replace(/^#\s*/, '') || slug.replace(/_/g, ' ')

  // Create excerpt from content
  const plainTextContent = content.replace(/[#*`]/g, '').replace(/\n+/g, ' ')
  const excerpt = data.excerpt || plainTextContent.substring(0, 160).trim() + '...'

  const processed = await remark().use(html).process(content)
  return {
    props: {
      title: data.title || fallbackTitle,
      date: data.date || '2024-01-01',
      cover: data.cover || null,
      content: processed.toString(),
      slug,
      excerpt
    }
  }
}
