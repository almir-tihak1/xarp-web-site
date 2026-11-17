// Lightbulb mark from the Xarp Tec logo, defined once and reused via <use href="#bulb" />.
export default function BulbSprite() {
  return (
    <svg className="sprite" aria-hidden="true">
      <symbol id="bulb" viewBox="0 0 40 46">
        <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 9.5a10 10 0 0 0-5.6 18.3c1 .7 1.6 1.8 1.6 3v1.7h8v-1.7c0-1.2.6-2.3 1.6-3A10 10 0 0 0 20 9.5z" />
          <path d="M18 32.5v-6l2-2 2 2v6" />
          <path d="M15.5 36h9M16.5 39h7M18 42h4" />
          <path d="M20 2v3.5M8 7l2.5 2.5M32 7l-2.5 2.5M2 19.5h4M34 19.5h4M5.5 30l3-1.5M34.5 30l-3-1.5" />
        </g>
      </symbol>
    </svg>
  );
}
