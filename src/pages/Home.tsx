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
    <div className="min-h-screen bg-gradient-to-br from-sky-700 via-sky-300 to-white">
      <div className="p-8 mx-auto max-w-screen-xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-4 rounded-lg mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl text-zinc-100 tracking-wide font-bold text-center md:text-left">
            Weatherly
          </h1>

          <div className="w-full md:w-1/2">
            <Search onSearchChange={handleOnSearchChange} />
          </div>
        </div>
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

        {weather.current && (
          <div className="mt-8">
            <CurrentWeather data={weather.current} />
          </div>
        )}

        {weather.forecast && (
          <div className="mt-8">
            <Forecast data={weather.forecast} />
          </div>
        )}
      </div>
    </div>
  );
}
