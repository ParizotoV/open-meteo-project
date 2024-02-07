"use client";

import React, { useEffect, useState } from "react";
import { Weather } from "@/models/Weather";

import { Menu, MenuItem } from "@szhsin/react-menu";

import InfosWeather from "./components/InfosWeather";
import Location from "./components/Location";
import { MoreHorizontal } from "lucide-react";

import { useRouter } from "next/navigation";
import { useGlobalState } from "@/core/GlobalState";
import { getCoordenates, getDetailsLocation } from "@/api/fetchWeatherApi";

import { toast } from "react-toastify";
import { GeoReverse } from "@/models/GeoReverse";
import Loader from "@/components/Loader/Loader";

interface CardProps {
  weather: Weather;
}

const Card: React.FC<CardProps> = ({ weather }) => {
  const [loading, setLoading] = useState(false);
  const { updateWeather, removeWeather, weathers } = useGlobalState();
  const { push } = useRouter();

  const reloadWeather = async () => {
    try {
      setLoading(true);

      const response = await getDetailsLocation(
        Number(weather.latitude),
        Number(weather.longitude)
      );

      const coordenate: GeoReverse = await getCoordenates(
        weather.latitude,
        weather.longitude
      );

      const weatherNew: Weather = {
        ...response.data,
        longitude: weather.longitude,
        latitude: weather.latitude,
        uuid: weather.uuid,
        geoCode: coordenate,
      };

      toast.success("Updated successfully");

      updateWeather(weatherNew);
    } catch (err) {
      toast.error("Error when updating");
    } finally {
      setLoading(false);
    }
  };

  const deleteWeather = () => {
    removeWeather(weather.uuid);

    toast.success("Successfully deleted");
  };

  useEffect(() => {
    window.localStorage.setItem("weathers", JSON.stringify(weathers));
  }, [weathers]);

  if (loading)
    return (
      <div
        role="feed"
        className={`font-edited flex flex-col rounded rounded-[22px] p-2 text-white p-[13px] relative box-border justify-between h-[180px] ${
          weather.current.temperature_2m > 19
            ? "bg-gradient-to-tl from-[#00AFFB] to-[#9800E0]"
            : "bg-gradient-to-tl from-[#9F69FF] to-[#1A1572] to-[#0B0B0B]"
        } `}
      >
        <Loader />
        <div className="flex items-center absolute top-[12px] right-[12px] items-center justify-center cursor-pointer rounded rounded-full bg-gradient-to-tl from-[#322C54] to-[#231D49] w-[22px] h-[22px]">
          <Menu
            menuClassName="bg-black"
            menuButton={<MoreHorizontal color="#fff" width={16} />}
            align="center"
            arrow={true}
          >
            <MenuItem
              disabled={loading}
              className="my-menuitem"
              onClick={reloadWeather}
            >
              Reload
            </MenuItem>
            <MenuItem
              disabled={loading}
              className="my-menuitem"
              onClick={deleteWeather}
            >
              Delete
            </MenuItem>
            <MenuItem
              disabled={loading}
              className="my-menuitem"
              onClick={() => push(`/forecasts/${weather.uuid}`)}
            >
              Details
            </MenuItem>
          </Menu>
        </div>
      </div>
    );

  return (
    <div
      role="feed"
      className={`font-edited flex flex-col rounded rounded-[22px] p-2 text-white p-[13px] relative box-border justify-between h-[180px] ${
        weather.current.temperature_2m > 19
          ? "bg-gradient-to-tl from-[#00AFFB] to-[#9800E0]"
          : "bg-gradient-to-tl from-[#9F69FF] to-[#1A1572] to-[#0B0B0B]"
      } `}
    >
      <InfosWeather weather={weather} />
      <span className="text-[10px]">
        Lat: {weather.latitude} Long: {weather.longitude}
      </span>
      {weather?.geoCode?.reversegeocode?.addressparts && (
        <Location weather={weather} />
      )}

      <div className="flex items-center absolute top-[12px] right-[12px] items-center justify-center cursor-pointer rounded rounded-full bg-gradient-to-tl from-[#322C54] to-[#231D49] w-[22px] h-[22px]">
        <Menu
          menuClassName="bg-black"
          menuButton={<MoreHorizontal data-testid="button-menu" color="#fff" width={16} />}
          align="center"
          arrow={true}
        >
          <MenuItem
            disabled={loading}
            className="my-menuitem"
            onClick={reloadWeather}
          >
            Reload
          </MenuItem>
          <MenuItem
            disabled={loading}
            className="my-menuitem"
            onClick={deleteWeather}
          >
            Delete
          </MenuItem>
          <MenuItem
            disabled={loading}
            className="my-menuitem"
            onClick={() => push(`/forecasts/${weather.uuid}`)}
          >
            Details
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default Card;
