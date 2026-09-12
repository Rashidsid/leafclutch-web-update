'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRevealAll } from '@/app/hooks/useReveal';
import TestimonialSection from '@/app/components/ui/TestimonialSection';
import { useAdmin } from '@/app/context/AdminContext';
import logoImg from '@/imports/leafclutch-technologies-pvt-ltd.image.logo-new.Woblo.png';

const services = [
  {
    name: 'Restaurant Management',
    slug: 'restaurant-management',
    desc: 'POS, table management, kitchen display & real-time reports.',
    color: '#11A4D4',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=500&q=80',
    icon: <path d="M8 21h8M9 21v-5M15 21v-5M6 10a4 4 0 018-1.8A4 4 0 0118 10c0 2-1.5 3.5-3 4.2V16H9v-1.8C7.5 13.5 6 12 6 10z" />,
  },
  {
    name: 'Pharmacy Management',
    slug: 'pharmacy-management',
    desc: 'Inventory, batch tracking, expiry alerts & prescriptions.',
    color: '#25D366',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=500&q=80',
    icon: <><rect x="4.5" y="4.5" width="15" height="15" rx="7.5" transform="rotate(45 12 12)" /><path d="M8.5 15.5l7-7" /></>,
  },
  {
    name: 'School Management',
    slug: 'school-management',
    desc: 'Students, exams, fees, parent portal — all in one ERP.',
    color: '#3B82F6',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=500&q=80',
    icon: <><path d="M12 3L2 8l10 5 10-5-10-5z" /><path d="M6 10.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-5.5" /><path d="M22 8v6" /></>,
  },
  {
    name: 'IT Training',
    slug: 'it-training',
    desc: 'Full stack, UI/UX, Django, CCNA — hands-on with experts.',
    color: '#072069',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=500&q=80',
    icon: <><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M2 20h20" /></>,
  },
  {
    name: 'Digital Solutions',
    slug: 'digital-technology',
    desc: 'Web, mobile, DevOps, AI and cybersecurity services.',
    color: '#0EA5E9',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=500&q=80',
    icon: <><path d="M12 2c3 2 5 6 5 10 0 2-1 4-2 5l-3 3-3-3c-1-1-2-3-2-5 0-4 2-8 5-10z" /><circle cx="12" cy="10" r="2" /><path d="M8 16l-3 5M16 16l3 5" /></>,
  },
  {
    name: 'LMS',
    slug: 'lms',
    desc: 'Next-gen learning management system — launching soon.',
    color: '#3BE3A0',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=500&q=80',
    icon: <><path d="M3 5c2-1 5-1 7 0v14c-2-1-5-1-7 0V5z" /><path d="M21 5c-2-1-5-1-7 0v14c2-1 5-1 7 0V5z" /></>,
    comingSoon: true,
  },
  {
    name: 'Black Service',
    slug: 'black-service',
    desc: 'Placeholder service — swap in real details when this line launches.',
    color: '#000000',
    image: 'https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?auto=format&fit=crop&w=500&q=80',
    icon: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" /></>,
    comingSoon: true,
  },
  {
    name: 'ABC Service',
    slug: 'abc-service',
    desc: 'Placeholder service — swap in real details when this line launches.',
    color: '#3B82F6',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=500&q=80',
    icon: <><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M8 9h8M8 13h8M8 17h5" /></>,
    comingSoon: true,
  },
];


