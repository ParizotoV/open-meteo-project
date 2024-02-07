'use client'
import Header from '@/components/Header/Header'
import { useGlobalState } from '@/core/GlobalState'
import { Weather } from '@/models/Weather'

import React, { useEffect, useState } from 'react'

import Infos from '@/templates/details/Infos'
import HumidityChart from '@/templates/details/HumidityChart'
import TemperatureChart from '@/templates/details/TemperatureChart'
import { MoreHorizontal, Sunrise, Sunset } from 'lucide-react'
import moment from 'moment'
import { getDetailsLocation, getCoordenates } from '@/api/fetchWeatherApi'
import { GeoReverse } from '@/models/GeoReverse'
import { toast } from 'react-toastify'
import { Menu, MenuItem } from '@szhsin/react-menu'
import { useRouter } from 'next/navigation'
import Loader from '@/components/Loader/Loader'

const Details: React.FC = () => {
  const { push } = useRouter()
  const { weathers, initValues, updateWeather, removeWeather } = useGlobalState()

  const [weather, setWeather] = useState<Weather>({} as Weather)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (weathers.length === 0) {
      const localWeathers = window.localStorage.getItem('weathers')

      if (localWeathers) {
        const parsedWeathers: Array<Weather> = JSON.parse(localWeathers)
        if (parsedWeathers.length > 0) {
          initValues(parsedWeathers)
        }
      }
    } else {
      const weather = weathers.find((weather) => weather.uuid === window.location.pathname.split('/')[2])
      if (weather) setWeather(weather)
      window.localStorage.setItem('weathers', JSON.stringify(weathers))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weathers])

  const reloadWeather = async () => {
    try {
      setLoading(true)

      const response = await getDetailsLocation(Number(weather.latitude), Number(weather.longitude))

      const coordenate: GeoReverse = await getCoordenates(weather.latitude, weather.longitude)

      const weatherNew: Weather = {
        ...response.data,
        longitude: weather.longitude,
        latitude: weather.latitude,
        uuid: weather.uuid,
        geoCode: coordenate,
      }

      toast.success('Updated successfully')

      updateWeather(weatherNew)
      setWeather(weatherNew)
    } catch (err) {
      toast.error('Error when updating')
    } finally {
      setLoading(false)
    }
  }

  const deleteWeather = () => {
    removeWeather(weather.uuid)

    push('/forecasts')

    toast.success('Successfully deleted')
  }

  const addressparts = weather?.geoCode?.reversegeocode.addressparts

  if (loading || !weather?.current)
    return (
      <div className={'box-border flex justify-center font-edited'}>
        <div className='flex p-12 box-border flex-col gap-3 max-w-[550px] w-full'>
          <Header buttonBack={true} />
          <div className='h-full items-center'>
            <Loader />
          </div>
        </div>
      </div>
    )

  return (
    <div className={'bg-[#100a2a] box-border flex justify-center font-edited'}>
      <div className='flex p-12 box-border flex-col gap-3 max-w-[550px] w-full'>
        <Header buttonBack={true} />
        <div className='flex justify-between'>
          <h2 className='text-[#B2A8EE] font-sans'>
            Details {addressparts?.city?._text}/
            {addressparts?.['ISO3166-2-lvl4'] &&
              addressparts?.['ISO3166-2-lvl4']?._text?.split('-')[1]}
          </h2>
          <div className='flex items-center items-center justify-center cursor-pointer rounded rounded-full bg-gradient-to-tl from-[#322C54] to-[#231D49] w-[22px] h-[22px]'>
            <Menu
              menuClassName='bg-black'
              menuButton={<MoreHorizontal color='#fff' width={16} />}
              align='center'
              arrow={true}
            >
              <MenuItem disabled={loading} className='my-menuitem' onClick={reloadWeather}>
                Reload
              </MenuItem>
              <MenuItem disabled={loading} className='my-menuitem' onClick={deleteWeather}>
                Delete
              </MenuItem>
            </Menu>
          </div>
        </div>

        <div className='grid grid-cols-3 gap-3'>
          <Infos
            title='Temperature'
            subtitle={`${weather?.current?.temperature_2m} 
              ${weather?.current_units?.temperature_2m}`}
          />
          <Infos
            title='Wind Speed'
            subtitle={`${weather?.current?.wind_speed_10m} 
            ${weather?.current_units?.wind_speed_10m}`}
          />
          <Infos
            title='UV Index'
            subtitle={`${
              weather?.daily?.uv_index_max.sort()[weather?.daily?.uv_index_max.length - 1]
            } ${weather?.daily_units?.uv_index_max}`}
          />
        </div>
        <div className='grid grid-cols-2 gap-3'>
          <Infos
            title={
              <div className='flex items-center justify-center gap-2 py-3'>
                <Sunrise width={28} />
                <span className='text-lg'>
                  {moment(weather?.daily?.sunrise[0]).format('HH:mm')}
                </span>
              </div>
            }
          />
          <Infos
            title={
              <div className='flex items-center justify-center gap-2 py-3'>
                <Sunset width={28} />
                <span className='text-lg'>{moment(weather?.daily?.sunset[0]).format('HH:mm')}</span>
              </div>
            }
          />
        </div>

        <TemperatureChart weather={weather} />
        <HumidityChart weather={weather} />
      </div>
    </div>
  )
}

export default Details
