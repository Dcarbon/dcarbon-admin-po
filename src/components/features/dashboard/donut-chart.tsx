import { memo } from 'react';
import { convertToSlug } from '@/utils/helpers';
import { useNavigate } from '@tanstack/react-router';
import ApexCharts, { Props } from 'react-apexcharts';

interface IProps {
  config: {
    labels: string[];
    data: number[];
    isAllEmpty?: boolean;
    colors: string[];
  };
}

const DonutChart = memo(
  ({ config: { labels, data, isAllEmpty, colors } }: IProps) => {
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
              }).then();
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
          expandOnClick: !isAllEmpty,
        },
      },
      labels: isAllEmpty ? ['No data'] : labels,
      states: {
        active: {
          filter: {
            type: 'none',
          },
        },
        hover: {
          filter: {
            type: isAllEmpty ? 'none' : 'darken',
            value: 0.5,
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
          breakpoint: 1700,
          options: {
            chart: {
              width: '100%',
              height: '270px',
            },
          },
        },
      ],
    };
    return (
      <div>
        <ApexCharts
          options={options}
          series={isAllEmpty ? [1] : data}
          type="donut"
          height={300}
        />
      </div>
    );
  },
);

export default DonutChart;
