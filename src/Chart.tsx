import { useEffect, useRef, useState } from "react";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import type { Response } from "./types";
import { dayjsUtc } from "./dayjs";
import { Dayjs } from "dayjs";
import SkeletonLoader from "./SkeletonLoader";

type ChartProps = {
  data: Response;
  loading: boolean;
  selected: string;
  startDate: Dayjs | string;
  endDate: Dayjs | string;
};

const Chart = ({ data, loading, selected, startDate, endDate }: ChartProps) => {
  // Capitalizing the first letter of our Title
  const title = selected.charAt(0).toUpperCase() + selected.slice(1);
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  const [seriesData, setSeriesData] = useState<Highcharts.SeriesOptionsType[]>(
    [],
  );

  useEffect(() => {
    // Convert startDate and endDate to UTC milliseconds
    const startMs = dayjsUtc(startDate).startOf("day").valueOf();
    const endMs = dayjsUtc(endDate).endOf("day").valueOf();

    // Filter and process the data based on startDate and endDate
    const newSeriesData: Highcharts.SeriesLineOptions[] = data.map((series) => {
      return {
        name: series.name,
        type: "line",
        data: series.data
          .filter(([date]) => {
            const dateMs = dayjsUtc(date).valueOf();
            return dateMs >= startMs && dateMs <= endMs; // Filter points within date range
          })
          .map(([date, downloads, revenue]) => {
            // Select between downloads or revenue data points based on selection
            const value = selected === "downloads" ? downloads : revenue;
            const dateMs = dayjsUtc(date).valueOf(); // Convert date string to unix milliseconds
            return {
              x: dateMs,
              y: value as number,
            };
          }),
      } as Highcharts.SeriesLineOptions;
    });

    setSeriesData(newSeriesData);
  }, [data, selected, startDate, endDate]); // Re-run the effect when dependencies change

  if (loading) {
    return <SkeletonLoader />; // Add a loading indicator
  }

  if (!seriesData.length) {
    return null; // If no data, don't render the chart
  }

  const options: Highcharts.Options = {
    title: {
      text: `${title} by App`,
    },
    subtitle: {
      text: `${dayjsUtc(startDate).format("MMM DD, YYYY")} - ${dayjsUtc(endDate).format("MMM DD, YYYY")}`, // Format the subtitle with start and end dates
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
          const date = dayjsUtc(this.value).format("MMM DD, YY'"); // Format date as "Jan 01, 20'"
          return date;
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
