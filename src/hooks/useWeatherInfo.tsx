import { useState } from "react";
import { getCurrentWeather, getForecast } from "../queries/weather";
import { ForecastResponse, WeatherData } from "../types/queries";
import { CityOption } from "../component/ui/Search";

interface WeatherState {
  current: WeatherData | null;
  forecast: ForecastResponse | null;
}

interface UseWeatherReturn {
  weather: WeatherState;
  error: string;
  loading: boolean;
  fetchWeather: (searchData: CityOption | null) => Promise<void>;
}

export const useWeatherInfo = (): UseWeatherReturn => {
  const [weather, setWeather] = useState<WeatherState>({
    current: null,
    forecast: null,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (searchData: CityOption | null) => {
    if (searchData) {
      setLoading(true);
      setError("");

      try {
        const [lat, lon] = searchData.value.split(" ").map(Number);
        console.log("Fetching weather for:", { lat, lon });

        const [currentResult, forecastResult] = await Promise.all([
          getCurrentWeather(lat, lon),
          getForecast(lat, lon),
        ]);

        console.log("API Results:", { currentResult, forecastResult });

        if (currentResult.success && forecastResult.success) {
          const newWeather = {
            current: currentResult.data,
            forecast: forecastResult.data,
          };
          console.log("Setting new weather state:", newWeather);
          setWeather(newWeather);
        } else {
          const errorMessage = !currentResult.success
            ? currentResult.message || "Failed to fetch current weather"
            : forecastResult.message || "Failed to fetch forecast";
          setError(errorMessage);
          setWeather({ current: null, forecast: null });
        }
      } catch (error) {
        console.error("Weather fetch error:", error);
        setError("Failed to fetch weather data");
        setWeather({ current: null, forecast: null });
      } finally {
        setLoading(false);
      }
    } else {
      setWeather({ current: null, forecast: null });
      setError("");
    }
  };

  return {
    weather,
    error,
    loading,
    fetchWeather,
  };
};
