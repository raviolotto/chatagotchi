# TamaChat AI - UI Reference Guide

## Design System - DEFINITIVO 
**⚠️ QUESTA È LA UI FINALE - NON MODIFICARE IL DESIGN!**

### Layout Structure
```
┌─────────────────────────────────────────────────────────┐
│                    SIDE-BY-SIDE LAYOUT                  │
├─────────────────────┬───────────────────────────────────┤
│     ANIMALI (sx)    │        CURA/CHAT (dx)            │
│                     │                                   │
│  • Pet Display      │  • Cura Tab (default)           │
│  • Stats Bars       │  • Chat Tab                      │
│  • Activity Toast   │  • Minimal Interface             │
│                     │                                   │
└─────────────────────┴───────────────────────────────────┘
```

### Global Styling Rules
- **Border Radius**: `rounded-3xl` everywhere
- **Colors**: Minimal palette - whites, grays, accent colors only
- **Background**: NO background image, clean white/gray
- **Shadows**: Minimal or none
- **Animations**: Only essential ones (loading, attention alerts)

### Components Specifications

#### 1. App.tsx (Main Container)
- **Layout**: `flex` side-by-side containers
- **Left Container**: Pet display + stats + activity toast
- **Right Container**: Cura/Chat tabs with clean interface
- **Background**: Clean gradient or solid color, NO decorative images

#### 2. ActivityToast.tsx
- **Position**: Bottom-left corner
- **Style**: Minimal, no shadows
- **Button**: Simple toggle, left-aligned
- **Content**: Clean text display only

#### 3. ChatInterface.tsx  
- **Style**: MINIMAL - only messages + input
- **NO Elements**: 
  - Headers/titles
  - Status alerts
  - Suggestion buttons
  - Footer elements
- **Elements**: 
  - Messages container
  - Chat input
  - Loading indicator (minimal dots)

#### 4. Pet Display
- **Container**: `rounded-3xl` white background
- **Stats**: Horizontal bars with `rounded-3xl`
- **Pet Emoji**: Large, centered
- **Info**: Name, personality, mood

### Color Palette
- **Primary**: Clean whites (#ffffff)
- **Secondary**: Light grays (#f8fafc, #f1f5f9)
- **Accents**: Blue (#3b82f6), Purple (#8b5cf6), Green (#10b981)
- **Status**: Red (#ef4444), Yellow (#f59e0b)

### Typography
- **Headers**: `text-xl` to `text-2xl`, semibold
- **Body**: `text-sm`, regular weight
- **Small text**: `text-xs` for secondary info

### Interactive Elements
- **Buttons**: `rounded-3xl`, colored backgrounds
- **Inputs**: `rounded-3xl`, clean borders
- **Cards**: `rounded-3xl`, white background

### Animation Guidelines
- **Reduce**: Minimal animations only
- **Keep**: Pet emoji bounce, loading indicators, attention alerts
- **Remove**: Complex transitions, decorative animations

### Responsive Behavior
- **Desktop**: Side-by-side layout maintained
- **Mobile**: Stack vertically if needed, maintain rounded-3xl

---

## IMPORTANTE: LOGICA vs UI

### Files con SOLO LOGICA (modificabili):
- `groqAiService.ts` - Integrazione AI Groq
- `petStore.ts` - State management
- `types/index.ts` - Type definitions
- `.env` - Configuration keys

### Files con UI DEFINITIVA (NON modificare design):
- `App.tsx` - Layout side-by-side confermato
- `ChatInterface.tsx` - UI minimal confermata
- `ActivityToast.tsx` - Posizione e stile confermati
- `App.css` - Stili globali confermati

### Regola Oro
**SE TOCCHI LA UI, CONTROLLA SEMPRE QUESTO FILE PRIMA!**
La UI attuale è quella giusta, bella, definitiva. 
Solo la logica e l'integrazione AI possono essere modificate.
