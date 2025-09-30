import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface BarData {
  label: string;
  value: number;
}

interface Props {
  data: BarData[];
  title?: string;
  color?: string;
  horizontal?: boolean;
}

export default function BarChart({ data, title, color = 'rgba(59, 130, 246, 0.8)', horizontal = false }: Props) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.map(d => d.label),
        datasets: [{
          label: 'Value',
          data: data.map(d => d.value),
          backgroundColor: color,
          borderColor: color.replace('0.8', '1'),
          borderWidth: 2,
          borderRadius: 8,
        }]
      },
      options: {
        indexAxis: horizontal ? 'y' : 'x',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: !!title,
            text: title,
            font: {
              size: 16,
              weight: 'bold'
            }
          },
        },
        scales: {
          [horizontal ? 'x' : 'y']: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.05)',
            }
          },
          [horizontal ? 'y' : 'x']: {
            grid: {
              display: false,
            }
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, title, color, horizontal]);

  return (
    <div className="w-full h-full">
      <canvas ref={chartRef}></canvas>
    </div>
  );
}
