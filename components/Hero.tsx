export default function Hero() {
  return (
    <div>
      <header className="bg-charcoal py-4 border-b border-gold">
        <div className="container px-6">
          <div className="font-serif text-4xl text-gold">Jelena Stricak</div>
        </div>
      </header>
      <section className="bg-charcoal py-16" role="banner">
        <div className="container px-6 flex flex-col md:flex-row items-center gap-8">
          <div className="w-40 h-40 overflow-hidden rounded-full border-4 border-gold shadow-gold flex-shrink-0">
            <img
              src="/me.jpg"
              alt="Jelena Stricak - Professional photo of historian and AI consultant, founder of Herodot"
              className="w-full h-full object-cover object-center"
              width={160}
              height={160}
              loading="eager"
            />
          </div>
          <div>
            <h1 className="font-serif text-3xl md:text-4xl mb-4 max-w-3xl">
              Historian and AI consultant bridging technology and the humanities. My company, <strong>Herodot</strong>, modernizes a connection to history through innovative guided tours and educational programs.
            </h1>
          </div>
        </div>
      </section>
    </div>
  )
}
