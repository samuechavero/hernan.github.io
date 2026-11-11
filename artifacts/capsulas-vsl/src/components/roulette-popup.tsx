import { useState, useEffect } from 'react';
import { X, Sparkles, Gift, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export interface RouletteOption {
  id: number;
  label: string;
  line1: string;
  line2: string;
  bgColor: string;
  textColor: string;
  accentColor?: string;
  isGrandPrize?: boolean;
}

export const ROULETTE_OPTIONS: RouletteOption[] = [
  {
    id: 0,
    label: 'Libro Cápsulas a Costo $0',
    line1: 'LIBRO CÁPSULAS',
    line2: 'A COSTO $0',
    bgColor: '#c6a45c', // Oro brillante / Gold
    textColor: '#171512',
    accentColor: '#ffe599',
    isGrandPrize: true,
  },
  {
    id: 1,
    label: '10% de Descuento',
    line1: '10% DE',
    line2: 'DESCUENTO',
    bgColor: '#1d1a16', // Carbón oscuro
    textColor: '#f3f0e9',
  },
  {
    id: 2,
    label: 'Asesoría Gratis',
    line1: 'ASESORÍA',
    line2: 'GRATIS',
    bgColor: '#7a1818', // Rojo casino profundo
    textColor: '#fdf3f3',
  },
  {
    id: 3,
    label: 'Envío Gratis',
    line1: 'ENVÍO',
    line2: 'GRATIS',
    bgColor: '#162238', // Azul noche
    textColor: '#e6efff',
  },
  {
    id: 4,
    label: '20% OFF',
    line1: '20% OFF',
    line2: 'EXTRA',
    bgColor: '#26221c', // Bronce / café profundo
    textColor: '#e8dfce',
  },
  {
    id: 5,
    label: 'Guía Digital Extra',
    line1: 'GUÍA DIGITAL',
    line2: 'DE REGALO',
    bgColor: '#0f3d2e', // Esmeralda casino
    textColor: '#e1f5ee',
  },
];

// Índice que SIEMPRE ganará ('Libro Cápsulas a Costo $0')
const TARGET_INDEX = 0;
const SPIN_DURATION_MS = 4500; // 4.5 segundos de rotación y suspenso
const FULL_ROTATIONS = 5; // 5 vueltas completas

interface RoulettePopupProps {
  ctaUrl?: string;
  delayMs?: number;
}

export function RoulettePopup({
  ctaUrl = 'https://wa.me/5493512695486?text=' +
    encodeURIComponent(
      '¡Hola Hernán! Giré la ruleta en la web y me gané el premio: Libro Cápsulas a Costo $0. Quiero reclamar mi ejemplar.',
    ),
  delayMs = 2500,
}: RoulettePopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [rotationDegrees, setRotationDegrees] = useState(0);

  // Aparición automática tras 2.5 segundos
  useEffect(() => {
    // Evitar volver a mostrar si ya se cerró en la misma sesión
    const hasSeenRoulette = sessionStorage.getItem('hasSeenRoulette');
    if (hasSeenRoulette) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, delayMs);

    return () => clearTimeout(timer);
  }, [delayMs]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('hasSeenRoulette', 'true');
  };

  /**
   * CÁLCULO MATEMÁTICO TRUCADO (Rigged Math):
   * La ruleta tiene 6 sectores de 60° cada uno (360 / 6 = 60°).
   * El sector 0 ('Libro Cápsulas a Costo $0') está dibujado centrado a 0° (en las 12 en punto / puntero superior).
   *
   * Cuando la ruleta gira en sentido horario por R grados:
   * El sector K (inicialmente en el ángulo K * 60°) termina en la posición: (K * 60° + R) mod 360°.
   * Para que el sector TARGET_INDEX quede exactamente debajo del puntero superior (12 en punto = 0°):
   *    (TARGET_INDEX * 60° + R) mod 360° = 0°
   * => R mod 360° = (360° - (TARGET_INDEX * 60°)) mod 360°
   *
   * Para agregar 5 vueltas completas de animación:
   *    R = (FULL_ROTATIONS * 360°) + ((360° - (TARGET_INDEX * 60°)) mod 360°)
   * Con TARGET_INDEX = 0:
   *    R = (5 * 360°) + 0° = 1800°
   *
   * Esto garantiza con 100% de precisión matemática que el puntero superior
   * SIEMPRE se detendrá en el centro exacto de 'Libro Cápsulas a Costo $0'.
   */
  const handleSpin = () => {
    if (isSpinning || hasWon) return;

    setIsSpinning(true);

    const segmentAngle = 360 / ROULETTE_OPTIONS.length; // 60°
    const offsetToTarget = (360 - TARGET_INDEX * segmentAngle) % 360;
    const totalRotation = FULL_ROTATIONS * 360 + offsetToTarget;

    setRotationDegrees(totalRotation);

    // Al finalizar la rotación (4.5s)
    setTimeout(() => {
      setIsSpinning(false);
      setHasWon(true);

      // Lanzar confeti festivo estilo casino
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#c6a45c', '#ffffff', '#ffd700', '#d0b16b', '#f3f0e9'],
        });

        setTimeout(() => {
          confetti({
            particleCount: 50,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#c6a45c', '#ffffff', '#e6c875'],
          });
          confetti({
            particleCount: 50,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#c6a45c', '#ffffff', '#e6c875'],
          });
        }, 250);
      } catch (err) {
        console.error('Confetti error:', err);
      }
    }, SPIN_DURATION_MS);
  };

  if (!isOpen) return null;

  const totalSlices = ROULETTE_OPTIONS.length;
  const sliceAngle = 360 / totalSlices; // 60°
  const radius = 140;
  const cx = 160;
  const cy = 160;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="roulette-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-300"
    >
      {/* Tarjeta del Modal */}
      <div className="relative w-full max-w-[440px] sm:max-w-[480px] overflow-hidden rounded-2xl border border-[#c6a45c]/40 bg-[#161411] p-5 sm:p-7 text-center shadow-[0_0_50px_rgba(198,164,92,0.25)]">
        {/* Botón cerrar */}
        <button
          onClick={handleClose}
          type="button"
          aria-label="Cerrar ventana de premios"
          className="absolute right-3.5 top-3.5 rounded-full border border-[#443c2c] bg-[#221e18] p-1.5 text-[#b0a99c] transition-colors hover:bg-[#342e24] hover:text-[#f3f0e9]"
        >
          <X size={18} />
        </button>

        {/* Encabezado */}
        <div className="mb-4">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#c6a45c]/35 bg-[#252017] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#e5ca8b]">
            <Sparkles size={12} className="text-[#c6a45c]" />
            Ruleta de Bienvenida
          </div>
          <h2
            id="roulette-title"
            className="mt-2.5 font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#f3f0e9]"
          >
            {hasWon ? (
              <span className="text-[#e8cf90]">¡Premio Exclusivo Desbloqueado!</span>
            ) : (
              <>
                Girá la Ruleta y <span className="text-[#d8b871]">Ganate tu Libro</span>
              </>
            )}
          </h2>
          <p className="mt-1 text-xs text-[#a9a293]">
            {hasWon
              ? 'Tenés 15 minutos para reclamar tu premio antes de que expire.'
              : 'Tenés 1 tirada bonificada disponible. ¡Probá tu suerte ahora!'}
          </p>
        </div>

        {/* Contenedor de la Ruleta */}
        <div className="relative mx-auto my-3 flex items-center justify-center">
          {/* Puntero Superior Casino */}
          <div className="pointer-events-none absolute -top-2.5 left-1/2 z-30 -translate-x-1/2 drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
            <div className="relative">
              {/* Aguja triangular apuntando hacia abajo */}
              <svg width="34" height="42" viewBox="0 0 34 42" fill="none">
                <path
                  d="M17 40L3 6C1.5 3 3.5 0 7 0H27C30.5 0 32.5 3 31 6L17 40Z"
                  fill="#ffffff"
                  stroke="#c6a45c"
                  strokeWidth="2.5"
                />
                <circle cx="17" cy="11" r="5" fill="#c6a45c" />
              </svg>
            </div>
          </div>

          {/* Anillo exterior decorativo con luces de casino */}
          <div className="relative rounded-full p-2.5 bg-gradient-to-b from-[#e5ca8b] via-[#8c6b29] to-[#3d2f12] shadow-[0_0_35px_rgba(198,164,92,0.35)]">
            {/* Luces LED perimetrales */}
            <div className="absolute inset-1 rounded-full border border-[#ffe599]/30 pointer-events-none" />

            {/* Ruleta giratoria SVG */}
            <div
              style={{
                transform: `rotate(${rotationDegrees}deg)`,
                transition: isSpinning
                  ? `transform ${SPIN_DURATION_MS}ms cubic-bezier(0.17, 0.97, 0.28, 1)`
                  : 'none',
              }}
              className="h-[270px] w-[270px] sm:h-[300px] sm:w-[300px] select-none rounded-full"
            >
              <svg
                viewBox="0 0 320 320"
                className="h-full w-full drop-shadow-md"
              >
                <defs>
                  {/* Gradiente dorado para el premio mayor */}
                  <linearGradient id="goldSlice" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f3da91" />
                    <stop offset="50%" stopColor="#c6a45c" />
                    <stop offset="100%" stopColor="#967733" />
                  </linearGradient>
                </defs>

                {/* Sectores de la Ruleta */}
                {ROULETTE_OPTIONS.map((slice, i) => {
                  const startAngle = i * sliceAngle - sliceAngle / 2; // -30° para slice 0
                  const endAngle = i * sliceAngle + sliceAngle / 2; // +30° para slice 0
                  const rad1 = ((startAngle - 90) * Math.PI) / 180;
                  const rad2 = ((endAngle - 90) * Math.PI) / 180;

                  const x1 = cx + radius * Math.cos(rad1);
                  const y1 = cy + radius * Math.sin(rad1);
                  const x2 = cx + radius * Math.cos(rad2);
                  const y2 = cy + radius * Math.sin(rad2);

                  const pathData = `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`;

                  // Ángulo central para el texto del sector
                  const midAngle = i * sliceAngle;

                  return (
                    <g key={slice.id}>
                      {/* Cuña del sector */}
                      <path
                        d={pathData}
                        fill={slice.isGrandPrize ? 'url(#goldSlice)' : slice.bgColor}
                        stroke="#2a241b"
                        strokeWidth="1.5"
                      />

                      {/* Texto del sector orientado radialmente */}
                      <g transform={`rotate(${midAngle}, ${cx}, ${cy})`}>
                        <text
                          x={cx}
                          y={cy - radius + 32}
                          fill={slice.textColor}
                          fontSize={slice.isGrandPrize ? '10' : '9.5'}
                          fontWeight={slice.isGrandPrize ? '900' : '700'}
                          letterSpacing="0.08em"
                          textAnchor="middle"
                          style={{ fontFamily: 'sans-serif' }}
                        >
                          {slice.line1}
                        </text>
                        <text
                          x={cx}
                          y={cy - radius + 46}
                          fill={slice.textColor}
                          fontSize={slice.isGrandPrize ? '11' : '9.5'}
                          fontWeight={slice.isGrandPrize ? '900' : '700'}
                          letterSpacing="0.08em"
                          textAnchor="middle"
                          style={{ fontFamily: 'sans-serif' }}
                        >
                          {slice.line2}
                        </text>

                        {/* Estrella dorada en el premio mayor */}
                        {slice.isGrandPrize && (
                          <text
                            x={cx}
                            y={cy - radius + 60}
                            fill="#171512"
                            fontSize="9"
                            textAnchor="middle"
                          >
                            ★ ★ ★
                          </text>
                        )}
                      </g>
                    </g>
                  );
                })}

                {/* Bulbos / Tachas perimetrales */}
                {Array.from({ length: 24 }).map((_, idx) => {
                  const angle = (idx * 360) / 24;
                  const rad = ((angle - 90) * Math.PI) / 180;
                  const bx = cx + (radius - 4) * Math.cos(rad);
                  const by = cy + (radius - 4) * Math.sin(rad);
                  return (
                    <circle
                      key={idx}
                      cx={bx}
                      cy={by}
                      r="2.5"
                      fill={idx % 2 === 0 ? '#ffffff' : '#ffd700'}
                      opacity="0.95"
                    />
                  );
                })}

                {/* Centro dorado de la ruleta */}
                <circle cx={cx} cy={cy} r="32" fill="#1b1812" stroke="#c6a45c" strokeWidth="3" />
                <circle cx={cx} cy={cy} r="26" fill="url(#goldSlice)" />
                <circle cx={cx} cy={cy} r="23" fill="#1b1812" />
                <text
                  x={cx}
                  y={cy - 2}
                  fill="#f3f0e9"
                  fontSize="7.5"
                  fontWeight="bold"
                  letterSpacing="0.16em"
                  textAnchor="middle"
                >
                  CÁPSULAS
                </text>
                <text
                  x={cx}
                  y={cy + 8}
                  fill="#d0b16b"
                  fontSize="6.5"
                  letterSpacing="0.14em"
                  textAnchor="middle"
                >
                  PREMIOS
                </text>
              </svg>
            </div>
          </div>
        </div>

        {/* Acciones / Botones según estado */}
        <div className="mt-5">
          {!hasWon ? (
            <button
              type="button"
              onClick={handleSpin}
              disabled={isSpinning}
              className={`gold-shimmer relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#d4b060] via-[#eed899] to-[#c6a45c] py-4 text-xs font-black uppercase tracking-[0.2em] text-[#191611] shadow-[0_4px_22px_rgba(212,176,96,0.35)] transition-all hover:scale-[1.02] active:scale-[0.98] ${
                isSpinning ? 'cursor-not-allowed opacity-80' : 'cursor-pointer'
              }`}
            >
              {isSpinning ? (
                <span className="inline-flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#191611] border-t-transparent" />
                  Girando la ruleta...
                </span>
              ) : (
                <span className="inline-flex items-center justify-center gap-2">
                  <Gift size={16} /> ¡GIRAR RULETA AHORA!
                </span>
              )}
            </button>
          ) : (
            <div className="animate-in zoom-in-95 duration-300">
              {/* Notificación de ganador */}
              <div className="mb-3.5 rounded-lg border border-[#c6a45c]/50 bg-[#252016] p-3 text-center">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#d6b76e]">
                  🎉 ¡Felicitaciones! Ganaste:
                </p>
                <p className="mt-1 font-serif text-lg font-bold text-[#fffdfa] sm:text-xl">
                  Libro Cápsulas a Costo $0
                </p>
                <p className="mt-0.5 text-[11px] text-[#b5ad9e]">
                  Cupón aplicado automáticamente en WhatsApp.
                </p>
              </div>

              {/* Botón Gigante de Llamado a la Acción */}
              <a
                href={ctaUrl}
                target="_blank"
                rel="noreferrer"
                className="gold-shimmer group relative flex w-full items-center justify-center gap-3 rounded-xl bg-[#c6a45c] px-6 py-4 text-sm font-black uppercase tracking-[0.16em] text-[#14120e] shadow-[0_0_28px_rgba(198,164,92,0.45)] transition-all hover:scale-[1.03] hover:bg-[#d6b76e] active:scale-[0.98]"
              >
                <span>¡Pedilo Ahora!</span>
                <ArrowRight size={19} className="transition-transform group-hover:translate-x-1" />
              </a>

              <p className="mt-2.5 text-[10px] uppercase tracking-[0.18em] text-[#857e72]">
                Hablá directo con Hernán para coordinar la entrega
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default RoulettePopup;
