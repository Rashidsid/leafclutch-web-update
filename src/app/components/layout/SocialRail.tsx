'use client'

const socialLinks = [
  {
    name: 'Facebook',
    href: '#',
    icon: <path d="M14 8h3V4h-3c-3.31 0-5 1.69-5 5v3H6v4h3v8h4v-8h3l1-4h-4V9c0-.67.33-1 1-1z" />,
  },
  {
    name: 'Instagram',
    href: '#',
    icon: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></>,
  },
  {
    name: 'LinkedIn',
    href: '#',
    icon: <><path d="M6 9v9M6 6.5v.01M10 18v-5a3 3 0 016 0v5M10 9v9" /><path d="M10 12a3 3 0 016 0v6" /></>,
  },
  {
    name: 'GitHub',
    href: '#',
    icon: <path d="M12 2a10 10 0 00-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.03a9.53 9.53 0 015 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.37.2 2.39.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .26.18.58.69.48A10 10 0 0012 2z" />,
  },
  {
    name: 'TikTok',
    href: '#',
    icon: <path d="M16.5 3c.3 1.8 1.4 3.3 3.5 3.6v3c-1.3 0-2.5-.4-3.5-1.1v6.6a5.4 5.4 0 11-5.4-5.4c.3 0 .6 0 .9.07v3.1a2.4 2.4 0 102 2.36V3h2.5z" />,
  },
]

export default function SocialRail() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <aside className="social-rail fixed z-60 bottom-4 left-4 flex items-center gap-2 rounded-full border border-[#D9E0EA] bg-white/95 px-2.5 py-2 shadow-lg backdrop-blur md:inset-y-0 md:bottom-auto md:left-0 md:top-0 md:w-18 md:flex-col md:justify-center md:gap-4 md:rounded-none md:border-y-0 md:border-l-0 md:border-r md:px-0 md:py-6 md:shadow-none">
      <span className="hidden select-none text-[10px] font-medium uppercase tracking-[0.3em] text-[#676F7E] [writing-mode:vertical-rl] md:block">Follow us</span>
      <div className="hidden h-12 w-px bg-[#D9E0EA] md:block" />
      <div className="flex items-center gap-2 md:flex-col md:gap-3">
        {socialLinks.map((social) => (
          <a
            key={social.name}
            href={social.href}
            aria-label={social.name}
            className="social-rail-link flex h-9 w-9 items-center justify-center rounded-full border border-[#D9E0EA] text-[#676F7E] transition-all hover:border-[#0EA5E9] hover:bg-[#0EA5E9] hover:text-white"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              {social.icon}
            </svg>
          </a>
        ))}
      </div>
      <button type="button" onClick={scrollToTop} aria-label="Scroll to top" className="social-scroll-link mt-5 hidden select-none flex-col items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-[#676F7E] transition-colors hover:text-[#0EA5E9] md:mt-8 md:flex">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 animate-bounce">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
        <span className="[writing-mode:vertical-rl]">Scroll</span>
      </button>
    </aside>
  )
}