export default function Home() {
  const [greeting, setGreeting] = useState('नमस्ते!');
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(true);
  const whyIntroRef = useRef<HTMLDivElement>(null);
  const aboutPanelRef = useRef<HTMLDivElement>(null);
  const servicesRowRef = useRef<HTMLDivElement>(null);
  const { services: managedServices } = useAdmin();
  const serviceCards = managedServices.map((service, index) => {
    const fallback = services.find(item => item.slug === service.id);
    return {
      name: service.title,
      slug: service.id,
      desc: service.description || fallback?.desc || 'Explore this solution from Leafclutch Technologies.',
      color: fallback?.color ?? ['#0EA5E9', '#25D366', '#3B82F6'][index % 3],
      image: service.heroImage || fallback?.image || '',
      icon: fallback?.icon ?? <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M7 9h10M7 13h7" /></>,
      comingSoon: service.status === 'coming_soon',
    };
  });

  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    const row = servicesRowRef.current;
    if (!row) return;
    let dragging = false;
    let dragged = false;
    let startX = 0;
    let startScroll = 0;
    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      dragged = false;
      startX = e.clientX;
      startScroll = row.scrollLeft;
      row.setPointerCapture(e.pointerId);
      row.classList.add('is-dragging');
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 5) dragged = true;
      row.scrollLeft = startScroll - dx;
    };
    const endDrag = () => { dragging = false; row.classList.remove('is-dragging'); };
    const onClickCapture = (e: MouseEvent) => {
      if (dragged) { e.preventDefault(); e.stopPropagation(); dragged = false; }
    };
    row.addEventListener('pointerdown', onPointerDown);
    row.addEventListener('pointermove', onPointerMove);
    row.addEventListener('pointerup', endDrag);
    row.addEventListener('pointercancel', endDrag);
    row.addEventListener('click', onClickCapture, true);
    return () => {
      row.removeEventListener('pointerdown', onPointerDown);
      row.removeEventListener('pointermove', onPointerMove);
      row.removeEventListener('pointerup', endDrag);
      row.removeEventListener('pointercancel', endDrag);
      row.removeEventListener('click', onClickCapture, true);
    };
  }, []);

  const scrollServices = (direction: 1 | -1) => {
    const row = servicesRowRef.current;
    if (!row) return;
    row.scrollBy({ left: direction * row.clientWidth * 0.85, behavior: 'smooth' });
  };

  useRevealAll();
  useEffect(() => { window.scrollTo(0, 0); }, []);
  useEffect(() => {
    if (!isContactPopupOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsContactPopupOpen(false);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [isContactPopupOpen]);
  useEffect(() => {
    const greetingTimer = setInterval(() => {
      setGreeting(current => current === 'नमस्ते!' ? 'स्वागत छ' : 'नमस्ते!');
    }, 1800);
    return () => clearInterval(greetingTimer);
  }, []);
  useEffect(() => {
    const section = whyIntroRef.current;
    const panel = aboutPanelRef.current;
    if (!section || !panel) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        panel.classList.remove('is-visible');
        void panel.offsetWidth; // force reflow so the animation restarts every time
        panel.classList.add('is-visible');
      } else {
        panel.classList.remove('is-visible');
      }
    }, { threshold: 0.35 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);
  return (
    <div className="bg-white">
      {/* ── HERO ── white bg, navy text, accent only on highlights */}
      <section className="landing-hero relative min-h-screen overflow-hidden flex items-center">
        <div className="landing-hero-grid absolute inset-0" />
        <div className="landing-hero-wash landing-hero-wash-blue absolute" />
        <div className="landing-hero-wash landing-hero-wash-green absolute" />
        <div className="landing-hero-rings absolute" />
        <div className="landing-hero-dots absolute" />
        <div className="landing-hero-art absolute" aria-hidden="true">
          <span className="landing-hero-bubble landing-hero-bubble-blue" />
          <span className="landing-hero-bubble landing-hero-bubble-teal" />
          <span className="landing-hero-bubble landing-hero-bubble-green" />
          <span className="landing-hero-wave landing-hero-wave-one" />
          <span className="landing-hero-wave landing-hero-wave-two" />
          <span className="landing-hero-wave landing-hero-wave-three" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 relative z-10 w-full">
          <div className="landing-hero-content grid lg:grid-cols-2 gap-16 items-center">

            {/* Left: copy */}
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#072069] border border-[#072069]/25 bg-[#072069]/5 px-4 py-2 rounded-full mb-8 animate-fade-up">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16D0AB] animate-pulse" />
                <span key={greeting} className="greeting-text">{greeting}</span>
              </div>

              <h1 className="text-[3.4rem] lg:text-[4.8rem] font-extrabold leading-[1.06] text-[#0F1729] animate-fade-up delay-100">
                We build<br />
                intelligent<br />
                <span className="text-[#072069]">Software & AI.</span>
              </h1>

              <p className="text-[#676F7E] text-lg mt-7 max-w-md leading-relaxed animate-fade-up delay-200">
                Leafclutch Technologies delivers <strong className="text-[#0F1729] font-semibold">mission-critical engineering</strong> and responsible AI automation tailored for enterprise scale.
              </p>

              <div className="flex flex-wrap gap-3 mt-10 animate-fade-up delay-300">
                <button type="button" onClick={scrollToServices} className="btn-navy font-semibold px-7 py-3.5 rounded-xl text-sm">
                  Explore Services →
                </button>
                <a href="mailto:info@leafclutchtech.com.np" className="btn-outline font-semibold px-7 py-3.5 rounded-xl text-sm">
                  Get In Touch
                </a>
              </div>

            </div>

            {/* Right: animated company logo */}
            <div className="landing-hero-logo-wrap flex items-center justify-center animate-fade-right delay-200">
              <div className="brand-loader-scene hero-logo-scene">
                <div className="brand-loader-glow" />
                <div className="brand-loader-orbit brand-loader-orbit-one">
                  <span className="brand-loader-dot brand-loader-dot-blue" />
                  <span className="brand-loader-dot brand-loader-dot-green" />
                  <span className="brand-loader-dot brand-loader-dot-cyan" />
                  <span className="brand-loader-dot brand-loader-dot-mint" />
                </div>
                <div className="brand-loader-orbit brand-loader-orbit-two">
                  <span className="brand-loader-dot brand-loader-dot-green" />
                  <span className="brand-loader-dot brand-loader-dot-blue" />
                </div>
                <div className="brand-loader-ring">
                  <img src={logoImg.src} alt="Leafclutch Technologies Pvt. Ltd." className="brand-loader-logo" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── clean white, card grid */}
      <section id="services" className="pt-8 pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
            <div className="reveal-left">
              <span className="section-badge mb-4">Our Services</span>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-[#0F1729] mt-4 leading-tight">
                Solutions built for<br />
                <span className="text-[#072069]">real impact</span>
              </h2>
            </div>
          </div>

          <div className="service-capsule-row-wrap">
            <button type="button" onClick={() => scrollServices(-1)} aria-label="Scroll services left" className="service-capsule-nav prev">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="service-capsule-row" ref={servicesRowRef}>
            {serviceCards.map((s, i) => (
              <div
                key={`${s.slug}-${i}`}
                className="service-capsule-float reveal"
                style={{ transitionDelay: `${i * 0.07}s`, animationDelay: `${i * 0.35}s` }}
              >
                <Link href={`/services/${s.slug}`} className="service-capsule group block bg-white" draggable={false}>
                  {s.comingSoon && (
                    <span className="absolute top-3 right-3 z-10 text-[10px] font-bold bg-[#3BE3A0]/90 text-white px-2.5 py-1 rounded-full shrink-0">Soon</span>
                  )}
                  <div className="service-capsule-media">
                    {s.image ? <img src={s.image} alt={s.name} draggable={false} /> : <span className="flex h-full items-center justify-center text-4xl">{s.name.slice(0, 1)}</span>}
                  </div>
                  <span className="service-capsule-badge" style={{ background: s.color }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                      {s.icon}
                    </svg>
                  </span>
                  <div className="service-capsule-body">
                    <h3 className="font-bold text-[#0F1729] text-[1.02rem] leading-snug group-hover:text-[#0EA5E9] transition-colors">{s.name}</h3>
                    <p className="text-[#676F7E] text-xs mt-2 leading-relaxed">{s.desc}</p>
                    <span className="service-capsule-arrow" style={{ background: s.color + '18', color: s.color }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </div>
            ))}
            </div>
            <button type="button" onClick={() => scrollServices(1)} aria-label="Scroll services right" className="service-capsule-nav next">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="why-us-section relative overflow-hidden bg-[#F8FAFC] py-24">
        <div className="absolute inset-0 hero-grid opacity-[0.22]" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div ref={whyIntroRef} className="why-us-intro mb-20 grid items-center gap-14 lg:grid-cols-[90px_minmax(0,1fr)]">
            <div className="hidden h-full flex-col items-center justify-center gap-6 lg:flex">
              <span className="why-us-vertical-label">Why work with us?</span>
              <span className="h-20 w-px bg-[#D9E0EA]" />
            </div>
            <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
              <div className="why-laptop-scene reveal-left">
                <div className="why-laptop-glow" />
                <div className="why-laptop">
                  <div className="why-laptop-screen">
                    <div className="flex items-center justify-between border-b border-[#D9E0EA] pb-3"><div className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-[#0EA5E9]" /><span className="text-xs font-bold text-[#0F1729]">Leafclutch OS</span></div><span className="text-[10px] text-[#676F7E]">Live workspace</span></div>
                    <div className="mt-4 grid grid-cols-3 gap-2">{['150+', '50+', '6+'].map((value, index) => <div key={value} className="rounded-lg bg-[#F8FAFC] p-2"><p className="text-sm font-bold text-[#072069]">{value}</p><p className="text-[8px] text-[#676F7E]">{['Projects', 'Clients', 'Years'][index]}</p></div>)}</div>
                    <div className="mt-4 rounded-lg bg-[#F8FAFC] p-3"><div className="mb-3 flex items-center justify-between"><span className="text-[10px] font-bold text-[#0F1729]">Delivery health</span><span className="text-[9px] font-semibold text-[#25D366]">98.4%</span></div><div className="flex h-16 items-end gap-1">{[35, 52, 44, 70, 58, 82, 76, 95, 88, 100].map((height, index) => <span key={index} className={`flex-1 rounded-t-sm ${index === 9 ? 'bg-[#0EA5E9]' : 'bg-[#D9EAF5]'}`} style={{ height: `${height}%` }} />)}</div></div>
                    <div className="mt-3 space-y-2">{['Restaurant platform', 'School ERP', 'AI automation'].map((label) => <div key={label} className="flex items-center gap-2 text-[9px] text-[#676F7E]"><span className="h-1.5 w-1.5 rounded-full bg-[#3BE3A0]" />{label}<span className="ml-auto font-semibold text-[#0EA5E9]">Active</span></div>)}</div>
                  </div>
                  <div className="why-laptop-base" />
                </div>
              </div>
              <div ref={aboutPanelRef} className="about-slide-panel"><span className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">About Leafclutch</span><h2 className="mt-5 text-3xl font-extrabold leading-tight text-white lg:text-5xl">Technology that moves your business forward.</h2><p className="mt-6 max-w-lg text-sm leading-relaxed text-white/80 lg:text-base">We combine deep engineering expertise with genuine care for your business outcomes. From management systems to digital transformation, we build secure, practical products that help teams work smarter.</p><div className="mt-8 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-white">Discover more <span className="h-px w-10 bg-white" /></div></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <TestimonialSection />

      {/* ── CTA STRIP ── */}
      <section className="py-20 bg-white border-t border-[#EBF0FA]">
        <div className="max-w-5xl mx-auto px-4 text-center reveal">
          <h2 className="text-3xl lg:text-5xl font-extrabold text-[#0F1729] leading-tight">
            Ready to build something{' '}
            <span className="text-[#072069]">extraordinary?</span>
          </h2>
          <p className="text-[#676F7E] mt-5 text-lg max-w-xl mx-auto">
            Let's talk about your project. Our team is ready to help you transform your vision into reality.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-10">
            <a href="mailto:info@leafclutchtech.com.np" className="btn-navy px-8 py-4 rounded-xl text-sm font-semibold">
              Start Your Project →
            </a>
            <button type="button" onClick={scrollToServices} className="btn-outline px-8 py-4 rounded-xl text-sm">
              View Services
            </button>
          </div>
        </div>
      </section>

      {/* WhatsApp float */}
      <a href="https://wa.me/9779766715768" target="_blank" rel="noopener noreferrer" className="whatsapp-float" aria-label="Chat on WhatsApp">
        <div className="whatsapp-ripple" />
        <svg viewBox="0 0 24 24" fill="white" width="26" height="26">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      {isContactPopupOpen && (
        <div className="contact-popup-backdrop" role="presentation" onMouseDown={() => setIsContactPopupOpen(false)}>
          <section className="contact-popup" role="dialog" aria-modal="true" aria-labelledby="contact-popup-title" onMouseDown={event => event.stopPropagation()}>
            <button type="button" className="contact-popup-close" aria-label="Close contact popup" onClick={() => setIsContactPopupOpen(false)}>×</button>
            <div className="contact-popup-copy">
              <img src={logoImg.src} alt="Leafclutch Technology" className="contact-popup-logo" />
              <span className="contact-popup-kicker">Have a question?</span>
              <h2 id="contact-popup-title">Let’s Build<br /><em>Your Ideas</em> Together</h2>
              <p>Have questions about our services? Talk to our team and get the right solution for your needs.</p>
              <div className="contact-popup-actions">
                <a href="tel:+9779815111199" className="contact-popup-call"><span aria-hidden="true">☎</span><strong>Call Us<small>+977-9815-1111-99</small></strong></a>
                <a href="https://wa.me/9779766715768" target="_blank" rel="noopener noreferrer" className="contact-popup-whatsapp"><span aria-hidden="true">◔</span><strong>WhatsApp Us<small>Chat with our team.</small></strong></a>
              </div>
              <div className="contact-popup-benefits"><span>✓ <b>Quick Response</b></span><span>✓ <b>Expert Guidance</b></span><span>✓ <b>Trusted Support</b></span><span>✓ <b>Growing Together</b></span></div>
              <div className="contact-popup-cta"><span>100% Free&nbsp; • &nbsp;No Obligation&nbsp; • &nbsp;Expert Advice</span><a href="mailto:info@leafclutchtech.com.np">Book a Free Consultation <b>↗</b></a></div>
            </div>
            <div className="contact-popup-visual">
              <img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1000&q=85" alt="Support team ready to help" />
              <div className="contact-popup-message message-one"><i />Hi! How can we help you today?</div>
              <div className="contact-popup-message message-two">Our team is online and ready to assist you! <b>•••</b></div>
              <div className="contact-popup-caption">♧ <span>Real People.<br />Real Support.</span></div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
