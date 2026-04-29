import { useEffect, useRef, useState } from 'react'
import './App.css'

const NAV_LINKS = ['Home', 'About', 'Skills', 'Projects', 'Contact']

const SKILLS = [
  { name: 'HTML / CSS', level: 85 },
  { name: 'JavaScript', level: 78 },
  { name: 'React', level: 72 },
  { name: 'Node.js', level: 65 },
  { name: 'Microsoft Office', level: 95 },
  { name: 'PowerPoint', level: 90 },
  { name: 'Word / Excel', level: 92 },
  { name: 'Gestion Entreprise', level: 88 },
]

const LANGUAGES = [
  { name: 'Arabe', level: 100 },
  { name: 'Français', level: 90 },
  { name: 'Anglais', level: 70 },
]

const PROJECTS = [
  {
    title: 'Site Web E-Commerce',
    desc: 'Application web responsive avec catalogue produits, panier et interface moderne.',
    tags: ['React', 'CSS', 'JavaScript'],
    img: 'https://images.pexels.com/photos/5632379/pexels-photo-5632379.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    title: 'Dashboard Admin',
    desc: 'Tableau de bord administratif pour la gestion des données et des utilisateurs.',
    tags: ['React', 'Node.js', 'Charts'],
    img: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    title: 'Portfolio Personnel',
    desc: 'Portfolio moderne avec animations et design futuriste pour présenter mes compétences.',
    tags: ['React', 'CSS', 'Vite'],
    img: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
]

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const { ref, visible } = useInView()
  return (
    <div ref={ref} className="skill-item" style={{ animationDelay: `${delay}ms` }}>
      <div className="skill-header">
        <span className="skill-name">{name}</span>
        <span className="skill-pct">{level}%</span>
      </div>
      <div className="skill-track">
        <div
          className="skill-fill"
          style={{ width: visible ? `${level}%` : '0%', transitionDelay: `${delay}ms` }}
        />
      </div>
    </div>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('Home')
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const handler = () => {
      const sections = NAV_LINKS.map(n => document.getElementById(n.toLowerCase()))
      const scrollY = window.scrollY + 120
      for (let i = sections.length - 1; i >= 0; i--) {
        const s = sections[i]
        if (s && s.offsetTop <= scrollY) {
          setActiveSection(NAV_LINKS[i])
          break
        }
      }
    }
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  function scrollTo(id: string) {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSent(true)
  }

  const heroInView = useInView(0.1)
  const aboutInView = useInView(0.1)
  const skillsInView = useInView(0.1)
  const projectsInView = useInView(0.1)
  const contactInView = useInView(0.1)

  return (
    <div className="portfolio">
      {/* Animated background orbs */}
      <div className="bg-orb orb1" />
      <div className="bg-orb orb2" />
      <div className="bg-orb orb3" />

      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-logo" onClick={() => scrollTo('home')}>
          <span className="logo-dot" />
          NB
        </div>
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {NAV_LINKS.map(link => (
            <li key={link}>
              <button
                className={`nav-link ${activeSection === link ? 'active' : ''}`}
                onClick={() => scrollTo(link)}
              >
                {link}
              </button>
            </li>
          ))}
        </ul>
        <button className="hamburger" onClick={() => setMenuOpen(m => !m)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>

      {/* Hero */}
      <section id="home" className="hero-section">
        <div ref={heroInView.ref} className={`hero-content fade-up ${heroInView.visible ? 'visible' : ''}`}>
          <div className="hero-tag">Web Developer & Business Specialist</div>
          <h1 className="hero-title">
            <span>Nouhayla</span>
            <span className="hero-name-accent">Barar</span>
          </h1>
          <p className="hero-sub">
            Technicienne Specialisee en Gestion des Entreprises &mdash; passionate about web development, creating elegant digital experiences.
          </p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={() => scrollTo('Projects')}>
              View Projects
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
            <button className="btn-outline" onClick={() => scrollTo('Contact')}>
              Contact Me
            </button>
          </div>
          <div className="hero-scroll">
            <span>Scroll</span>
            <div className="scroll-line" />
          </div>
        </div>
        <div className="hero-visual">
          <div className="orb-ring ring1" />
          <div className="orb-ring ring2" />
          <div className="orb-core">
            <img
              src="https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt="Nouhayla Barar"
              className="hero-photo"
            />
          </div>
          <div className="floating-chip chip1">React</div>
          <div className="floating-chip chip2">CSS</div>
          <div className="floating-chip chip3">JS</div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="section">
        <div ref={aboutInView.ref} className={`section-inner fade-up ${aboutInView.visible ? 'visible' : ''}`}>
          <div className="section-tag">About</div>
          <h2 className="section-title">About <span className="accent">Me</span></h2>
          <div className="about-grid">
            <div className="about-text">
              <p>
                I am <strong>Nouhayla Barar</strong>, a Technicienne Specialisee en Gestion des Entreprises from ISTA Tan-Tan. Currently expanding my expertise into web development to combine business management skills with modern digital solutions.
              </p>
              <p style={{ marginTop: '1rem' }}>
                With experience in customer relations at Hopital Hassan 2 and Wafa Assurance, I bring strong communication skills and a results-driven mindset to every project.
              </p>
              <div className="about-info-grid">
                <div className="info-item">
                  <span className="info-label">Email</span>
                  <span className="info-val">nouhaylabarar8@gmail.com</span>
                </div>
                <div className="info-item">
                  <span className="info-label">LinkedIn</span>
                  <span className="info-val">Nouhayla Barar</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Location</span>
                  <span className="info-val">Tan-Tan, Maroc</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Phone</span>
                  <span className="info-val">0762665450</span>
                </div>
              </div>
            </div>
            <div className="about-cards">
              <div className="about-card">
                <div className="card-icon">🎓</div>
                <h3>Formation</h3>
                <ul className="timeline-mini">
                  <li><span className="year">2020</span> Diplome Technicien Specialise en Gestion</li>
                  <li><span className="year">2019</span> Microsoft Office Specialist Master</li>
                  <li><span className="year">2017</span> DEUG en Litterature Francaise</li>
                  <li><span className="year">2015</span> Baccalaureat Sciences Humaines</li>
                </ul>
              </div>
              <div className="about-card">
                <div className="card-icon">💼</div>
                <h3>Experience</h3>
                <ul className="timeline-mini">
                  <li><span className="year">2020</span> Hopital Hassan 2 — Service SAA</li>
                  <li><span className="year">2023</span> Wafa Assurance — Suivi clients</li>
                  <li><span className="year">2019</span> Delegation Education — RH</li>
                </ul>
              </div>
              <div className="about-card lang-card">
                <div className="card-icon">🌐</div>
                <h3>Langues</h3>
                {LANGUAGES.map(l => (
                  <div key={l.name} className="lang-row">
                    <span>{l.name}</span>
                    <div className="lang-track">
                      <div className="lang-fill" style={{ width: `${l.level}%` }} />
                    </div>
                    <span className="lang-pct">{l.level}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="section section-alt">
        <div ref={skillsInView.ref} className={`section-inner fade-up ${skillsInView.visible ? 'visible' : ''}`}>
          <div className="section-tag">Expertise</div>
          <h2 className="section-title">My <span className="accent">Skills</span></h2>
          <p className="section-sub">Technical abilities and professional competencies developed over years of study and work experience.</p>
          <div className="skills-grid">
            {SKILLS.map((s, i) => (
              <SkillBar key={s.name} name={s.name} level={s.level} delay={i * 80} />
            ))}
          </div>
          <div className="soft-skills">
            {['Serieuse', 'Motivee', 'Ponctuelle', 'Esprit d\'equipe', 'Communication', 'Relation client'].map(s => (
              <span key={s} className="soft-tag">{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="section">
        <div ref={projectsInView.ref} className={`section-inner fade-up ${projectsInView.visible ? 'visible' : ''}`}>
          <div className="section-tag">Portfolio</div>
          <h2 className="section-title">My <span className="accent">Projects</span></h2>
          <p className="section-sub">A selection of web development projects showcasing my growing technical skills.</p>
          <div className="projects-grid">
            {PROJECTS.map((p, i) => (
              <div key={p.title} className="project-card" style={{ animationDelay: `${i * 120}ms` }}>
                <div className="project-img-wrap">
                  <img src={p.img} alt={p.title} className="project-img" />
                  <div className="project-overlay">
                    <button className="project-view-btn">View Details</button>
                  </div>
                </div>
                <div className="project-body">
                  <h3 className="project-title">{p.title}</h3>
                  <p className="project-desc">{p.desc}</p>
                  <div className="project-tags">
                    {p.tags.map(t => <span key={t} className="project-tag">{t}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section section-alt">
        <div ref={contactInView.ref} className={`section-inner fade-up ${contactInView.visible ? 'visible' : ''}`}>
          <div className="section-tag">Get in touch</div>
          <h2 className="section-title">Contact <span className="accent">Me</span></h2>
          <p className="section-sub">Have a project in mind? Let's work together to build something great.</p>
          <div className="contact-grid">
            <div className="contact-info">
              <div className="contact-card">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <div>
                  <div className="cinfo-label">Email</div>
                  <a href="mailto:nouhaylabarar8@gmail.com" className="cinfo-val">nouhaylabarar8@gmail.com</a>
                </div>
              </div>
              <div className="contact-card">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.72 6.72l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                <div>
                  <div className="cinfo-label">Phone</div>
                  <a href="tel:0762665450" className="cinfo-val">0762665450</a>
                </div>
              </div>
              <div className="contact-card">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                <div>
                  <div className="cinfo-label">LinkedIn</div>
                  <span className="cinfo-val">Nouhayla Barar</span>
                </div>
              </div>
            </div>
            <form className="contact-form" onSubmit={handleSubmit}>
              {sent ? (
                <div className="form-success">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  <p>Message sent successfully! I'll get back to you soon.</p>
                </div>
              ) : (
                <>
                  <div className="form-group">
                    <label>Your Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={formState.name}
                      onChange={e => setFormState(s => ({ ...s, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      value={formState.email}
                      onChange={e => setFormState(s => ({ ...s, email: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Message</label>
                    <textarea
                      rows={5}
                      placeholder="Tell me about your project..."
                      value={formState.message}
                      onChange={e => setFormState(s => ({ ...s, message: e.target.value }))}
                      required
                    />
                  </div>
                  <button type="submit" className="btn-primary btn-full">
                    Send Message
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/></svg>
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-logo">NB</div>
          <p className="footer-copy">© 2026 Nouhayla Barar. All rights reserved.</p>
          <div className="footer-links">
            {NAV_LINKS.map(l => (
              <button key={l} className="footer-link" onClick={() => scrollTo(l)}>{l}</button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
