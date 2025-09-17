import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { GetStaticPaths, GetStaticProps } from 'next'
import { remark } from 'remark'
import html from 'remark-html'

type PostProps = {
  title: string
  date: string
  content: string
  cover: string | null
}

export default function Post({ title, date, content, cover }: PostProps) {
  return (
    <article className="container px-6 py-16">
      <h1 className="font-serif text-3xl mb-2">{title}</h1>
      <p className="text-sm text-gold mb-6">{new Date(date).toLocaleDateString()}</p>
      {cover && <img src={cover} alt={title} className="w-full rounded mb-6" />}
      <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
    </article>
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

  const processed = await remark().use(html).process(content)
  return {
    props: {
      title: data.title || fallbackTitle,
      date: data.date || '2024-01-01',
      cover: data.cover || null,
      content: processed.toString()
    }
  }
}
