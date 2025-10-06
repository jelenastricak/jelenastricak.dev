import Link from 'next/link'

type Props = { slug: string; title: string; date: string; cover: string | null; excerpt: string }

export default function ArticleCard({ slug, title, date, cover, excerpt }: Props) {
  return (
    <Link href={`/posts/${slug}`} className="card">
      {cover && <img src={cover} alt={title} className="w-full h-44 object-cover" />}
      <div className="p-4">
        <h3 className="font-serif text-xl">{title}</h3>
      </div>
    </Link>
  )
}
