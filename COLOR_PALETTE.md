# Standardized Color Palette

## Color Scheme Overview
All CSS files have been updated to use a consistent, professional color palette.

### Color Values

**Dark/Text Colors:**
- `#111` - Primary text/headers (dark, high contrast)
- `#222` - Body text, links
- `#333` - Secondary text (deprecated, now uses #222)
- `#666` - Muted/secondary text
- `#999` - Light grey text (disabled, coming-soon)

**Light Background Colors:**
- `#f9f9f9` - Primary light background (cards, inputs, code blocks)
- `#f5f5f5` - Lighter background alternative

**Border Colors:**
- `#e0e0e0` - Primary border color (standardized)
- `#efefef` - Deprecated (replaced with #e0e0e0)
- `#dcdcdc` - Deprecated (replaced with #e0e0e0)

**White:**
- `#fff` - Pure white (backgrounds)

**Accent Colors:**
- `#49bf9d` - Primary accent (teal/green)
- `#5cc6a7` - Accent hover state
- `#3eb08f` - Accent active state

---

## CSS Variables (custom.css)

```css
:root {
    /* Dark Colors */
    --carbon-black: #1a1a1a;
    --carbon-dark: #0a0a0a;
    --carbon-light: #2d2d2d;
    
    /* Text Colors */
    --text-dark: #111;
    --text-primary: #222;
    --text-secondary: #333;
    --text-muted: #666;
    --text-light: #f5f5f5;
    
    /* Light Background Colors */
    --bg-light: #f9f9f9;
    --bg-lighter: #f5f5f5;
    
    /* Border Colors */
    --border-light: #e0e0e0;
    --border-lighter: #efefef;
    
    /* Accent Colors */
    --accent-primary: #49bf9d;
    --accent-hover: #5cc6a7;
    --accent-active: #3eb08f;
    
    --shadow-soft: 0 10px 40px rgba(26, 26, 26, 0.15);
}
```

---

## Changes Made

### resources.css
- ✅ Background colors standardized to `#f9f9f9`
- ✅ Border colors standardized to `#e0e0e0`
- ✅ Text colors standardized to `#111` (headers) and `#222` (body)
- ✅ Hover states use `#111` for contrast
- ✅ Removed inconsistent `#000`, `#333`, `#f7f7f7`, `#f0f0f0`, `#dcdcdc`

### main.css
- ✅ Input backgrounds: `#f7f7f7` → `#f9f9f9`
- ✅ Code blocks: `#f7f7f7` → `#f9f9f9`
- ✅ Tables striped: `#f7f7f7` → `#f9f9f9`
- ✅ All borders: `#efefef` → `#e0e0e0`
- ✅ Button borders: `#efefef` → `#e0e0e0`

### custom.css
- ✅ Added CSS variables for the standardized color palette
- ✅ Documented all color categories

---

## Usage Guidelines

1. **Headers & Emphasis:** Use `#111` for primary headers and important text
2. **Body Text:** Use `#222` for standard paragraph text
3. **Muted Text:** Use `#666` for secondary information or `#999` for disabled/coming-soon items
4. **Backgrounds:** Use `#f9f9f9` for all light backgrounds (cards, sections, inputs)
5. **Borders:** Use `#e0e0e0` for all borders and dividing lines
6. **Accents:** Use `#49bf9d` and its variations for interactive elements

---

## Consistency Rules

- All `.card`, `.box`, and section backgrounds use `#f9f9f9`
- All borders use `#e0e0e0`
- Text hierarchy: `#111` > `#222` > `#666` > `#999`
- Hover states transition from `#222` to `#111`
- Do not use `#000` (use `#111` instead) for better UI consistency
