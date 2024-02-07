"use client";

import { getCoordenates } from "@/api/fetchWeatherApi";
import { useGlobalState } from "@/core/GlobalState";
import { GeoReverse } from "@/models/GeoReverse";
import { Weather } from "@/models/Weather";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosResponse } from "axios";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

type FormAddForecastProps = {
  getDetailsLocation: (
    latitude: number,
    longitude: number
  ) => Promise<AxiosResponse<any, any>>;
};

const FormWeatherSchema = z.object({
  latitude: z.string().nonempty("Latitude is required"),
  longitude: z.string().nonempty("Longitude is required"),
});

export type FormWeatherData = z.infer<typeof FormWeatherSchema>;

const FormAddForecast: React.FC<FormAddForecastProps> = ({
  getDetailsLocation,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { weathers, addWeather, initValues } = useGlobalState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormWeatherData>({
    resolver: zodResolver(FormWeatherSchema),
  });

  const onSubmit = async (dataForm: FormWeatherData) => {
    try {
      setLoading(true);
      const response = await getDetailsLocation(
        Number(dataForm.latitude),
        Number(dataForm.longitude)
      );

      const weather = response.data;

      weather.latitude = dataForm.latitude
      weather.longitude = dataForm.longitude

      const coordenate: GeoReverse = await getCoordenates(
        weather.latitude,
        weather.longitude
      );
      weather.geoCode = coordenate;

      addWeather(weather as Weather);
      toast.success("Added successfully");

      reset();
    } catch (error) {
      toast.error("Error adding weather");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (weathers.length === 0) {
      const localWeathers = window.localStorage.getItem("weathers");

      if (localWeathers) {
        const parsedWeathers: Array<Weather> = JSON.parse(localWeathers);
        if (parsedWeathers.length > 0) {
          initValues(parsedWeathers);
        }
      }
    } else {
      window.localStorage.setItem("weathers", JSON.stringify(weathers));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weathers]);

  return (
    <form
      role="form"
      className="flex flex-col gap-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3 className="text-[#B2A8EE]">Add new location</h3>
      <div className="flex flex-col gap-2">
        <label className="text-xs text-[#B2A8EE]">Latitude</label>
        <input
          className="bg-[#292248] rounded rounded-lg h-[42px] text-[#B2A8EE] px-4 border-solid border-2 border-[#B2A8EE] outline-0"
          autoFocus
          type="number"
          pattern="[0-9]+([,\.][0-9]+)?"
          step="any"
          placeholder="Latitude"
          {...register("latitude", { required: true })}
        />
        {errors.latitude && (
          <span className="text-xs text-red-600">
            {errors.latitude.message}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xs text-[#B2A8EE]">Longitude</label>
        <input
          className="bg-[#292248] rounded rounded-lg h-[42px] text-[#B2A8EE] px-4 border-solid border-2 border-[#B2A8EE] outline-0"
          type="number"
          pattern="[0-9]+([,\.][0-9]+)?"
          step="any"
          placeholder="Longitude"
          {...register("longitude", { required: true })}
        />
        {errors.longitude && (
          <span className="text-xs text-red-600">
            {errors.longitude.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        className="p-2 flex flex-col items-center justify-center w-full bg-gradient-to-tl from-[#3c1b4e] to-[#3358b5] rounded rounded-lg"
        data-testid="button-submit"
        disabled={loading}
      >
        {loading ? <Loader2 className="text-white animate-spin" /> : <h3 className="text-white text-lg">Add</h3>}
      </button>
    </form>
  );
};

export default FormAddForecast;
