// An original, stylised stand-in character in a hard-edged ink style: black, white and blue, halftone shading,
// a cut-out white edge. It is a placeholder. Swap this component for your own art when you have it.
const INK = '#050505'
const PAPER = '#f5f5f0'
const BLUE = '#1138ff'
const NAVY = '#050505'
const HEAD = 'rotate(-6 300 340)'

const BODY = '14,820 44,640 128,556 215,505 385,495 472,545 548,636 586,820'
const NECK = '254,430 354,414 362,526 248,534'
const FACE = '196,236 202,326 230,396 296,454 350,442 396,396 416,322 410,240'
const EAR = '192,296 166,288 158,330 184,348'
const HAIR =
  'M198 300 C184 262 190 214 214 182 C244 148 300 130 356 134 C412 138 446 176 446 224 C446 242 440 256 432 266 C414 250 388 244 362 252 C336 262 312 262 286 252 C262 244 238 256 224 282 Z'
const LOCKS = ['252,156 266,128 298,144', '304,140 332,114 356,138', '358,140 390,122 408,156']

export default function Character() {
  return (
    <svg className="character" viewBox="0 0 600 820" aria-hidden="true" focusable="false">
      <defs>
        <pattern id="ch-dots" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(28)">
          <circle cx="4.5" cy="4.5" r="2.3" fill={INK} />
        </pattern>
        <g id="ch-sil">
          <polygon points={BODY} />
          <polygon points={NECK} />
          <g transform={HEAD}>
            <polygon points={FACE} />
            <polygon points={EAR} />
            <path d={HAIR} />
            {LOCKS.map((l) => (
              <polygon key={l} points={l} />
            ))}
          </g>
        </g>
      </defs>

      {/* cut-out edge: the same shapes with a fat white stroke, then solid ink on top */}
      <use href="#ch-sil" fill="#fff" stroke="#fff" strokeWidth="28" strokeLinejoin="round" />
      <use href="#ch-sil" fill={INK} />

      {/* neck */}
      <polygon points="258,440 352,420 360,520 252,528" fill={PAPER} />
      <polygon points="270,452 356,424 360,474 284,488" fill={NAVY} />

      {/* jacket: blue panel with halftone, shoulder highlights */}
      <polygon points="58,700 128,600 214,522 242,566 172,646 104,770" fill={BLUE} />
      <polygon points="58,700 128,600 214,522 242,566 172,646 104,770" fill="url(#ch-dots)" opacity="0.55" />
      <polygon points="128,562 214,512 226,522 138,576" fill="#fff" />
      <polygon points="384,500 472,550 462,562 380,514" fill="#fff" />
      <polygon points="470,620 520,690 500,760 448,700" fill={BLUE} />

      {/* shirt, tie */}
      <polygon points="262,512 352,496 300,690" fill={PAPER} />
      <polygon points="292,540 330,530 344,622 306,704 276,614" fill={BLUE} />
      <polygon points="318,534 330,530 344,622 306,704 312,610" fill={NAVY} />
      <polygon points="290,536 332,528 330,552 292,560" fill={INK} />

      {/* collars: pointed ink flaps with a white edge only along the neck line */}
      <polygon points="176,462 262,512 270,606 214,640 140,556" fill={INK} />
      <polygon points="426,452 352,498 342,606 396,634 462,548" fill={INK} />
      <path d="M176 462 L262 512 L270 606" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M426 452 L352 498 L342 606" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />

      {/* hard shadow plane across the lower left of the coat, with halftone edge, plus rim lights */}
      <polygon points="14,820 44,660 150,700 230,780 250,820" fill={INK} />
      <polygon points="44,660 150,700 230,780 250,820 214,820 138,730 40,700" fill="url(#ch-dots)" opacity="0.6" />
      <path d="M44 640 L128 556 L215 505" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M385 495 L472 545 L548 636" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />

      {/* head */}
      <g transform={HEAD}>
        <polygon points={EAR} fill={PAPER} stroke={INK} strokeWidth="4" strokeLinejoin="round" />
        <polygon points={FACE} fill={PAPER} />
        {/* light blue shade down the near cheek, blue halftone on the far side */}
        <polygon points="204,330 232,398 266,408 240,352" fill={BLUE} opacity="0.25" />
        <polygon points="338,244 410,244 414,326 394,398 348,442 332,450 350,396 338,336 350,290" fill={BLUE} />
        <polygon points="338,244 410,244 414,326 394,398 348,442 332,450 350,396 338,336 350,290" fill="url(#ch-dots)" opacity="0.5" />
        {/* hard shadow under the fringe */}
        <polygon points="212,292 262,262 350,250 410,262 410,284 350,270 262,284 216,310" fill={INK} />
        <polygon points="216,310 262,284 350,270 410,284 410,296 350,284 262,298 220,320" fill="url(#ch-dots)" opacity="0.85" />

        {/* brows */}
        <polygon points="214,288 262,286 300,300 298,308 262,296 216,298" fill={INK} />
        <polygon points="326,302 362,290 410,282 408,292 364,300 328,312" fill={INK} />

        {/* eyes behind the lenses */}
        <polygon points="228,316 252,308 288,314 270,334 240,336" fill="#fff" />
        <polygon points="252,311 274,315 270,332 254,333" fill={BLUE} />
        <rect x="259" y="316" width="8" height="14" fill={INK} />
        <polygon points="334,314 358,306 396,310 384,330 348,332" fill="#fff" />
        <polygon points="356,309 376,312 373,328 358,329" fill={BLUE} />
        <rect x="362" y="313" width="8" height="13" fill={INK} />

        {/* glasses: slanted frames, pale lens tint, a hard glare streak across each lens */}
        <polygon points="210,306 294,300 290,344 222,348" fill="#cfe0ff" opacity="0.35" />
        <polygon points="326,298 408,292 404,338 334,344" fill="#cfe0ff" opacity="0.35" />
        <polygon points="232,304 252,303 238,346 224,347" fill="#fff" opacity="0.85" />
        <polygon points="262,302 272,302 258,345 248,346" fill="#fff" opacity="0.85" />
        <polygon points="344,298 364,296 352,341 338,343" fill="#fff" opacity="0.85" />
        <polygon points="374,296 384,295 372,338 362,340" fill="#fff" opacity="0.85" />
        <polygon points="210,306 294,300 290,344 222,348" fill="none" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <polygon points="326,298 408,292 404,338 334,344" fill="none" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
        <path d="M294 310 Q310 304 326 306" fill="none" stroke={INK} strokeWidth="7" strokeLinecap="round" />
        <path d="M210 308 L194 302" fill="none" stroke={INK} strokeWidth="7" strokeLinecap="round" />

        {/* nose, smirk, jaw */}
        <polygon points="318,334 330,336 338,384 354,392 336,400 312,394 318,360" fill={BLUE} opacity="0.85" />
        <path d="M322 346 L331 386 L352 394" fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M274 428 Q312 442 356 418" fill="none" stroke={INK} strokeWidth="7" strokeLinecap="round" />
        <path d="M356 418 L370 404" fill="none" stroke={INK} strokeWidth="6" strokeLinecap="round" />
        <polygon points="300,432 340,424 330,438 306,440" fill="#fff" />
        <path d="M232 398 L296 452 L348 442" fill="none" stroke={INK} strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
        <path d="M376 372 Q386 398 362 410" fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" />
        <polygon points="296,452 348,442 334,464" fill={INK} />

        {/* hair: short and textured, a few soft locks on top, side fringe over the brow */}
        <path d={HAIR} fill={INK} />
        {LOCKS.map((l) => (
          <polygon key={l} points={l} fill={INK} />
        ))}
        <polygon points="224,282 214,316 238,290" fill={INK} />
        <polygon points="362,252 380,284 392,254" fill={INK} />
        <polygon points="286,252 300,284 314,256" fill={INK} />
        <path d="M204 236 C214 198 250 164 300 150" fill="none" stroke="#fff" strokeWidth="7" strokeLinecap="round" />
        <path d="M330 140 C380 138 424 160 436 204" fill="none" stroke="#fff" strokeWidth="7" strokeLinecap="round" />
        <path d="M274 140 C280 134 286 132 292 132" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
        <path d="M244 196 C286 172 336 166 384 176" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M236 226 C282 204 344 200 408 214" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" />
      </g>
    </svg>
  )
}
