export function Blades({ color = "#2F7D2B", base = "#2F7D2B" }) {
  const n = 72;
  return (
    <svg className="blades" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true" fill={color}>
      {Array.from({ length: n }, (_, i) => {
        const x = i * 20 + ((i * 7) % 9), h = 34 + ((i * 37) % 62), l = ((i * 13) % 21) - 10;
        return <path key={i} className="bl" style={{ "--d": `${i * 14}ms` }}
          d={`M${x} 120 Q${x + l} ${120 - h / 2} ${x + l * 1.6} ${120 - h} Q${x + 7 + l * 0.6} ${120 - h / 2} ${x + 12} 120Z`} />;
      })}
      <rect y="108" width="1440" height="12" fill={base} />
    </svg>
  );
}

export function HeroArt() {
  const tree = (x, y, s, c) => (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-5" y="0" width="10" height="48" rx="4" fill="#3A2B1F" />
      <circle cy="-8" r="38" fill={c} /><circle cx="-24" cy="12" r="26" fill={c} /><circle cx="24" cy="12" r="26" fill={c} />
    </g>
  );
  return (
    <svg className="art" viewBox="0 0 560 460" aria-hidden="true">
      <defs><radialGradient id="halo"><stop offset="0" stopColor="#E4F58A" stopOpacity=".5" /><stop offset="1" stopColor="#E4F58A" stopOpacity="0" /></radialGradient></defs>
      <circle cx="410" cy="120" r="150" fill="url(#halo)" />
      <circle cx="410" cy="120" r="46" fill="#E4F58A" />
      <path d="M0 300 Q150 220 310 275 T560 250 V460 H0Z" fill="#1E5524" />
      {tree(120, 232, 1, "#14391A")}{tree(470, 215, .8, "#14391A")}
      <path d="M0 360 Q190 290 350 340 T560 320 V460 H0Z" fill="#2F7D2B" />
      {tree(80, 322, .75, "#1E5524")}
      <path d="M0 420 Q200 370 390 405 T560 395 V460 H0Z" fill="#6DAE31" />
      <g className="spray" stroke="#CDEBFF" strokeWidth="3" fill="none" strokeLinecap="round" strokeDasharray="1 11">
        <path d="M300 372 Q325 305 370 372" /><path d="M300 372 Q345 285 415 372" /><path d="M300 372 Q312 335 336 372" />
      </g>
      <rect x="293" y="366" width="14" height="16" rx="3" fill="#E4F58A" />
    </svg>
  );
}
