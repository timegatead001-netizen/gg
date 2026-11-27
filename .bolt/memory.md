# Project memory

## Product intent & audience

- Single-audience romantic love story website: **Kavin ❤️ Leyli** — a personal, cinematic "little world" gift from Kavin to Leyli.
- Goal: emotional, memorable, movie-like experience (romantic movie + magical garden + love letter combined).
- Must feel premium and handmade, not a template or business site.

## Brand personality & voice

- Voice: tender, poetic, reverent, intimate. Uzbek-language romance prose throughout the UI.
- Avoid: childish/cartoon visuals, stock couple photos, invented photos of Leyli, hijab-wearing imaginary characters, random people.
- Use abstract romantic visuals instead of literal human imagery.

## Visual design & UX direction

- Palette: soft pink, rose red, white, golden. Romantic cinematic atmosphere.
- Effects: glowing hearts, floating rose petals, magical stars/particles, embers — rendered on lightweight `<canvas>` layers for performance.
- UI: premium glassmorphism panels; elegant romantic typography (loaded via fonts in index.html/global CSS).
- Motion: Framer Motion for section transitions and interactions; smooth, lag-free animations.
- Flow: Cinematic intro screen → "ENTER" button reveals main site. Sections: Love message (typing animation) → Interactive rose garden (12 touchable roses, each reveals a Uzbek feeling) → Royal kingdom (animated golden castle, crowns, thrones) → Love letter (clickable envelope with 3D flap open + letter slides out line-by-line) → Final surprise (glowing heart, roses, particles).
- Navigation: bottom nav bar on mobile, side dots on desktop.
- Mobile-first, fully responsive; no horizontal scroll, no overlapping text, touch-friendly buttons. Works on Android/iPhone/tablet/desktop.

## Decisions, constraints & rationale

- Stack: Vite + React + Tailwind CSS + Framer Motion + Lucide React icons. Build verified passing.
- `@/` path alias maps to `src/` (per global instructions in `.bolt/prompt`).
- All UI text in Uzbek only; code/developer-facing strings in English.
- Audio autoplay gated behind the intro "ENTER" button to satisfy browser autoplay policies; music loops and state persists across navigation/reloads (localStorage).
- Music player: bottom-right floating, play/pause, volume slider, animated visualizer.
- Video background: muted autoplay after enter, loops; animated gradient fallback if video missing/failed.
- Local asset paths: `public/music.mp3` (looping music) and `public/video.mp4` (H.264 MP4). Site works without them (graceful fallbacks).
- Russia compatibility: no YouTube/Google Photos/Instagram/TikTok or blocked external resources; all essential assets self-hosted in `public/`. Lightweight animations for Russian ISP throughput.
- Fixed naming conflict: local `Crown` component clashes with `Crown` from lucide-react — keep import names disambiguated.
- No database, no login, no fake interactions, no placeholder sections.

## Open questions & assumptions

- Assumes Leyli opens via a modern mobile browser with JS enabled; legacy browser quirks untested.
- Actual `music.mp3` and `video.mp4` not yet supplied by user — placeholders/fallbacks in place until added to `public/`.
- Uzbek translations are author-provided in the request; no independent linguistic review assumed.
- Specific font choices for "romantic/handwritten" styling inferred; user has not pinned exact typefaces.