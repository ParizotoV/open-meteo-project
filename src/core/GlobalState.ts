import { Weather } from "@/models/Weather";
import { create } from "zustand";

import { v4 as uuidv4 } from "uuid";

interface GlobalStateParams {
  weathers: Weather[];
  addWeather: (weather: Weather) => void;
  removeWeather: (uuid: string) => void;
  updateWeather: (weather: Weather) => void;
  initValues: (weathers: Array<Weather>) => void;
}

export const useGlobalState = create<GlobalStateParams>()((set, get) => ({
  weathers: [],
  addWeather: (weather) => {
    weather.uuid = uuidv4();
    set((state) => ({ weathers: [...state.weathers, weather] }));
  },
  removeWeather: (uuid) => {
    const filterUuid = get().weathers.filter(
      (weather) => weather.uuid !== uuid
    );
    set(() => ({ weathers: [...filterUuid] }));
  },
  updateWeather: (weather) => {
    const stateWeathers = get().weathers;
    const index = stateWeathers.findIndex(
      (state) => state.uuid === weather.uuid
    );
    stateWeathers[index] = weather;

    set(() => ({ weathers: [...stateWeathers] }));
  },
  initValues: (weathers) => {
    set(() => ({ weathers: weathers }));
  },
}));
