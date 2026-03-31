# Design System: The Epicurean Lens

## 1. Overview & Creative North Star
**The Creative North Star: "The Sommelier’s Atelier"**

This design system is not a template; it is a digital curation of taste. It breaks away from the "flat web" by embracing the depth of a dimly lit lounge and the crisp precision of a high-end editorial spread. We achieve a premium feel through **Intentional Asymmetry**—where large-scale typography might overlap high-resolution imagery—and **Tonal Depth**, where the UI feels like layered materials (linen, glass, and wood) rather than digital pixels. 

The goal is to evoke the "appetite appeal" of a physical menu while maintaining the fluid, effortless transitions of a modern luxury application.

---

## 2. Colors & Surface Philosophy

The palette is rooted in the "Dark Mode" of a high-end bar, utilizing the warmth of spirits and the freshness of garnish.

### The "No-Line" Rule
**Explicit Instruction:** Traditional 1px solid borders are strictly prohibited for sectioning. Boundaries must be defined solely through background color shifts or subtle tonal transitions. For example, a recipe card (`surface-container-low`) should sit on a main background (`surface`) without a stroke.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. Use the Material `surface-container` tiers to create depth:
- **Base Layer:** `surface` (#131313) for the main canvas.
- **Secondary Sections:** `surface-container-low` (#1c1b1b) for subtle content grouping.
- **Interactive Cards:** `surface-container-high` (#2a2a2a) to draw the eye.
- **Elevated Modals:** `surface-container-highest` (#353535) for top-level focus.

### The "Glass & Gradient" Rule
To add "soul," use **Glassmorphism** for floating navigation and top-level overlays. Use a `surface-variant` with 60% opacity and a `backdrop-blur` of 20px. 
- **Signature Gradient:** For primary CTAs or hero backgrounds, utilize a subtle linear gradient from `primary` (#ffb961) to `primary_container` (#d28e32) at a 135-degree angle. This mimics the refraction of light through a glass of bourbon.

---

## 3. Typography
Our typography is a dialogue between tradition and modernity.

- **Display & Headlines (Noto Serif):** These are our "Expert Voice." Use `display-lg` for hero statements. Don't be afraid to use tight letter-spacing (-0.02em) to give the serif an authoritative, editorial feel. 
- **Body & Labels (Manrope):** The "Functional Guide." Manrope provides high legibility for long-form recipes. Use `body-lg` for ingredient lists to ensure clarity in low-light dining environments.
- **Hierarchy Hint:** Large `headline-lg` titles should often be paired with a small, all-caps `label-md` using `primary` color for category tagging (e.g., "APERITIF").

---

## 4. Elevation & Depth

### The Layering Principle
Depth is achieved by "stacking" tones. Place a `surface-container-lowest` element on a `surface-container-low` section to create a soft, natural "recessed" look. This avoids the clutter of traditional shadows.

### Ambient Shadows
When a floating effect is required (e.g., a "Pairing Suggestion" popover), use an **Ambient Shadow**:
- **Blur:** 40px - 60px
- **Opacity:** 6%
- **Color:** Use a tinted version of `on-surface` (#e5e2e1) rather than pure black. This creates a glow rather than a heavy drop-shadow.

### The "Ghost Border" Fallback
If a border is required for accessibility (e.g., input fields), use a **Ghost Border**: `outline-variant` (#524437) at **15% opacity**. Never use 100% opaque borders.

---

## 5. Components

### Buttons
- **Primary:** Gradient fill (`primary` to `primary_container`), `on-primary` text, `xl` (0.75rem) rounded corners. Transitions should be `200ms ease-out`.
- **Secondary:** Transparent background with a `Ghost Border`. Text in `primary`.
- **Tertiary:** Text-only in `secondary` (herbal green) with a subtle underline that expands on hover.

### Cards & Lists (The Divider-Free Rule)
Forbid the use of divider lines. Separate content using **Vertical White Space** (Spacing Scale `8` or `12`) or subtle background shifts between `surface-container-low` and `surface-container-high`.

### Recipe Chips
- Use `secondary_container` (#3a4c2f) for "Herbal" or "Fresh" notes.
- Use `tertiary_container` (#a79a88) for "Woody" or "Smoky" notes.
- Shape: `full` (pill-shaped) to contrast the soft-rectangles of the cards.

### Immersive Inputs
- Text inputs should use `surface_container_lowest` with a `Ghost Border`. The label should transition to `label-sm` in `primary` color upon focus.

### Additional Signature Component: The Pairing Dial
A custom component for this system: A horizontally scrolling list of "Pairing Intensity" using `secondary` (green) for food and `primary` (amber) for drinks, connected by a thin `outline_variant` line at 10% opacity.

---

## 6. Do's and Don'ts

### Do
- **DO** use the `20` (7rem) spacing token for hero section padding to create "Luxury Air."
- **DO** overlap typography on high-quality photography. Ensure text on images uses a `surface_dim` scrim for legibility.
- **DO** use `secondary` (#b8cda8) for success states and "Fresh Ingredient" callouts to reinforce the herbal aesthetic.

### Don't
- **DON'T** use 100% black (#000000). Always use `background` (#131313) to maintain tonal softness.
- **DON'T** use standard 1px dividers. If separation is needed, use a `3.5` (1.2rem) gap or a background color step.
- **DON'T** use sharp 90-degree corners. Stick to the `lg` (0.5rem) and `xl` (0.75rem) tokens to keep the aesthetic "Sophisticated & Approachable."

### Accessibility Note
While we prioritize a dark, moody aesthetic, ensure all recipe instructions (`body-md`) maintain a contrast ratio against `surface` that meets WCAG AA standards using the `on-surface` (#e5e2e1) token.