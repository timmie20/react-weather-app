import { WeatherData } from "../../types/queries";

type WeatherProps = {
  data: WeatherData;
};

const CurrentWeather = ({ data }: WeatherProps) => {
  return (
    <div className="w-fit rounded-md shadow-[10px_-2px_20px_2px_rgba(0,0,0,0.3)] text-white bg-[#333] mx-auto mt-5 px-5 pb-5">
      <div className="flex justify-between items-center">
        <div>
          <p className="font-semibold text-lg leading-none tracking-wider m-0">
            {data.name}
          </p>
          <p className="font-normal text-sm leading-none mt-3">
            {data.weather[0].description}
          </p>
        </div>
        <img
          alt="weather"
          className="w-[100px]"
          src={`icons/${data.weather[0].icon}.png`}
        />
      </div>

      <div className="flex justify-between items-center mt-4">
        <p className="font-semibold text-[70px] tracking-[-5px] my-2">
          {Math.round(data.main.temp)}°C
        </p>
        <div className="w-full pl-5">
          <div className="flex justify-between border-b border-white pb-1 mb-2">
            <span className="text-left font-normal text-xs">Details</span>
          </div>
          <div className="flex justify-between gap-3">
            <span className="text-left font-normal text-xs">Feels like</span>
            <span className="text-right font-semibold text-xs">
              {Math.round(data.main.feels_like)}°C
            </span>
          </div>
          <div className="flex justify-between gap-3">
            <span className="text-left font-normal text-xs">Wind</span>
            <span className="text-right font-semibold text-xs">
              {data.wind.speed} m/s
            </span>
          </div>
          <div className="flex justify-between gap-3">
            <span className="text-left font-normal text-xs">Humidity</span>
            <span className="text-right font-semibold text-xs">
              {data.main.humidity}%
            </span>
          </div>
          <div className="flex justify-between gap-3">
            <span className="text-left font-normal text-xs">Pressure</span>
            <span className="text-right font-semibold text-xs">
              {data.main.pressure} hPa
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
