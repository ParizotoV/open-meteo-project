"use client";
import React from "react";
import { Bolt, ArrowLeft } from "lucide-react";

import Image from "next/image";
import { useRouter } from "next/navigation";

type HeaderProps = {
  buttonBack?: boolean;
};

const Header: React.FC<HeaderProps> = ({ buttonBack = false }) => {
  const { push } = useRouter();
  return (
    <header className="flex justify-between w-full items-center">
      <div
        className="bg-[#292248] rounded rounded-full w-[50px] h-[50px] flex items-center justify-center"
        onClick={() => buttonBack && push("/forecasts")}
      >
        {buttonBack ? (
          <ArrowLeft data-testid="back-svg" color="#b3a8ed" />
        ) : (
          <Bolt data-testid="config-svg" color="#b3a8ed" />
        )}
      </div>
      <h2 className="text-white text-2xl font-bold h-auto">ForecastWeather</h2>
      <div
        data-testid={"button-weather"}
        className="bg-[#292248] rounded rounded-full w-[50px] h-[50px] flex items-center justify-center"
      >
        <Image src="/img/weather.svg" alt="weather" width={40} height={40} />
      </div>
    </header>
  );
};

export default Header;
