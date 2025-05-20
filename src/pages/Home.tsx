import { useState } from "react";
import Search, { CityOption } from "../component/others/Search";
import { getCurrentWeather, getForecast } from "../queries/weather";
import { ForecastResponse, WeatherData } from "../types/queries";
import Forecast from "../component/others/Forecast";
import CurrentWeather from "../component/others/CurrentWeather";

interface WeatherState {
  current: WeatherData | null;
  forecast: ForecastResponse | null;
}

export default function Home() {
  const [weather, setWeather] = useState<WeatherState>({
    current: null,
    forecast: null,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOnSearchChange = async (searchData: CityOption | null) => {
    if (searchData) {
      setLoading(true);
      setError("");

      try {
        const [lat, lon] = searchData.value.split(" ").map(Number);
        const [currentResult, forecastResult] = await Promise.all([
          getCurrentWeather(lat, lon),
          getForecast(lat, lon),
        ]);

        if (currentResult.success && forecastResult.success) {
          setWeather({
            current: currentResult.data,
            forecast: forecastResult.data,
          });
        } else {
          const errorMessage = !currentResult.success
            ? currentResult.message || "Failed to fetch current weather"
            : forecastResult.message || "Failed to fetch forecast";
          setError(errorMessage);
          setWeather({ current: null, forecast: null });
        }
      } catch (error) {
        setError("Failed to fetch weather data");
        setWeather({ current: null, forecast: null });
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      setWeather({ current: null, forecast: null });
      setError("");
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Weather App</h1>

        <Search onSearchChange={handleOnSearchChange} />

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {loading && (
          <div className="text-center py-4">
            <p>Loading weather data...</p>
          </div>
        )}

        {weather.current && <CurrentWeather data={weather.current} />}

        {weather.forecast && <Forecast data={weather.forecast} />}
      </div>
    </div>
  );
}
