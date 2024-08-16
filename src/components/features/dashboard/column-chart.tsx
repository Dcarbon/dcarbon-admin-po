import { memo } from 'react';
import { isEmpty } from '@/utils/helpers';
import ApexCharts, { Props } from 'react-apexcharts';

const ColumnChart = memo(
  ({ data, times }: { data: number[]; times: string[] }) => {
    const options: Props['options'] = {
      chart: {
        type: 'bar',
        fontFamily: 'Lexend',
        width: '100%',
        animations: {
          enabled: true,
          easing: 'linear',
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
        redrawOnParentResize: true,
        redrawOnWindowResize: true,
        toolbar: {
          show: false,
        },
      },
      stroke: {
        show: false,
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
      fill: {
        type: 'gradient',
        colors: ['#74D10C', '#5DAF01'],
        opacity: 0.7,
        gradient: {
          type: 'vertical',
          opacityFrom: 0.9,
          opacityTo: 1,
          gradientToColors: ['#74D10C', '#5DAF01'],
          stops: [0, 100],
        },
      },
      grid: {
        show: false,
      },

      plotOptions: {
        bar: {
          columnWidth: '20px',
          barHeight: '100%',
          borderRadius: 5,
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      xaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        categories: times || [
          'january',
          'february',
          'march',
          'april',
          'may',
          'june',
          'july',
          'august',
          'september',
          'october',
          'november',
          'december',
        ],
        labels: {
          style: {
            colors: '#4F4F4F',
            fontSize: '12px',
          },
        },
      },
      tooltip: {
        x: {
          show: false,
        },
      },
      yaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        decimalsInFloat: 0,
        floating: false,
        opposite: false,
        stepSize:
          data.length > 0 && Math.max(...data) >= 10
            ? Math.max(...data) / 10
            : 1,
        min: 0,
        max: data.length > 0 ? Math.max(...data) + Math.max(...data) / 10 : 10,
        labels: {
          style: {
            colors: '#4F4F4F',
            fontSize: '12px',
          },
        },
      },
      responsive: [
        {
          breakpoint: 1024,
          options: {
            chart: {
              width: '100%',
              height: 300,
            },
            plotOptions: {
              bar: {
                columnWidth: '13',
                borderRadius: 3,
              },
            },
          },
        },

        {
          breakpoint: 1300,
          options: {
            chart: {
              width: '100%',
              height: 265,
            },
            xaxis: {
              labels: {
                style: {
                  fontSize: '10px',
                },
                formatter: (value: string) => {
                  if (value.length > 4) {
                    return value.slice(0, 3);
                  }
                  return value;
                },
              },
            },
          },
        },
      ],
    };
    return (
      <div>
        <ApexCharts
          options={options}
          series={[
            {
              name: 'Carbon',
              data: isEmpty(data) ? [] : data,
            },
          ]}
          type="bar"
          height={260}
        />
      </div>
    );
  },
);

export default ColumnChart;
