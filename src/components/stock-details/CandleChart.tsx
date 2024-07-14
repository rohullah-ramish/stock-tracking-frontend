import { ApexOptions } from "apexcharts";
import { useState } from "react";
import ReactApexChart from "react-apexcharts";

type CandleChartProps = {
  title: string;
  series: ApexAxisChartSeries;
};

const chartOptions = {
  chart: {
    type: "candlestick",
    height: 500,
  },
  xaxis: {
    type: "datetime",
  },
  yaxis: {
    tooltip: {
      enabled: true,
    },
  },
} satisfies ApexOptions;

function CandleChart(props: CandleChartProps) {
  return (
    <div className="min-h-[500px] w-full">
      <ReactApexChart
        options={{ ...chartOptions, title: { text: props.title } }}
        series={props.series}
        type="candlestick"
        height={350}
      />
    </div>
  );
}

export default CandleChart;
