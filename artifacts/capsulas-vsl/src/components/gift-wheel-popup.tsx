import { useState, useEffect } from 'react';
import { X, Gift, Sparkles, ArrowRight, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

export interface GiftOption {
  id: number;
  label: string;
  line1: string;
  line2: string;
  bgColor: string;
  textColor: string;
  isGrandGift?: boolean;
}

export const GIFT_OPTIONS: GiftOption[] = [
  {
    id: 0,
    label: 'Libro Cápsulas a Costo $0',
    line1: 'LIBRO CÁPSULAS',
    line2: 'A COSTO $0',
    bgColor: '#c6a45c', // Oro cálido editorial
    textColor: '#171512',
    isGrandGift: true,
  },
  {
    id: 1,
    label: 'Audio Exclusivo',
    line1: 'AUDIO',
    line2: 'EXCLUSIVO',
    bgColor: '#1d1a16', // Carbón suave
    textColor: '#e8e2d5',
  },
  {
    id: 2,
    label: 'Recurso en PDF',
    line1: 'RECURSO',
    line2: 'EN PDF',
    bgColor: '#2a251e', // Café cálido profundo
    textColor: '#e8e2d5',
  },
  {
    id: 3,
    label: 'Acceso a Comunidad',
    line1: 'ACCESO A',
    line2: 'COMUNIDAD',
    bgColor: '#181b22', // Azul pizarra oscuro
    textColor: '#e8e2d5',
  },
  {
    id: 4,
    label: 'Fondo de Pantalla',
    line1: 'FONDO DE',
    line2: 'PANTALLA',
    bgColor: '#231e18', // Bronce mate
    textColor: '#e8e2d5',
  },
  {
    id: 5,
    label: 'Capítulo de Muestra',
    line1: 'CAPÍTULO DE',
    line2: 'MUESTRA',
    bgColor: '#1e2621', // Verde pino sosegado
    textColor: '#e8e2d5',
  },
];

// Índice del regalo asignado ('Libro Cápsulas a Costo $0')
const TARGET_INDEX = 0;
const SPIN_DURATION_MS = 4000; // 4 segundos de suspenso suave
const FULL_ROTATIONS = 5; // 5 giros completos

interface GiftWheelPopupProps {
  ctaUrl?: string;
  delayMs?: number;
}

export function GiftWheelPopup({
  ctaUrl = 'https://wa.me/5493512695486?text=' +
    encodeURIComponent(
      '¡Hola Hernán! Entré a la web y descubrí mi regalo especial: Libro Cápsulas a Costo $0. ¡Quiero coordinar la entrega de mi ejemplar!',
    ),
  delayMs = 2500,
}: GiftWheelPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [rotationDegrees, setRotationDegrees] = useState(0);

  // Mostrar automáticamente tras 2.5 segundos
  useEffect(() => {
    const hasSeenGift = sessionStorage.getItem('hasSeenGiftWheel');
    if (hasSeenGift) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, delayMs);

    return () => clearTimeout(timer);
  }, [delayMs]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('hasSeenGiftWheel', 'true');
  };

  /**
   * LÓGICA DE ROTACIÓN DETERMINISTA:
   * La rueda tiene 6 sectores de 60° cada uno (360° / 6 = 60°).
   * El sector del 'Libro Cápsulas a Costo $0' (índice 0) está centrado en las 12 en punto (0°).
   *
   * Para 5 vueltas completas:
   * Ángulo base = 5 * 360° = 1800°.
   * Se añade una sutil variación aleatoria entre -5° y +5° para que el puntero
   * no frene siempre en el milímetro exacto central, luciendo 100% natural,
   * pero asegurando que permanezca holgadamente dentro del sector de 60° (-30° a +30°).
   */
  const handleSpin = () => {
    if (isSpinning || hasWon) return;

    setIsSpinning(true);

    const segmentAngle = 360 / GIFT_OPTIONS.length; // 60°
    const offsetToTarget = (360 - TARGET_INDEX * segmentAngle) % 360;

    // Variación sutil de +/- 5 grados para apariencia natural
    const naturalJitter = (Math.random() - 0.5) * 10; // [-5°, +5°]
    const totalRotation = FULL_ROTATIONS * 360 + offsetToTarget + naturalJitter;

    setRotationDegrees(totalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setHasWon(true);

      // Efecto sutil y festivo de confeti en tonos dorados y cálidos
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.65 },
          colors: ['#c6a45c', '#ffffff', '#e2caa0', '#d8bc78'],
          disableForReducedMotion: true,
        });
      } catch (err) {
        console.error('Confetti error:', err);
      }
    }, SPIN_DURATION_MS);
  };

  if (!isOpen) return null;

  const totalSlices = GIFT_OPTIONS.length;
  const sliceAngle = 360 / totalSlices; // 60°
  const radius = 140;
  const cx = 160;
  const cy = 160;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="gift-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300"
    >
      {/* Tarjeta del Modal */}
      <div className="relative w-full max-w-[440px] sm:max-w-[470px] overflow-hidden rounded-2xl border border-[#c6a45c]/35 bg-[#171512] p-5 sm:p-7 text-center shadow-[0_20px_60px_rgba(0,0,0,0.85)]">
        {/* Botón cerrar */}
        <button
          onClick={handleClose}
          type="button"
          aria-label="Cerrar ventana de regalo"
          className="absolute right-3.5 top-3.5 rounded-full border border-[#3f382c] bg-[#211d17] p-1.5 text-[#b3ac9f] transition-colors hover:bg-[#322c22] hover:text-[#f3f0e9]"
        >
          <X size={18} />
        </button>

        {/* Encabezado */}
        <div className="mb-4">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#c6a45c]/30 bg-[#231e16] px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#d9bc7b]">
            <Gift size={12} className="text-[#c6a45c]" />
            Regalo Especial de Bienvenida
          </div>
          <h2
            id="gift-title"
            className="mt-2.5 font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#f3f0e9]"
          >
            {hasWon ? (
              <span className="text-[#e2c788]">¡Tenemos un regalo para vos!</span>
            ) : (
              '¡Descubrí tu regalo especial!'
            )}
          </h2>
          <p className="mt-1.5 text-xs leading-relaxed text-[#b0a99c]">
            {hasWon
              ? 'Hernán reservó una copia especial de Cápsulas para tu vida.'
              : 'Queremos acompañarte en tu lectura. Hacé girar la rueda y revelá el detalle que preparamos para vos.'}
          </p>
        </div>

        {/* Contenedor de la Rueda de Regalos */}
        <div className="relative mx-auto my-3 flex items-center justify-center">
          {/* Puntero Superior Editorial Elegante */}
          <div className="pointer-events-none absolute -top-3 left-1/2 z-30 -translate-x-1/2 drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]">
            <svg width="30" height="36" viewBox="0 0 30 36" fill="none">
              <path
                d="M15 34L4 6C2.5 3 4.5 0 8 0H22C25.5 0 27.5 3 26 6L15 34Z"
                fill="#f3f0e9"
                stroke="#c6a45c"
                strokeWidth="2.5"
              />
              <circle cx="15" cy="10" r="4" fill="#c6a45c" />
            </svg>
          </div>

          {/* Anillo decorativo sobrio y refinado */}
          <div className="relative rounded-full p-2 bg-gradient-to-b from-[#b8944d] via-[#665023] to-[#241c0e] shadow-[0_8px_32px_rgba(0,0,0,0.65)]">
            {/* Rueda giratoria SVG */}
            <div
              style={{
                transform: `rotate(${rotationDegrees}deg)`,
                transition: isSpinning
                  ? `transform ${SPIN_DURATION_MS}ms cubic-bezier(0.17, 0.97, 0.28, 1)`
                  : 'none',
              }}
              className="h-[270px] w-[270px] sm:h-[295px] sm:w-[295px] select-none rounded-full"
            >
              <svg viewBox="0 0 320 320" className="h-full w-full">
                <defs>
                  {/* Gradiente dorado suave para el libro */}
                  <linearGradient id="warmGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#eed48c" />
                    <stop offset="50%" stopColor="#c6a45c" />
                    <stop offset="100%" stopColor="#a3823d" />
                  </linearGradient>
                </defs>

                {/* Sectores de la Rueda */}
                {GIFT_OPTIONS.map((slice, i) => {
                  const startAngle = i * sliceAngle - sliceAngle / 2;
                  const endAngle = i * sliceAngle + sliceAngle / 2;
                  const rad1 = ((startAngle - 90) * Math.PI) / 180;
                  const rad2 = ((endAngle - 90) * Math.PI) / 180;

                  const x1 = cx + radius * Math.cos(rad1);
                  const y1 = cy + radius * Math.sin(rad1);
                  const x2 = cx + radius * Math.cos(rad2);
                  const y2 = cy + radius * Math.sin(rad2);

                  const pathData = `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`;
                  const midAngle = i * sliceAngle;

                  return (
                    <g key={slice.id}>
                      <path
                        d={pathData}
                        fill={slice.isGrandGift ? 'url(#warmGoldGradient)' : slice.bgColor}
                        stroke="#2f2921"
                        strokeWidth="1.5"
                      />

                      {/* Texto del sector orientado radialmente */}
                      <g transform={`rotate(${midAngle}, ${cx}, ${cy})`}>
                        <text
                          x={cx}
                          y={cy - radius + 32}
                          fill={slice.textColor}
                          fontSize={slice.isGrandGift ? '10' : '9.5'}
                          fontWeight={slice.isGrandGift ? '900' : '700'}
                          letterSpacing="0.07em"
                          textAnchor="middle"
                          style={{ fontFamily: 'sans-serif' }}
                        >
                          {slice.line1}
                        </text>
                        <text
                          x={cx}
                          y={cy - radius + 46}
                          fill={slice.textColor}
                          fontSize={slice.isGrandGift ? '10.5' : '9.5'}
                          fontWeight={slice.isGrandGift ? '900' : '700'}
                          letterSpacing="0.07em"
                          textAnchor="middle"
                          style={{ fontFamily: 'sans-serif' }}
                        >
                          {slice.line2}
                        </text>
                        {slice.isGrandGift && (
                          <text
                            x={cx}
                            y={cy - radius + 59}
                            fill="#171512"
                            fontSize="8"
                            fontWeight="bold"
                            letterSpacing="0.12em"
                            textAnchor="middle"
                          >
                            ★ REGALO ESPECIAL ★
                          </text>
                        )}
                      </g>
                    </g>
                  );
                })}

                {/* Centro refinado de la rueda */}
                <circle cx={cx} cy={cy} r="32" fill="#171512" stroke="#c6a45c" strokeWidth="2.5" />
                <circle cx={cx} cy={cy} r="25" fill="#221e17" />
                <text
                  x={cx}
                  y={cy - 1}
                  fill="#f3f0e9"
                  fontSize="7.5"
                  fontWeight="bold"
                  letterSpacing="0.18em"
                  textAnchor="middle"
                >
                  CÁPSULAS
                </text>
                <text
                  x={cx}
                  y={cy + 9}
                  fill="#c6a45c"
                  fontSize="6.5"
                  letterSpacing="0.14em"
                  textAnchor="middle"
                >
                  REGALOS
                </text>
              </svg>
            </div>
          </div>
        </div>

        {/* Acciones según el estado */}
        <div className="mt-5">
          {!hasWon ? (
            <button
              type="button"
              onClick={handleSpin}
              disabled={isSpinning}
              className={`gold-shimmer relative w-full overflow-hidden rounded-xl bg-[#c6a45c] py-4 text-xs font-bold uppercase tracking-[0.2em] text-[#171512] shadow-[0_4px_20px_rgba(198,164,92,0.3)] transition-all hover:bg-[#d6b76e] hover:scale-[1.02] active:scale-[0.98] ${
                isSpinning ? 'cursor-not-allowed opacity-80' : 'cursor-pointer'
              }`}
            >
              {isSpinning ? (
                <span className="inline-flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#171512] border-t-transparent" />
                  Descubriendo tu regalo...
                </span>
              ) : (
                <span className="inline-flex items-center justify-center gap-2">
                  <Sparkles size={16} /> Descubrir regalo
                </span>
              )}
            </button>
          ) : (
            <div className="animate-in zoom-in-95 duration-300">
              {/* Tarjeta de Celebración */}
              <div className="mb-3.5 rounded-xl border border-[#c6a45c]/40 bg-[#211c14] p-3.5 text-center">
                <p className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#d9bc7b]">
                  <Heart size={13} className="text-[#c6a45c] fill-[#c6a45c]" /> ¡Felicidades! Te llevás el:
                </p>
                <p className="mt-1 font-serif text-xl font-bold text-[#f3f0e9]">
                  Libro Cápsulas a Costo $0
                </p>
                <p className="mt-1 text-xs text-[#a9a293]">
                  Queremos que este mensaje llegue a tus manos sin barreras.
                </p>
              </div>

              {/* Botón Gigante '¡Pedilo Ahora!' listo para el link del embudo */}
              <a
                href={ctaUrl}
                target="_blank"
                rel="noreferrer"
                className="gold-shimmer group relative flex w-full items-center justify-center gap-3 rounded-xl bg-[#c6a45c] px-6 py-4 text-sm font-black uppercase tracking-[0.16em] text-[#171512] shadow-[0_0_26px_rgba(198,164,92,0.4)] transition-all hover:scale-[1.03] hover:bg-[#d6b76e] active:scale-[0.98]"
              >
                <span>¡Pedilo Ahora!</span>
                <ArrowRight size={19} className="transition-transform group-hover:translate-x-1" />
              </a>

              <p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-[#837b6f]">
                Hablá directamente con Hernán por WhatsApp para coordinar tu envío
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default GiftWheelPopup;
