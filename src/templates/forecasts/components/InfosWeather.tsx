import { Weather } from "@/models/Weather";
import { ArrowDown, ArrowUp, Droplet, Wind } from "lucide-react";
import moment from "moment";
import React from "react";
import { IconsWMO } from "../utils/CodesWMO";

type InfosWeatherProps = {
  weather: Weather;
};

const InfosWeather: React.FC<InfosWeatherProps> = ({ weather }) => {
  const weatherCode = weather.current.weather_code;
  return (
    <div className="flex gap-3 relative">
      <div className="flex flex-col gap-1">
        <div className="text-base font-bold">
          {moment(weather.current.time).format("dddd")}
        </div>
        <div className="flex font-extrabold text-[40px]">
          {weather.current.temperature_2m}{" "}
          {weather.current_units.temperature_2m}
        </div>
        <div className="text-xs flex font-normal">
          <div className="flex">
            <ArrowDown width={16} height={16} />
            {weather.daily.temperature_2m_min.sort()[0]}{" "}
            {weather.daily_units.temperature_2m_min}
          </div>

          <div className="flex">
            <ArrowUp width={16} height={16} />
            {weather.daily.temperature_2m_max.sort()[0]}{" "}
            {weather.daily_units.temperature_2m_max}
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mt-4">
          <Wind width={22} />{" "}
          <span className="text-sm">
            {weather.current.wind_speed_10m}{" "}
            {weather.current_units.wind_speed_10m}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Droplet width={22} />{" "}
          <span className="text-sm">
            {
              weather.hourly.precipitation_probability.sort()[
                weather.hourly.precipitation_probability.length - 1
              ]
            }{" "}
            {weather.hourly_units.precipitation_probability}
          </span>
        </div>
      </div>

      <div className="absolute right-12 top-8">{IconsWMO[weatherCode]}</div>
    </div>
  );
};

export default InfosWeather;
