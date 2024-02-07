'use client';
import React, { useEffect } from 'react';

import { useGlobalState } from '@/core/GlobalState';
import Header from '@/components/Header/Header';
import { useRouter } from 'next/navigation';

import { Weather } from '@/models/Weather';
import Card from '@/templates/forecasts/Card';
import ButtonAdd from '@/templates/forecasts/components/ButtonAdd';

const Forecasts: React.FC = () => {
  const { push } = useRouter();
  const { weathers, initValues } = useGlobalState();

  useEffect(() => {
    const localWeathers = window.localStorage.getItem('weathers');

    if (localWeathers) {
      const parsedWeathers: Array<Weather> = JSON.parse(localWeathers);
      if (parsedWeathers.length > 0) {
        initValues(parsedWeathers);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex justify-center">
      <div className="flex p-12 box-border flex-col gap-12 max-w-[550px] w-full">
        <Header />

        <div className="flex flex-col gap-5">
          <ButtonAdd onClick={() => push('/add-forecast')} />

          <h3 className="text-[#B2A8EE]">My widgets</h3>
          <div id="cards">
            {weathers.length > 0 ? (
              <div className="flex flex-col gap-3">
                {weathers.map((weather, index) => (
                  <Card weather={weather} key={index} />
                ))}
              </div>
            ) : (
              <div className="p-6 flex flex-col items-center justify-center w-full bg-gradient-to-tl from-[#3c1b4e] to-[#3358b5] rounded rounded-lg">
                <h3 className="text-white text-lg">Not found Widgets</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forecasts;
