import { ArrowDown, ArrowRight, BookOpen, Instagram, Menu, MessageCircle, Quote, X } from 'lucide-react';
import { useState } from 'react';
import { GiftWheelPopup } from '@/components/gift-wheel-popup';

const orderUrl = 'https://wa.me/5493512695486';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-[100dvh] overflow-hidden bg-[#171512] text-[#f3f0e9]">
      <header className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-10">
        <a href="#inicio" aria-label="Cápsulas, volver al inicio" className="font-serif text-xl tracking-[.13em] text-[#d0b16b]">CÁPSULAS<span className="text-[#f3f0e9]">.</span></a>
        <nav aria-label="Navegación principal" className="hidden items-center gap-9 text-[11px] uppercase tracking-[.18em] text-[#c0bbb0] md:flex">
          <a className="transition-colors hover:text-[#d0b16b]" href="#libro">El libro</a>
          <a className="transition-colors hover:text-[#d0b16b]" href="#autor">El autor</a>
          <a className="transition-colors hover:text-[#d0b16b]" href="#contacto">Contacto</a>
        </nav>
        <a href={orderUrl} target="_blank" rel="noreferrer" className="hidden items-center gap-2 border border-[#78643a] px-4 py-2.5 text-[10px] uppercase tracking-[.16em] text-[#e4ca8b] transition-colors hover:bg-[#c4a45d] hover:text-[#171512] sm:flex">
          <MessageCircle size={14} /> Pedir por WhatsApp
        </a>
        <button type="button" className="rounded-full p-2 text-[#e9e4d8] md:hidden" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </header>
      {menuOpen && <nav aria-label="Navegación móvil" className="absolute inset-x-0 top-[68px] z-30 border-y border-[#383329] bg-[#1d1a16] px-6 py-5 md:hidden">
        <div className="flex flex-col gap-5 text-xs uppercase tracking-[.18em] text-[#d9d3c7]">
          <a href="#libro" onClick={() => setMenuOpen(false)}>El libro</a><a href="#autor" onClick={() => setMenuOpen(false)}>El autor</a><a href="#contacto" onClick={() => setMenuOpen(false)}>Contacto</a>
          <a href={orderUrl} target="_blank" rel="noreferrer" className="text-[#d0b16b]">Pedir por WhatsApp <ArrowRight className="ml-1 inline" size={15} /></a>
        </div>
      </nav>}

      <section id="inicio" className="capsule-grain relative mx-auto grid min-h-[calc(100dvh-72px)] max-w-7xl items-center px-5 pb-16 pt-5 md:grid-cols-[1.04fr_.96fr] md:px-10 md:pb-20 md:pt-0">
        <div className="relative z-10 order-1 pb-8 md:order-1 md:py-14">
          <div className="rise-in mb-7 flex items-center justify-center gap-3 text-center text-[10px] uppercase tracking-[.24em] text-[#c6a45c]">
            <span className="h-px w-9 bg-[#9c8047]" />Una pausa para volver a lo esencial<span className="h-px w-9 bg-[#9c8047]" />
          </div>
          <h1 className="rise-in mx-auto max-w-[740px] text-center font-serif text-[clamp(2.5rem,7vw,5.75rem)] leading-[1.04] tracking-[-.035em] text-[#f3f0e9]" style={{ animationDelay: '.1s' }}>
            CÁPSULAS: ¿Estás viviendo con propósito o en modo automático?
          </h1>
          <div className="mx-auto mt-8 max-w-[560px]">
            <div className="relative aspect-video overflow-hidden border border-[#645231]/55 bg-[#100f0d] shadow-2xl">
              <video
                src="/hernan.mp4"
                controls
                playsInline
                preload="metadata"
                className="h-full w-full object-cover"
              >
                Tu navegador no soporta la reproducción de video.
              </video>
            </div>
          </div>
          <p className="mx-auto mt-7 max-w-[490px] text-center text-[15px] leading-7 text-[#bdb7ab] md:text-base">
            Una pregunta honesta puede cambiar la dirección de una vida. Veintidós reflexiones breves para detenerte, mirar de frente y volver a lo que permanece.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href={orderUrl} target="_blank" rel="noreferrer" className="gold-shimmer inline-flex min-h-14 items-center justify-center gap-3 bg-[#c6a45c] px-7 py-4 text-[12px] font-bold uppercase tracking-[.11em] text-[#1b1812] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e4ca8b]">
              Pedí tu libro ahora <ArrowRight size={17} />
            </a>
            <span className="text-xs text-[#898378]">Hablá directamente con Hernán</span>
          </div>
          <div className="mt-11 flex items-center justify-center gap-4 border-t border-[#39352d] pt-5 text-center text-[10px] uppercase tracking-[.17em] text-[#a29b8e]">
            <span className="flex items-center gap-2"><BookOpen size={14} className="text-[#c6a45c]" /> 22 dosis de fe sin filtro</span>
            <span className="h-1 w-1 rounded-full bg-[#927c4c]" />
            <span>Una lectura para hacer propia</span>
          </div>
        </div>
        <div className="relative order-2 flex min-h-[350px] items-center justify-center md:order-2 md:min-h-[650px]">
          <div className="absolute left-1/2 top-1/2 h-[88%] w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(171,132,55,.15),transparent_68%)]" />
          <div className="absolute left-1/2 top-1/2 h-[78%] w-[70%] -translate-x-1/2 -translate-y-1/2 border border-[#645231]/25" />
          <div className="absolute left-1/2 top-1/2 h-[62%] w-[55%] -translate-x-1/2 -translate-y-1/2 border border-[#645231]/20" />
          <div className="relative w-[53%] max-w-[350px] -rotate-[3deg] md:w-[48%]">
            <img src="/assets/capsulas-cover.png" alt="Tapa del libro Cápsulas, de Hernán Brito" className="relative z-10 block h-auto w-full object-contain shadow-[18px_22px_45px_rgba(0,0,0,.62)]" />
            <div className="absolute -bottom-5 left-[10%] right-[6%] h-8 rounded-[50%] bg-[#c69b41]/20 blur-xl" />
          </div>
          <div className="absolute left-[4%] top-[16%] font-serif text-5xl text-[#c6a45c]/60">“</div>
        </div>
        <a href="#libro" aria-label="Descubrir el libro" className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[9px] uppercase tracking-[.25em] text-[#8d867a] md:flex">Seguí leyendo <ArrowDown size={13} /></a>
      </section>

      <section id="libro" className="border-y border-[#39352d] bg-[#201d18]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:grid-cols-[.72fr_1.28fr] md:gap-24 md:px-10 md:py-28">
          <div>
            <p className="text-[10px] uppercase tracking-[.25em] text-[#c6a45c]">01 / El libro</p>
            <h2 className="mt-6 max-w-sm font-serif text-4xl leading-[1.16] tracking-[-.025em] md:text-[3.25rem]">No es otra voz de fondo.</h2>
            <p className="mt-5 max-w-xs text-sm leading-6 text-[#aaa397]">Es una invitación a detener el ruido y escuchar con atención lo que tu vida está diciendo.</p>
            <div className="mt-8 h-px w-16 bg-[#9b804a]" />
          </div>
          <div className="max-w-2xl">
            <Quote size={22} strokeWidth={1.3} className="mb-5 text-[#c6a45c]" />
            <p className="font-serif text-[clamp(1.3rem,2.6vw,2rem)] leading-[1.65] text-[#e8e3d9]">
              Cápsulas es una llamada de atención directa y al corazón. A través de reflexiones breves pero contundentes, te confrontará con preguntas que muchos esquivan y te dará herramientas reales para fundamentar tu vida sobre la única Verdad que no tambalea: la Biblia. Tenés en tus manos 22 dosis de fe sin filtro.
            </p>
            <a href={orderUrl} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-3 border-b border-[#a88a4b] pb-2 text-xs uppercase tracking-[.15em] text-[#ddc17d] transition-colors hover:text-[#f2dfa8]">Quiero leer Cápsulas <ArrowRight size={15} /></a>
          </div>
        </div>
      </section>

      <section id="autor" className="relative overflow-hidden border-y border-[#39352d] bg-[#201d18]">
        <div className="mx-auto grid max-w-7xl items-center gap-0 px-5 md:grid-cols-[.9fr_1.1fr] md:px-10">
          <div className="relative order-2 py-14 md:order-1 md:py-24 md:pr-16">
            <p className="text-[10px] uppercase tracking-[.25em] text-[#c6a45c]">02 / El autor</p>
            <h2 className="mt-6 font-serif text-4xl leading-tight tracking-[-.025em] md:text-5xl">Una vida, una búsqueda, una voz.</h2>
            <p className="mt-7 max-w-xl text-[15px] leading-7 text-[#c3bdb1]">
              Mi nombre es Hernán Brito, conocido cariñosamente como «el Perro». Soy cordobés, abogado y un apasionado de los estudios teológicos. Estoy felizmente casado con mi amada esposa Cintia, con quien compartimos la aventura de ser papás de Felipe.
            </p>
            <div className="mt-8 flex items-center gap-3 text-xs text-[#a7a093]"><span className="h-px w-9 bg-[#9b804a]" />Córdoba, Argentina</div>
            <a href="https://www.facebook.com/hernanelias.brito.1?locale=es_LA" target="_blank" rel="noreferrer" aria-label="Facebook de Hernán Brito" className="mt-7 inline-flex items-center gap-2 text-xs text-[#d3ba7f] hover:text-[#f0daa4]"><span className="grid h-8 w-8 place-items-center border border-[#665638] font-bold">f</span> Conocé más de Hernán <ArrowRight size={14} /></a>
          </div>
          <figure className="relative order-1 h-[360px] overflow-hidden md:order-2 md:h-[620px]">
            <img src="/assets/hernan-speaking.jpg" alt="Hernán Brito compartiendo una reflexión en un escenario" className="h-full w-full object-cover object-[center_37%] grayscale-[.12]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#201d18] via-transparent to-[#201d18]/15 md:bg-gradient-to-r md:from-[#201d18]/60 md:via-transparent md:to-transparent" />
            <figcaption className="absolute bottom-5 right-5 text-[9px] uppercase tracking-[.22em] text-white/75">Hernán Brito — compartiendo una reflexión</figcaption>
          </figure>
        </div>
      </section>

      <section id="contacto" className="capsule-grain relative overflow-hidden">
        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-start justify-between gap-10 px-5 py-20 md:flex-row md:items-center md:px-10 md:py-24">
          <div><p className="text-[10px] uppercase tracking-[.25em] text-[#c6a45c]">El próximo paso es una conversación</p><h2 className="mt-5 max-w-2xl font-serif text-4xl leading-tight md:text-5xl">Si algo de esto te habló, escribime.</h2><p className="mt-4 text-sm text-[#aaa397]">Preguntá por tu ejemplar. Sin vueltas.</p></div>
          <a href={orderUrl} target="_blank" rel="noreferrer" className="gold-shimmer inline-flex min-h-14 shrink-0 items-center justify-center gap-3 bg-[#c6a45c] px-7 py-4 text-[12px] font-bold uppercase tracking-[.11em] text-[#1b1812] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e4ca8b]">Pedí tu libro ahora <ArrowRight size={17} /></a>
        </div>
      </section>

      <footer className="border-t border-[#39352d] bg-[#11100e]">
        <div className="mx-auto flex max-w-7xl flex-col gap-7 px-5 py-8 md:flex-row md:items-center md:justify-between md:px-10">
          <div><a href="#inicio" className="font-serif text-lg tracking-[.13em] text-[#d0b16b]">CÁPSULAS<span className="text-[#f3f0e9]">.</span></a><p className="mt-2 text-[10px] tracking-[.04em] text-[#817c72]">Una invitación a vivir despierto.</p></div>
          <div className="flex flex-col gap-2 text-xs text-[#aaa397] sm:flex-row sm:items-center sm:gap-6">
            <a href={orderUrl} target="_blank" rel="noreferrer" aria-label="Contactar a Hernán por WhatsApp" className="inline-flex items-center gap-2 transition-colors hover:text-[#e3c77d]"><MessageCircle size={14} /> WhatsApp: +54 9 3512 69-5486</a>
            <a href="https://www.facebook.com/hernanelias.brito.1?locale=es_LA" target="_blank" rel="noreferrer" className="transition-colors hover:text-[#e3c77d]">Facebook</a>
            <a href="https://www.instagram.com/hernanelperro/" target="_blank" rel="noreferrer" aria-label="Instagram de Hernán Brito" className="inline-flex items-center gap-2 transition-colors hover:text-[#e3c77d]"><Instagram size={14} /> Instagram</a>
          </div>
          <p className="text-[10px] text-[#726d64]">© 2026 Hernán Brito. Todos los derechos reservados.</p>
        </div>
      </footer>

      {/* Modal Popup Interactivo de Regalos */}
      <GiftWheelPopup />
    </main>
  );
}

export default App;
