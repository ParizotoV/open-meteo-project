interface ReverseGeoCode {
  addressparts: Addressparts;
}

export interface Addressparts {
  house_number: {
    _text: string;
  };
  road: {
    _text: string;
  };
  suburb: {
    _text: string;
  };
  city: {
    _text: string;
  };
  municipality: {
    _text: string;
  };
  county: {
    _text: string;
  };
  state_district: {
    _text: string;
  };
  state: {
    _text: string;
  };
  'ISO3166-2-lvl4': {
    _text: string;
  };
  region: {
    _text: string;
  };
  postcode: {
    _text: string;
  };
  country: {
    _text: string;
  };
  country_code: {
    _text: string;
  };
  city_district: {
    _text: string;
  };
  town: {
    _text: string;
  };
}

export interface GeoReverse {
  reversegeocode: ReverseGeoCode;
}
