import { memo } from 'react';
import { convertToSlug } from '@/utils/helpers';
import { useNavigate } from '@tanstack/react-router';
import ApexCharts, { Props } from 'react-apexcharts';

interface IProps {
  config: {
    id: number[];
    labels: string[];
    data: number[];
    isAllEmpty?: boolean;
    colors: string[];
  };
}

const DonutChart = memo(
  ({ config: { labels, data, isAllEmpty, colors, id } }: IProps) => {
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
            !isAllEmpty &&
              navigate({
                to: '/$slug',
                params: {
                  slug: convertToSlug(
                    event.target.parentNode.attributes[2].value,
                  ),
                },
                search: {
                  chart_type: 'contract',
                },
              });
          },
        },
        redrawOnParentResize: true,
      },
      colors: isAllEmpty ? ['#f0f0f0'] : colors,
      dataLabels: {
        enabled: false,
        enabledOnSeries: undefined,
        textAnchor: 'middle',
        distributed: true,
      },
      legend: {
        position: 'bottom',
        height: 60,
        horizontalAlign: 'center',
        fontSize: '14px',
        itemMargin: {
          horizontal: 5,
          vertical: 5,
        },
        customLegendItems: isAllEmpty ? [] : labels,
      },
      tooltip: {
        y: {
          title: {
            formatter: () => 'Carbon:',
          },
        },
      },
      noData: {
        text: 'No data',
        align: 'center',
        verticalAlign: 'middle',
        offsetX: 0,
        offsetY: -20,
        style: {
          color: '#b1b1b1',
          fontSize: '14px',
          fontFamily: undefined,
        },
      },
      plotOptions: {
        pie: {
          donut: {
            size: '50%',
          },
          expandOnClick: !isAllEmpty,
        },
      },
      labels: isAllEmpty ? [] : id.map((id) => id.toString()),
      states: {
        active: {
          filter: {
            type: 'none',
          },
        },
        hover: {
          filter: {
            type: isAllEmpty ? 'none' : 'darken',
            value: 0.8,
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
            },
            legend: {
              position: 'right',
              height: '100%',
              width: 250,
            },
          },
        },
        {
          breakpoint: 1300,
          options: {
            chart: {
              width: '100%',
              height: 300,
            },
          },
        },
        {
          breakpoint: 1700,
          options: {
            chart: {
              width: '100%',
              height: 310,
            },
          },
        },
      ],
    };
    return (
      <div>
        <ApexCharts
          options={options}
          series={isAllEmpty ? [] : data}
          type="donut"
          height={300}
        />
      </div>
    );
  },
);

export default DonutChart;
