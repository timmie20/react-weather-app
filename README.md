# Weatherly - Weather Forecast App

A modern weather application built with React, TypeScript, and Tailwind CSS that provides real-time weather data and forecasts for cities worldwide.

## Features

- Real-time weather data
- 5-day weather forecast
- City search with autocomplete
- Responsive design
- Beautiful UI with gradient backgrounds
- Detailed weather information including:
  - Temperature
  - Feels like
  - Humidity
  - Wind speed
  - Pressure
  - Weather conditions

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- Vite
- React Accessible Accordion
- Axios
- OpenWeatherMap API

## Project Structure

```
src/
├── component/
│   ├── ui/              # Reusable UI components
│   │   └── Search.tsx   # City search component
│   └── weather/         # Weather-specific components
│       ├── CurrentWeather.tsx  # Current weather display
│       └── Forecast.tsx        # 5-day forecast display
├── hooks/
│   └── useWeatherInfo.tsx      # Custom hook for weather data management
├── pages/
│   └── Home.tsx                # Main application page
├── queries/
│   ├── geo.ts                  # Geo-location API queries
│   └── weather.ts              # Weather API queries
├── types/
│   └── queries.ts              # TypeScript type definitions
└── App.tsx                     # Root component
```

## Component Structure

### Search Component

- Handles city search functionality
- Uses AsyncPaginate for autocomplete
- Integrates with GeoDB API for city data

### CurrentWeather Component

- Displays current weather information
- Shows temperature, feels like, humidity, and wind speed
- Includes weather icon and description

### Forecast Component

- Shows 5-day weather forecast
- Uses react-accessible-accordion for expandable forecast details
- Displays daily temperature ranges and conditions

### useWeatherInfo Hook

- Manages weather data state
- Handles API calls for current weather and forecast
- Provides loading and error states

## Setup Instructions

1. Clone the repository:

```bash
git clone <repository-url>
cd weatherly
```

2. Install dependencies:

```bash
pnpm install
```

3. Create a `.env` file in the root directory and add the following variables:

````env
VITE_WEATHER_API_KEY=aeda7b0daaf670a1ded80f8faa2de10c
VITE_RAPID_API_KEY=4b0729b720msha963c1aab6fcf66p13d7eejsnb50294ef6d4f


4. Run the development server:

```bash
pnpm dev
````

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## API Integration

The app uses two main APIs:

1. OpenWeatherMap API for weather data
2. GeoDB API for city search
