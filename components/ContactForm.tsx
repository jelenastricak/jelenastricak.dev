export default function ContactForm() {
  return (
    <section id="contact" className="bg-blackish py-16">
      <div className="container px-6">
        <h2 className="font-serif text-2xl mb-6">Let’s Connect</h2>
        <form className="max-w-lg space-y-4">
          <input className="input" type="text" placeholder="Name" />
          <input className="input" type="email" placeholder="Email" />
          <textarea className="input h-32" placeholder="Message" />
          <button className="btn btn-primary" type="submit">Send</button>
        </form>
        <p className="mt-4 text-sm text-muted">Responses in 24–48h.</p>
      </div>
    </section>
  )
}
