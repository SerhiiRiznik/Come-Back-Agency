## Come Back Weather App

This is a modern weather dashboard built with Next.js, Redux Toolkit, Material UI, and TypeScript. The app allows you to add cities, view current weather, hourly forecasts, and beautiful backgrounds for each weather type.

### Features

- Add and manage your favorite cities
- View current weather and hourly temperature chart
- Responsive design (desktop & mobile)
- Beautiful backgrounds for each weather condition
- Persistent city list (localStorage)
- Clean modular folder structure

### Tech Stack

- Next.js
- Redux Toolkit
- Material UI
- TypeScript
- SCSS Modules

### Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Add your OpenWeather API key to `.env` as `NEXT_PUBLIC_OPENWEATHER_API_KEY`
4. Run the app: `npm run dev`

### Folder Structure

- `src/app` — main pages and layout
- `src/components` — reusable UI components
- `src/modules/weather` — weather logic and UI
- `src/store` — Redux store setup
- `src/styles` — global styles
