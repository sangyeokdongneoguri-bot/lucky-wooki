# Design Concept: Minimal Ivory Wedding

Reference: mobile wedding invitation image (ivory paper texture, B&W photo, minimal typography)

## Core Principles

- Generous whitespace over decorative elements
- Single-scroll mobile-first layout (max-width 480px)
- Calm, emotional wedding atmosphere — not trendy, not flashy

## Color Palette

| Token     | Current       | New              | Usage                    |
|-----------|---------------|------------------|--------------------------|
| bg        | #FFF9F5       | #F5F0EB          | Main background (ivory)  |
| bgAlt     | #F5E6D3       | #EDEDED          | Section alt bg           |
| accent    | #D4A574       | #999             | Minimal UI accents only  |
| text      | #6B5B4E       | #222             | Primary text (near-black)|
| textLight | #9B8B7E       | #888             | Secondary text           |
| white     | #FFFFFF       | #FFFFFF           | Card surfaces            |
| border    | #E8D5C4       | #DDD             | Subtle dividers          |

## Typography

- Heading: `Cormorant Garamond` (keep) — light weight (300-400), lowercase English
- Body Korean: `Noto Serif KR` weight 300 (lighter than current)
- Body sub: `Noto Sans KR` weight 300-400
- No bold (700+) headings — max weight 500
- Letter-spacing: generous (0.1em-0.3em for English headings)

## Hero Section

| Decision                  | Choice                                  | Reason                              |
|---------------------------|-----------------------------------------|-------------------------------------|
| Background                | Ivory solid + paper texture overlay     | Matches reference image warmth      |
| Photo style               | B&W, centered, card-like with shadow    | Reference shows film-photo aesthetic|
| Photo size                | ~60-70% width, natural aspect ratio     | Generous margin on sides            |
| Name display              | `kiwook & soyeon` (lowercase English)   | Reference uses lowercase serif      |
| Date display              | `2026. 05. 10.` (simple dot format)     | Minimal, no day-of-week             |
| Bottom quote              | English emotional line                  | Reference pattern                   |
| Scroll indicator          | Remove                                  | Minimal approach                    |
| Overlay on photo          | None                                    | Clean photo presentation            |

## Section Layout

- No icon dividers — use 60-80px vertical spacing between sections
- No colored section backgrounds — uniform ivory throughout
- Thin hairline (`1px #DDD`) only if sections need visual break
- Animations: fade-in only (no slide, no scale), duration 0.6s

## Texture

- Paper/embossed texture via subtle CSS background-image or noise overlay
- Opacity 0.03-0.05 (barely visible, adds warmth)

## Buttons & Interactive Elements

- Outline style (border only, no filled backgrounds)
- Border-radius: 0 or 2px (sharp, not rounded pill)
- Color: #222 border, #222 text — no colored buttons
