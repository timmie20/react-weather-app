import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import { ForecastResponse } from "../../types/queries";

const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

type ForecastProps = {
  data: ForecastResponse;
};

const Forecast = ({ data }: ForecastProps) => {
  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, dayInAWeek)
  );

  return (
    <>
      <label className="text-[23px] font-bold text-white block mb-4">
        Other Days
      </label>
      <Accordion allowZeroExpanded>
        {data.list.slice(0, 7).map((item, idx) => (
          <AccordionItem key={idx}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="bg-gray-100 rounded-xl h-16 my-1 flex items-center cursor-pointer text-sm px-5">
                  <img
                    src={`icons/${item.weather[0].icon}.png`}
                    className="w-10"
                    alt="weather"
                  />
                  <label className="text-[#212121] font-semibold ml-4 flex-1">
                    {forecastDays[idx]}
                  </label>
                  <label className="mr-4 text-right flex-1">
                    {item.weather[0].description}
                  </label>
                  <label className="text-gray-500">
                    {Math.round(item.main.temp_max)}°C /{" "}
                    {Math.round(item.main.temp_min)}°C
                  </label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="grid grid-cols-2 gap-x-4 px-4 py-1">
                <div className="flex justify-between items-center h-[30px]">
                  <label className="text-gray-500">Pressure:</label>
                  <label className="text-[#212121]">{item.main.pressure}</label>
                </div>
                <div className="flex justify-between items-center h-[30px]">
                  <label className="text-gray-500">Humidity:</label>
                  <label className="text-[#212121]">{item.main.humidity}</label>
                </div>
                <div className="flex justify-between items-center h-[30px]">
                  <label className="text-gray-500">Clouds:</label>
                  <label className="text-[#212121]">{item.clouds.all}%</label>
                </div>
                <div className="flex justify-between items-center h-[30px]">
                  <label className="text-gray-500">Wind speed:</label>
                  <label className="text-[#212121]">
                    {item.wind.speed} m/s
                  </label>
                </div>
                <div className="flex justify-between items-center h-[30px]">
                  <label className="text-gray-500">Sea level:</label>
                  <label className="text-[#212121]">
                    {item.main.sea_level}m
                  </label>
                </div>
                <div className="flex justify-between items-center h-[30px]">
                  <label className="text-gray-500">Feels like:</label>
                  <label className="text-[#212121]">
                    {item.main.feels_like}°C
                  </label>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default Forecast;
