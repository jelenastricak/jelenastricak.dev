import Hero from '../components/Hero'
import ArticleCard from '../components/ArticleCard'
import ContactForm from '../components/ContactForm'
import Footer from '../components/Footer'
import { getPosts, type PostMeta } from '../lib/posts'

export default function Home({ posts }: { posts: PostMeta[] }) {
  return (
    <div>
      <Hero />
      <section id="articles" className="py-16 bg-charcoal">
        <div className="container px-6">
          <h2 className="font-serif text-2xl mb-8">Latest Insights & Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map(p => <ArticleCard key={p.slug} {...p} />)}
          </div>
        </div>
      </section>
      <ContactForm />
      <Footer />
    </div>
  )
}

export async function getStaticProps() {
  const posts = getPosts()
  return { props: { posts } }
}
