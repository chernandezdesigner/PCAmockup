# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Nuxt.js application called "PCAMobileMock" that creates a mobile form interface within a phone mockup component. The project simulates a property inspection form for mobile viewing, featuring interactive form elements with custom dropdowns, date/time pickers, and mobile-optimized UI components.

## Development Commands

### Core Development
- `npm run dev` - Start development server (http://localhost:3000)
- `npm run build` - Build for production
- `npm run generate` - Generate static site
- `npm run preview` - Preview production build locally
- `npm install` - Install dependencies

### Dependencies
- Primary framework: Nuxt.js 4.x with Vue 3
- UI framework: DaisyUI with Tailwind CSS
- No testing framework currently configured

## Architecture & Structure

### Key Components
- `PhoneMockup.vue` - Simple wrapper component that provides phone frame styling using DaisyUI's mockup-phone classes
- Main form interface is in `app/app.vue` - contains the complete property inspection form

### Form Features
The main application (`app/app.vue`) implements:
- Progressive form fields that appear conditionally (address triggers city/state/zip)
- Custom dropdown components for state and property type selection
- Mobile drawer-style date and time pickers
- Form validation and interactive transitions
- US states data hardcoded in component
- Property types (residential, commercial, vacant land, etc.)

### Styling Approach
- Tailwind CSS with DaisyUI component library
- Custom transitions for form interactions (slide-fade, dropdown, drawer)
- Mobile-first responsive design
- Focus states and accessibility features

### Page Structure
- File-based routing via Nuxt pages directory
- `pages/about.vue` - Demo page showing DaisyUI components and stats
- Main app interface served from `app/app.vue`

### Configuration
- Nuxt config enables devtools and Tailwind module
- Tailwind configured with DaisyUI plugin and all themes enabled
- TypeScript support with Nuxt's automatic type generation

## Development Notes

- The project structure follows Nuxt 3+ conventions with `app/` directory
- Components use Composition API with `<script setup>`
- No state management library - uses local component state
- Form data is not persisted or submitted anywhere currently
- Mobile-optimized with touch-friendly interactions