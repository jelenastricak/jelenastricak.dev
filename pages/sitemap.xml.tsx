import { GetServerSideProps } from 'next'
import fs from 'fs'
import path from 'path'

function generateSiteMap(posts: string[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://jelenastricak.dev</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
       <changefreq>weekly</changefreq>
       <priority>1.0</priority>
     </url>
     ${posts
       .map((slug) => {
         return `
       <url>
           <loc>https://jelenastricak.dev/posts/${slug}</loc>
           <lastmod>${new Date().toISOString()}</lastmod>
           <changefreq>monthly</changefreq>
           <priority>0.8</priority>
       </url>
     `
       })
       .join('')}
   </urlset>
 `
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  // Get all post slugs
  const postsDir = path.join(process.cwd(), 'md-articles')
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'))
  const posts = files.map(f => f.replace(/\.md$/, ''))

  // Generate the XML sitemap
  const sitemap = generateSiteMap(posts)

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default SiteMap