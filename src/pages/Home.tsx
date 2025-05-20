import { useWeatherInfo } from "../hooks/useWeatherInfo";
import Forecast from "../component/weather/Forecast";
import CurrentWeather from "../component/weather/CurrentWeather";
import Search, { CityOption } from "../component/ui/Search";

export default function Home() {
  const { weather, error, loading, fetchWeather } = useWeatherInfo();

  const handleOnSearchChange = (searchData: CityOption | null) => {
    fetchWeather(searchData);
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Timi's Weatherly App
        </h1>

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
