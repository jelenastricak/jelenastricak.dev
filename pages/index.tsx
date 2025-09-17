import SEO from '../components/SEO'
import Hero from '../components/Hero'
import ArticleCard from '../components/ArticleCard'
import ContactForm from '../components/ContactForm'
import Footer from '../components/Footer'
import { getPosts, type PostMeta } from '../lib/posts'

export default function Home({ posts }: { posts: PostMeta[] }) {
  return (
    <>
      <SEO
        title="Jelena Stricak - Historian & AI Consultant | Herodot"
        description="Historian and AI consultant bridging technology and humanities. Expert in AI education, neurodivergent support, and innovative historical tours. Founder of Herodot."
        canonical="https://jelenastricak.dev"
        keywords={[
          "Jelena Stricak",
          "historian",
          "AI consultant",
          "artificial intelligence",
          "historical education",
          "neurodivergent support",
          "Herodot",
          "AI for education",
          "technology humanities",
          "guided tours",
          "Croatia",
          "freelancer",
          "solopreneur",
          "AI tools",
          "educational technology"
        ]}
      />
      <div>
        <Hero />
        <section id="articles" className="py-16 bg-charcoal">
          <div className="container px-6">
            <h1 className="font-serif text-2xl mb-8">Latest Insights & Articles</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map(p => <ArticleCard key={p.slug} {...p} />)}
            </div>
          </div>
        </section>
        <ContactForm />
        <Footer />
      </div>
    </>
  )
}

export async function getStaticProps() {
  const posts = getPosts()
  return { props: { posts } }
}
