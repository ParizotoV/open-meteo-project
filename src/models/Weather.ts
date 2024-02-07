import { GeoReverse } from './GeoReverse';

interface Hourly {
  time: Array<string>;
  temperature_2m: Array<number>;
  relativehumidity_2m: Array<number>;
  dewpoint_2m: Array<number>;
  apparent_temperature: Array<number>;
  precipitation_probability: Array<number>;
  precipitation: Array<number>;
  rain: Array<number>;
  showers: Array<number>;
  snowfall: Array<number>;
  snow_depth: Array<number>;
  weathercode: Array<number>;
  surface_pressure: Array<number>;
  windspeed_180m: Array<number>;
  winddirection_180m: Array<number>;
  temperature_180m: Array<number>;
  soil_temperature_54cm: Array<number>;
  soil_moisture_27_81cm: Array<number>;
  uv_index: Array<number>;
  uv_index_clear_sky: Array<number>;
  is_day: Array<number>;
}

interface HourlyUnits {
  time: string;
  temperature_2m: string;
  relativehumidity_2m: string;
  dewpoint_2m: string;
  apparent_temperature: string;
  precipitation_probability: string;
  precipitation: string;
  rain: string;
  showers: string;
  snowfall: string;
  snow_depth: string;
  weathercode: string;
  surface_pressure: string;
  windspeed_180m: string;
  winddirection_180m: string;
  temperature_180m: string;
  soil_temperature_54cm: string;
  soil_moisture_27_81cm: string;
  uv_index: string;
  uv_index_clear_sky: string;
  is_day: string;
}

interface Daily {
  time: Array<string>;
  weathercode: Array<number>;
  temperature_2m_max: Array<number>;
  temperature_2m_min: Array<number>;
  apparent_temperature_max: Array<number>;
  apparent_temperature_min: Array<number>;
  sunrise: Array<string>;
  sunset: Array<string>;
  uv_index_max: Array<number>;
  uv_index_clear_sky_max: Array<number>;
  precipitation_sum: Array<number>;
  rain_sum: Array<number>;
  showers_sum: Array<number>;
  snowfall_sum: Array<number>;
  precipitation_hours: Array<number>;
  precipitation_probability_max: Array<number>;
  windspeed_10m_max: Array<number>;
  windgusts_10m_max: Array<number>;
  winddirection_10m_dominant: Array<number>;
  shortwave_radiation_sum: Array<number>;
  et0_fao_evapotranspiration: Array<number>;
}

interface DailyUnits {
  time: string;
  weathercode: string;
  temperature_2m_max: string;
  temperature_2m_min: string;
  apparent_temperature_max: string;
  apparent_temperature_min: string;
  sunrise: string;
  sunset: string;
  uv_index_max: string;
  uv_index_clear_sky_max: string;
  precipitation_sum: string;
  rain_sum: string;
  showers_sum: string;
  snowfall_sum: string;
  precipitation_hours: string;
  precipitation_probability_max: string;
  windspeed_10m_max: string;
  windgusts_10m_max: string;
  winddirection_10m_dominant: string;
  shortwave_radiation_sum: string;
  et0_fao_evapotranspiration: string;
}

interface Current {
  time: string;
  interval: number;
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  is_day: number;
  precipitation: number;
  rain: number;
  showers: number;
  snowfall: number;
  weather_code: number;
  cloud_cover: number;
  pressure_msl: number;
  surface_pressure: number;
  wind_speed_10m: number;
  wind_direction_10m: number;
  wind_gusts_10m: number;
}

interface CurrentUnits {
  time: string;
  interval: string;
  temperature_2m: string;
  relative_humidity_2m: string;
  apparent_temperature: string;
  is_day: string;
  precipitation: string;
  rain: string;
  showers: string;
  snowfall: string;
  weather_code: string;
  cloud_cover: string;
  pressure_msl: string;
  surface_pressure: string;
  wind_speed_10m: string;
  wind_direction_10m: string;
  wind_gusts_10m: string;
}

export interface Weather {
  uuid: string;
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  hourly_units: HourlyUnits;
  hourly: Hourly;
  daily_units: DailyUnits;
  daily: Daily;
  current: Current;
  current_units: CurrentUnits;
  geoCode: GeoReverse;
}
