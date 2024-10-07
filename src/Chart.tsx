import { useEffect, useRef, useState } from "react";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import type { Response } from "./types";
import formatDate, { dayjsUtc } from "./dayjs";
import { Dayjs } from "dayjs";

type ChartProps = {
  data: Response;
  loading: boolean;
  selected: string;
  startDate: Dayjs | string;
  endDate: Dayjs | string;
};

const Chart = ({ data, loading, selected, startDate, endDate }: ChartProps) => {
  //Capitalizing the first letter of our Title
  const title = selected.charAt(0).toUpperCase() + selected.slice(1);
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  const [seriesData, setSeriesData] = useState<Highcharts.SeriesOptionsType[]>(
    [],
  );

  // Format startDate and endDate using dayjs
  const formattedStartDate = dayjsUtc(startDate).format("MMM DD, YYYY");
  const formattedEndDate = dayjsUtc(endDate).format("MMM DD, YYYY");

  useEffect(() => {
    const newSeriesData: Highcharts.SeriesLineOptions[] = data.map((series) => {
      return {
        name: series.name,
        type: "line",
        data: series.data.map(([date, downloads, revenue]) => {
          //variable that selects between downloads or revenue data points based on selection
          const value = selected === "downloads" ? downloads : revenue;
          const dateMs = dayjsUtc(date).valueOf(); // convert date string to unix milliseconds
          const yValue = value as number;
          return {
            x: dateMs,
            y: yValue,
          };
        }),
      } as Highcharts.SeriesLineOptions;
    });
    setSeriesData(newSeriesData);
  }, [data, selected]);

  if (!seriesData.length) {
    return null;
  }

  const options: Highcharts.Options = {
    title: {
      text: `${title} by App`,
    },
    subtitle: {
      text: `${formattedStartDate} - ${formattedEndDate}`,
    },
    yAxis: {
      title: {
        text: `${title}`,
      },
    },
    xAxis: {
      type: "datetime",
      labels: {
        formatter: function () {
          return formatDate(this.value as string); // `this.value` is the timestamp in milliseconds
        },
      },
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
    },
    plotOptions: {
      series: {
        marker: {
          enabled: false,
          states: {
            hover: {
              enabled: false,
            },
          },
        },
      },
    },
    series: seriesData,
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      ref={chartComponentRef}
    />
  );
};

export default Chart;
