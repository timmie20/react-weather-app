import { useState } from "react";
import Search, { CityOption } from "../component/others/Search";
import WeatherCard from "../component/others/WeatherCard";

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

  const handleOnSearchChange = (searchData: CityOption | null) => {
    if (searchData) {
      setCity(searchData.label);
      // TODO: Implement weather fetching logic here
      console.log(searchData);
    } else {
      setCity("");
      setWeather(null);
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

        <WeatherCard />

        {/* {weather && (
          <div className="bg-white rounded-lg p-6 shadow-lg">
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
        )} */}
      </div>
    </div>
  );
}
