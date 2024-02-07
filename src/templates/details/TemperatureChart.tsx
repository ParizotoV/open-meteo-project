import AreaChartCard from "@/components/AreaChart/AreaChart";
import { Weather } from "@/models/Weather";
import { CustomTooltipProps } from "@tremor/react";
import moment from "moment";
import React, { useEffect, useState } from "react";

type TemperatureChartProps = {
  weather: Weather;
};

type ChartDataParams = {
  Time: string;
  "Temperature (C)": number;
};

const TemperatureChart: React.FC<TemperatureChartProps> = ({ weather }) => {
  const [chartData, setChartData] = useState<Array<ChartDataParams>>([]);

  useEffect(() => {
    const hourly = weather?.hourly?.time?.map((time) =>
      moment(new Date(time)).format("DD/MM HH:mm")
    );

    const mapping = hourly?.map((hour, i) => ({
      Time: hour,
      "Temperature (C)": weather?.hourly?.temperature_2m[i],
    }));

    setChartData(mapping);
  }, [weather]);

  const customTooltip = (props: CustomTooltipProps) => {
    const { payload, active } = props;
    if (!active || !payload) return null;
    return (
      <div className="w-56 rounded-tremor-default text-tremor-default bg-tremor-background p-2 shadow-tremor-dropdown border border-tremor-border">
        {payload.map((category, idx) => (
          <div key={idx} className="flex flex-1 space-x-2.5">
            <div className={`w-1 flex flex-col bg-[#292248] rounded`} />
            <div className="space-y-1">
              <p className="text-tremor-content">{category.dataKey}</p>
              <p className="font-medium text-tremor-content-emphasis">
                {category.value} {weather?.hourly_units?.temperature_2m} -
                {category.payload.Time}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };
  return (
    <AreaChartCard
      title="Temperature over time"
      data={chartData}
      className="h-[220px] mt-2"
      index="Time"
      categories={["Temperature (C)"]}
      yAxisWidth={65}
      colors={["#B2A8EE"]}
      customTooltip={customTooltip}
    />
  );
};

export default TemperatureChart;
