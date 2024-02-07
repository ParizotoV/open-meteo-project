import { Weather } from "@/models/Weather";
import axios from "axios";
import { xml2json } from "xml-js";

export const getDetailsLocation = async (
  latitude: number,
  longitude: number
) => {
  const params = {
    hourly:
      "temperature_2m,relativehumidity_2m,dewpoint_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,weathercode,surface_pressure,windspeed_180m,winddirection_180m,temperature_180m,soil_temperature_54cm,soil_moisture_27_81cm,uv_index,uv_index_clear_sky,is_day",
    latitude,
    longitude,
    daily: `weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,uv_index_clear_sky_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant,shortwave_radiation_sum,et0_fao_evapotranspiration`,
    current: `temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m`,
  };

  const response = await axios.get(
    `https://api.open-meteo.com/v1/forecast?latitude=${params.latitude.toFixed(4)}&longitude=${params.longitude.toFixed(4)}&hourly=${params.hourly}&daily=${params.daily}&current=${params.current}`
  );

  return response;
};

export const getCoordenates = async (latitude: number, longitude: number) => {
  const coordenates = await axios.get(
    `https://nominatim.openstreetmap.org/reverse?lat=${latitude}6&lon=${longitude}`
  );

  return JSON.parse(xml2json(coordenates.data, { compact: true, spaces: 2 }));
};
