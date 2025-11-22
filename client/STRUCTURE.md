# StoryTime - Project Structure

This document outlines the professional folder structure and organization of the StoryTime application.

## 📁 Folder Structure

```
client/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Main story creation app
│   ├── home/              # Landing page
│   ├── login/             # Login page
│   ├── register/          # Registration page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles and theme
│
├── components/            # Reusable React components
│   ├── ui/               # UI components
│   │   ├── Button.tsx    # Button component
│   │   ├── Card.tsx      # Card component
│   │   └── Input.tsx     # Input component
│   ├── layout/           # Layout components
│   │   ├── Navbar.tsx    # Navigation bar
│   │   └── PageContainer.tsx  # Page wrapper
│   └── views/            # Page views
│       ├── HomeView.tsx  # Home view
│       ├── CreateView.tsx # Story creation view
│       ├── StoryView.tsx  # Story reading view
│       └── Loader.tsx     # Loading component
│
├── lib/                  # Library code
│   ├── types/           # TypeScript type definitions
│   │   └── index.ts
│   ├── constants/       # Application constants
│   │   └── index.ts
│   └── utils/           # Utility functions
│       └── story.ts     # Story generation utilities
│
└── public/              # Static assets
```

## 🎨 Theme System

The theme is centralized in `app/globals.css` using CSS custom properties:

- **Colors**: Primary, secondary, action, danger variants
- **Shadows**: Consistent shadow system (sm, md, lg, xl, 2xl)
- **Typography**: Bebas Neue (display) and Poppins (body)
- **Background**: Emerald-50 with dot pattern

## 🧩 Component Architecture

### UI Components (`components/ui/`)
- **Button**: Reusable button with variants (primary, secondary, action, danger)
- **Card**: Selectable card component for theme selection
- **Input**: Form input with icon support

### Layout Components (`components/layout/`)
- **Navbar**: Navigation bar with auth buttons and back button support
- **PageContainer**: Consistent page wrapper with theme background

### View Components (`components/views/`)
- **HomeView**: Landing page view
- **CreateView**: Story creation form
- **StoryView**: Story reading interface
- **Loader**: Loading state component

## 📦 Type Definitions

All TypeScript types are defined in `lib/types/index.ts`:
- `ButtonVariant`
- `StoryTheme`
- `StoryDuration`
- `StoryData`
- `StoryParams`
- `ViewType`

## 🔧 Constants

Application constants are in `lib/constants/index.ts`:
- `STORY_THEMES`: Available story themes
- `STORY_DURATIONS`: Story duration options
- `STORY_TITLES`: Theme-specific story titles

## 🚀 Usage

### Importing Components
```typescript
import Button from '@/components/ui/Button';
import Navbar from '@/components/layout/Navbar';
import { STORY_THEMES } from '@/lib/constants';
import { StoryData } from '@/lib/types';
```

### Using the Theme
The theme is automatically applied via `globals.css`. Use Tailwind classes that reference the theme colors:
- `bg-yellow-400` (primary)
- `bg-blue-500` (action)
- `shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]` (standard shadow)

## 📝 Best Practices

1. **Components**: Keep components focused and reusable
2. **Types**: Define all types in `lib/types`
3. **Constants**: Store all constants in `lib/constants`
4. **Utils**: Place utility functions in `lib/utils`
5. **Styling**: Use theme classes from `globals.css`
6. **Imports**: Use `@/` alias for clean imports

