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
const COLLARS = ['168,474 194,398 270,456 270,526', '444,466 420,388 350,438 346,522']
const EAR = '192,296 166,288 158,330 184,348'
const HAIR =
  'M164 354 C148 292 158 222 196 174 C234 126 300 102 366 110 C428 118 464 164 460 228 C458 264 452 298 442 334 C436 300 424 270 410 254 C386 246 360 254 340 266 C316 262 292 250 270 252 C246 258 226 280 216 312 C208 332 190 350 164 354 Z'
const LOCKS = [
  '164,352 174,392 198,350',
  '188,330 202,374 216,318',
  '440,332 454,376 424,336',
  '224,284 210,334 246,294',
  '270,252 278,302 300,258',
  '340,266 354,312 374,262',
  '392,250 416,294 422,252',
  '230,150 212,110 264,134',
  '280,124 286,80 320,116',
  '330,112 358,72 378,116',
  '388,124 426,94 434,142',
  '202,196 166,168 208,166',
]

export default function Character() {
  return (
    <svg className="character" viewBox="0 0 600 820" aria-hidden="true" focusable="false">
      <defs>
        <g id="ch-sil">
          <polygon points={BODY} />
          <polygon points={NECK} />
          {COLLARS.map((c) => (
            <polygon key={c} points={c} />
          ))}
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
      <polygon points="128,562 214,512 226,522 138,576" fill="#fff" />
      <polygon points="384,500 472,550 462,562 380,514" fill="#fff" />
      <polygon points="470,620 520,690 500,760 448,700" fill={BLUE} />

      {/* white tee in the open front of a long trench coat */}
      <polygon points="262,512 352,496 322,760 284,760" fill={PAPER} />
      <polygon points="262,512 352,496 346,540 268,552" fill={INK} opacity="0.85" />

      {/* open coat fronts with a white edge, double-breasted flap lines and buttons */}
      <path d="M262 512 L284 650 L278 770" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M352 498 L340 650 L350 770" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M214 650 L196 812" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
      <path d="M394 646 L414 812" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
      <circle cx="240" cy="676" r="7" fill="#fff" />
      <circle cx="236" cy="720" r="7" fill="#fff" />
      <circle cx="372" cy="672" r="7" fill="#fff" />
      <circle cx="376" cy="716" r="7" fill="#fff" />

      {/* belt: two bands, one buckle, a tail hanging loose */}
      <polygon points="30,738 250,744 246,782 24,776" fill={INK} stroke="#fff" strokeWidth="4" strokeLinejoin="round" />
      <polygon points="352,744 574,730 580,768 356,782" fill={INK} stroke="#fff" strokeWidth="4" strokeLinejoin="round" />
      <rect x="226" y="736" width="34" height="50" rx="3" fill="none" stroke="#fff" strokeWidth="6" />
      <polygon points="258,760 300,768 292,820 262,812" fill={INK} stroke="#fff" strokeWidth="4" strokeLinejoin="round" />

      {/* popped collar: tall flaps standing up around the neck, blue lining, white edge */}
      <polygon points="168,474 194,398 270,456 270,526" fill={INK} />
      <polygon points="444,466 420,388 350,438 346,522" fill={INK} />
      <polygon points="204,424 258,462 262,504 216,476" fill={BLUE} />
      <polygon points="410,414 360,446 354,500 400,470" fill={BLUE} />
      <path d="M168 474 L194 398 L270 456" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M444 466 L420 388 L350 438" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />

      {/* hard shadow plane across the lower left of the coat, with halftone edge, plus rim lights */}
      <polygon points="14,820 44,660 150,700 230,780 250,820" fill={INK} />
      <path d="M44 640 L128 556 L215 505" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M385 495 L472 545 L548 636" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />

      {/* head */}
      <g transform={HEAD}>
        <polygon points={EAR} fill={PAPER} stroke={INK} strokeWidth="4" strokeLinejoin="round" />
        <polygon points={FACE} fill={PAPER} />
        {/* light blue shade down the near cheek, blue halftone on the far side */}
        <polygon points="204,330 232,398 266,408 240,352" fill={BLUE} opacity="0.25" />
        <polygon points="338,244 410,244 414,326 394,398 348,442 332,450 350,396 338,336 350,290" fill={BLUE} />
        {/* hard shadow under the fringe */}
        <polygon points="212,292 262,262 350,250 410,262 410,284 350,270 262,284 216,310" fill={INK} />

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
        <polygon points="210,306 294,300 290,344 222,348" fill="#0a1a7a" opacity="0.75" />
        <polygon points="326,298 408,292 404,338 334,344" fill="#0a1a7a" opacity="0.75" />
        <polygon points="232,304 252,303 238,346 224,347" fill="#fff" opacity="0.85" />
        <polygon points="262,302 272,302 258,345 248,346" fill="#fff" opacity="0.85" />
        <polygon points="344,298 364,296 352,341 338,343" fill="#fff" opacity="0.85" />
        <polygon points="374,296 384,295 372,338 362,340" fill="#fff" opacity="0.85" />
        <polygon points="210,306 294,300 290,344 222,348" fill="none" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
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

        {/* hair: long, messy, locks falling past the jaw and over the brow, strands going every way */}
        <path d={HAIR} fill={INK} />
        {LOCKS.map((l) => (
          <polygon key={l} points={l} fill={INK} />
        ))}
        <path d="M200 232 C210 192 250 152 306 138" fill="none" stroke="#fff" strokeWidth="7" strokeLinecap="round" />
        <path d="M340 124 C396 124 436 150 448 200" fill="none" stroke="#fff" strokeWidth="7" strokeLinecap="round" />
        <path d="M176 270 C174 300 178 328 188 346" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
        <path d="M448 270 C450 296 448 318 444 330" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
        <path d="M246 192 C290 166 340 160 392 172" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M232 226 C280 204 346 200 414 214" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M290 100 C296 92 306 90 314 94" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
        <path d="M364 90 C370 84 378 84 384 90" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
      </g>
    </svg>
  )
}
