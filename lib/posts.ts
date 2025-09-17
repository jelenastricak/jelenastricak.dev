import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDir = path.join(process.cwd(), 'md-articles')

export type PostMeta = {
  slug: string
  title: string
  date: string
  cover: string | null
  excerpt: string
}

export function getPosts(): PostMeta[] {
  if (!fs.existsSync(postsDir)) return []
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'))
  const posts = files.map(filename => {
    const slug = filename.replace(/\.md$/, '')
    const file = fs.readFileSync(path.join(postsDir, filename), 'utf-8')
    const { data, content } = matter(file)

    // Extract title from first line if not in frontmatter
    const contentLines = content.split('\n').filter(line => line.trim())
    const firstLine = contentLines[0] || ''
    const fallbackTitle = firstLine.replace(/^#\s*/, '') || slug.replace(/_/g, ' ')

    // Use current date as fallback
    const fallbackDate = '2024-01-01'

    const excerpt = (data.excerpt as string) || contentLines.slice(0, 3).join(' ').substring(0, 150) + '...'

    return {
      slug,
      title: (data.title as string) || fallbackTitle,
      date: (data.date as string) || fallbackDate,
      cover: (data.cover as string) || null,
      excerpt
    }
  })
  return posts.sort((a, b) => +new Date(b.date) - +new Date(a.date))
}
