import { useState } from "react";
import Search, { CityOption } from "../component/others/Search";
import { getCurrentWeather, getForecast } from "../queries/weather";

interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: Array<{
    description: string;
  }>;
  wind: {
    speed: number;
  };
}

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOnSearchChange = async (searchData: CityOption | null) => {
    if (searchData) {
      setCity(searchData.label);
      setLoading(true);
      setError("");

      try {
        const [lat, lon] = searchData.value.split(" ").map(Number);
        // const result = await getCurrentWeather(lat, lon);
        const result = await getForecast(lat, lon);

        if (result.success) {
          setWeather(result.data);
          console.log(result);
        } else {
          setError(result.message);
          setWeather(null);
        }
      } catch (err) {
        setError("Failed to fetch weather data");
        setWeather(null);
      } finally {
        setLoading(false);
      }
    } else {
      setCity("");
      setWeather(null);
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

        {weather && (
          <div className="bg-white rounded-lg p-6 shadow-lg mt-4">
            <h2 className="text-2xl font-bold mb-4">{weather.name}</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Temperature</p>
                <p className="text-2xl font-semibold">
                  {Math.round(weather.main.temp)}°C
                </p>
              </div>
              <div>
                <p className="text-gray-600">Feels Like</p>
                <p className="text-2xl font-semibold">
                  {Math.round(weather.main.feels_like)}°C
                </p>
              </div>
              <div>
                <p className="text-gray-600">Humidity</p>
                <p className="text-2xl font-semibold">
                  {weather.main.humidity}%
                </p>
              </div>
              <div>
                <p className="text-gray-600">Wind Speed</p>
                <p className="text-2xl font-semibold">
                  {weather.wind.speed} m/s
                </p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-gray-600">Conditions</p>
              <p className="text-xl font-semibold capitalize">
                {weather.weather[0].description}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
