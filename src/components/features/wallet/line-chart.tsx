import { memo } from 'react';
import ApexCharts, { Props } from 'react-apexcharts';

const LineChart = memo(({ data }: { data: number[] }) => {
  const options: Props['options'] = {
    chart: {
      type: 'line',
      height: 200,
      toolbar: {
        show: false,
      },
      fontFamily: 'Lexend',
      zoom: {
        enabled: false,
      },
      redrawOnParentResize: true,
      redrawOnWindowResize: true,
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 1000,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 4,
      colors: ['#7bda08'],
    },
    grid: {
      show: false,
    },
    markers: {
      colors: ['#000'],
      hover: {
        size: 8,
      },
      strokeWidth: 4,
    },
    xaxis: {
      offsetX: 0,
      tooltip: {
        enabled: false,
      },
      crosshairs: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      labels: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    fill: {
      type: 'gradient',
      colors: ['#fff'],
      opacity: 1,
      gradient: {
        type: 'horizontal',
        gradientToColors: ['#fff', '#F5DDDD', '#fff'],
        inverseColors: false,
        shadeIntensity: 1,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 10],
      },
    },
    yaxis: {
      show: false,
      min(min) {
        return min - 50 < 0 ? 0 : min - 30;
      },
      max(max) {
        return max + 50;
      },
    },
    tooltip: {
      fillSeriesColor: false,
      intersect: false,
      onDatasetHover: {
        highlightDataSeries: false,
      },
      inverseOrder: false,
      shared: false,
      marker: {
        show: false,
      },
      x: {
        show: false,
      },
    },
  };

  return (
    <div>
      <ApexCharts
        options={options}
        series={[
          {
            name: 'DCARBON',
            data: data,
          },
        ]}
        type="line"
        width="100%"
        height={250}
      />
    </div>
  );
});

export default LineChart;
