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
      <article className="bg-charcoal">
        {/* Hero Section */}
        <header className="bg-gradient-to-b from-blackish to-charcoal py-16 border-b border-bronze">
          <div className="container px-6">
            <h1 className="font-serif text-4xl md:text-5xl mb-6 text-gold">{title}</h1>
            {cover && (
              <img
                src={cover}
                alt={title}
                className="w-full max-h-96 object-cover rounded-lg shadow-2xl"
                loading="lazy"
              />
            )}
          </div>
        </header>
        
        {/* Article Content */}
        <div className="container px-6 py-12">
          <div
            className="prose prose-invert prose-lg max-w-4xl mx-auto prose-headings:text-gold prose-a:text-cream hover:prose-a:text-gold prose-strong:text-gold prose-em:text-cream"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>

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

  // Remove H1 title from content to avoid duplication (it's shown in the page header)
  const contentWithoutTitle = content.replace(/^#\s+.+$/m, '').trim()

  // Create excerpt from content
  const plainTextContent = contentWithoutTitle.replace(/[#*`]/g, '').replace(/\n+/g, ' ')
  const excerpt = data.excerpt || plainTextContent.substring(0, 160).trim() + '...'

  const processed = await remark().use(html).process(contentWithoutTitle)
  return {
    props: {
      title: data.title || fallbackTitle,
      date: data.date || new Date().toISOString().split('T')[0],
      cover: data.cover || null,
      content: processed.toString(),
      slug,
      excerpt
    }
  }
}
