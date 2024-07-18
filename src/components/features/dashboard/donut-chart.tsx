import { memo } from 'react';
import { convertToSlug } from '@/utils/helpers';
import { useNavigate } from '@tanstack/react-router';
import ApexCharts, { Props } from 'react-apexcharts';

const colors = [
  '#FF5733', // Red-Orange
  '#33FF57', // Lime Green
  '#3357FF', // Blue
  '#FF33A6', // Pink
  '#33FFA6', // Aquamarine
  '#FF33FF', // Magenta
  '#33A6FF', // Light Blue
  '#A6FF33', // Yellow-Green
  '#5733FF', // Indigo
  '#A633FF', // Purple
  '#FFAA33', // Amber
  '#33FFAA', // Sea Green
  '#FF33AA', // Hot Pink
  '#33AAFF', // Sky Blue
  '#AAFF33', // Chartreuse
  '#FF5733', // Coral
  '#FFAA33', // Gold
  '#FF33FF', // Deep Pink
  '#AA33FF', // Violet
  '#33FFAA', // Mint
  '#AA33FF', // Orchid
  '#FF33AA', // Fuchsia
  '#33FFAA', // Emerald
  '#FF33A6', // Magenta-Pink
];

const Donutchart = memo(({ data }: { data: number[] }) => {
  const navigate = useNavigate();
  const options: Props['options'] = {
    chart: {
      type: 'donut',
      fontFamily: 'Lexend',
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
      events: {
        dataPointSelection: (event) => {
          navigate({
            to: '/$slug',
            params: {
              slug: convertToSlug(event.target.parentNode.attributes[2].value),
            },
          });
        },
      },
      redrawOnParentResize: true,
    },
    colors: colors,
    dataLabels: {
      enabled: false,
      enabledOnSeries: undefined,
      textAnchor: 'middle',
      distributed: true,
    },
    legend: {
      position: 'bottom',
      height: 50,
      horizontalAlign: 'center',
      fontSize: '14px',
      itemMargin: {
        horizontal: 5,
        vertical: 5,
      },
    },
    noData: {
      text: undefined,
      align: 'center',
      verticalAlign: 'middle',
      offsetX: 0,
      offsetY: 0,
      style: {
        color: undefined,
        fontSize: '14px',
        fontFamily: undefined,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: '50%',
        },
        expandOnClick: true,
      },
    },
    labels: [
      'projec1',
      'projec31',
      'projec21',
      'projec11',
      'projec34',
      'projec4',
    ],
    states: {
      active: {
        filter: {
          type: 'none',
        },
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: '100%',
          },
          legend: {
            position: 'bottom',
            width: '100%',
          },
        },
      },
      {
        breakpoint: 900,
        options: {
          chart: {
            width: '100%',
            height: 'auto',
          },
          legend: {
            position: 'right',
            height: '100%',
            width: 100,
          },
        },
      },
      {
        breakpoint: 1500,
        options: {
          chart: {
            width: '100%',
          },
        },
      },
    ],
  };
  return (
    <div>
      <ApexCharts
        options={options}
        series={data || [44, 55, 41, 17, 15, 12, 23, 12]}
        type="donut"
        height={330}
      />
    </div>
  );
});

export default Donutchart;
