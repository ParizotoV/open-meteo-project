'use client';
import React from 'react';

import Header from '@/components/Header/Header';

import { getDetailsLocation } from '@/api/fetchWeatherApi';
import FormAddForecast from '@/templates/add-forecast/FormAddForecast';

const AddForecast: React.FC = () => {
  return (
    <div className="flex justify-center">
      <div className="flex p-12 box-border flex-col gap-12 max-w-[550px] w-full h-full">
        <Header buttonBack={true} />

        <FormAddForecast getDetailsLocation={getDetailsLocation} />
      </div>
    </div>
  );
};

export default AddForecast;
