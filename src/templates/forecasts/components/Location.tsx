import { Addressparts } from "@/models/GeoReverse";
import { Weather } from "@/models/Weather";
import { MapPin } from "lucide-react";
import React from "react";

type LocationProps = {
  weather: Weather;
};

const Location: React.FC<LocationProps> = ({ weather }) => {
  const findCity = (addressparts: Addressparts): string => {
    if (addressparts?.town?._text) {
      return addressparts?.town?._text;
    } else if (addressparts?.city?._text) {
      return addressparts?.city?._text;
    } else if (addressparts?.municipality?._text) {
      return addressparts?.municipality?._text;
    } else if (addressparts?.city_district?._text) {
      return addressparts?.city_district?._text;
    }
    return "";
  };

  const addressparts = weather?.geoCode?.reversegeocode?.addressparts;

  return (
    <div className="flex items-center gap-1">
      <MapPin data-testid="map-pin-svg" width={18} />{" "}
      <span className={`text-xs`}>
        {findCity(addressparts)}/
        {addressparts?.["ISO3166-2-lvl4"] &&
          addressparts["ISO3166-2-lvl4"]._text.split("-")[1]}
      </span>
    </div>
  );
};

export default Location;
