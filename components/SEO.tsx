import Head from 'next/head'

interface SEOProps {
  title?: string
  description?: string
  canonical?: string
  image?: string
  article?: boolean
  publishedTime?: string
  modifiedTime?: string
  author?: string
  keywords?: string[]
}

export default function SEO({
  title = "Jelena Stricak - Historian & AI Consultant | Herodot",
  description = "Historian and AI consultant bridging technology and humanities. Expert in AI education, neurodivergent support, and innovative historical tours. Founder of Herodot.",
  canonical = "https://jelenastricak.dev",
  image = "https://jelenastricak.dev/og-image.jpg",
  article = false,
  publishedTime,
  modifiedTime,
  author = "Jelena Stricak",
  keywords = [
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
    "solopreneur"
  ]
}: SEOProps) {
  const fullTitle = title.includes("Jelena Stricak") ? title : `${title} | Jelena Stricak - Historian & AI Consultant`

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(", ")} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={article ? "article" : "website"} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Jelena Stricak - Herodot" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonical} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta property="twitter:creator" content="@jstricak" />

      {/* Article specific tags */}
      {article && (
        <>
          <meta property="article:author" content={author} />
          {publishedTime && (
            <meta property="article:published_time" content={publishedTime} />
          )}
          {modifiedTime && (
            <meta property="article:modified_time" content={modifiedTime} />
          )}
          <meta property="article:section" content="Technology" />
          <meta property="article:tag" content="AI" />
          <meta property="article:tag" content="Education" />
          <meta property="article:tag" content="History" />
        </>
      )}

      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#B8860B" />
      <meta name="msapplication-TileColor" content="#B8860B" />

      {/* Structured Data for Person/Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Jelena Stricak",
            "url": "https://jelenastricak.dev",
            "jobTitle": "Historian and AI Consultant",
            "worksFor": {
              "@type": "Organization",
              "name": "Herodot",
              "url": "https://herodot.hr"
            },
            "knowsAbout": [
              "Artificial Intelligence",
              "Historical Education",
              "Neurodivergent Support",
              "Educational Technology",
              "Historical Tours"
            ],
            "sameAs": [
              "https://medium.com/@jstricak",
              "https://linkedin.com/in/jstricak"
            ],
            "image": "https://jelenastricak.dev/me.jpg",
            "description": description
          })
        }}
      />
    </Head>
  )
}