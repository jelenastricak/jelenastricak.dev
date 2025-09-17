import Link from 'next/link'

type Props = { slug: string; title: string; date: string; cover: string | null; excerpt: string }

export default function ArticleCard({ slug, title, date, cover, excerpt }: Props) {
  return (
    <Link href={`/posts/${slug}`} className="card">
      {cover && <img src={cover} alt={title} className="w-full h-44 object-cover" />}
      <div className="p-4">
        <h3 className="font-serif text-xl mb-2">{title}</h3>
        <p className="text-sm text-muted mb-3">{new Date(date).toLocaleDateString()}</p>
        {excerpt && <p className="text-sm line-clamp-3">{excerpt}</p>}
      </div>
    </Link>
  )
}
