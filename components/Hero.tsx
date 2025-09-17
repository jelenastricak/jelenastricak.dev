export default function Hero() {
  return (
    <div>
      <header className="bg-charcoal py-4 border-b border-gold">
        <div className="container px-6 flex items-center gap-4">
          <div className="relative flex items-center justify-center">
            <div className="absolute w-20 h-20 bg-cream rounded-full opacity-20 blur-sm"></div>
            <img src="/herodot-logo.png" alt="Herodot Logo" className="relative w-28 h-28 rounded-full"/>
          </div>
          <h1 className="font-serif text-4xl text-gold">Herodot</h1>
        </div>
      </header>
      <section className="bg-charcoal py-16">
        <div className="container px-6 flex flex-col md:flex-row items-center gap-8">
          <div className="w-40 h-40 overflow-hidden rounded-full border-4 border-gold shadow-gold flex-shrink-0">
            <img src="/me.jpg" alt="Jelena Stricak" className="w-full h-full object-cover object-center"/>
          </div>
          <div>
            <h2 className="font-serif text-3xl md:text-4xl mb-4 max-w-3xl">
              Historian and AI consultant bridging technology and the humanities. My company, Herodot, modernizes a connection to history through innovative guided tours and educational programs.
            </h2>
          </div>
        </div>
      </section>
    </div>
  )
}
