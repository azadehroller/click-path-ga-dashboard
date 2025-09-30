import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface FunnelData {
  step: string;
  users: number;
  percentage: number;
}

interface Props {
  data: FunnelData[];
  title?: string;
}

export default function FunnelChart({ data, title }: Props) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Destroy previous chart instance
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.map(d => d.step),
        datasets: [{
          label: 'Users',
          data: data.map(d => d.users),
          backgroundColor: [
            'rgba(59, 130, 246, 0.8)',
            'rgba(99, 102, 241, 0.8)',
            'rgba(139, 92, 246, 0.8)',
            'rgba(168, 85, 247, 0.8)',
            'rgba(217, 70, 239, 0.8)',
            'rgba(236, 72, 153, 0.8)',
          ],
          borderColor: [
            'rgb(59, 130, 246)',
            'rgb(99, 102, 241)',
            'rgb(139, 92, 246)',
            'rgb(168, 85, 247)',
            'rgb(217, 70, 239)',
            'rgb(236, 72, 153)',
          ],
          borderWidth: 2,
          borderRadius: 8,
        }]
      },
      options: {
        indexAxis: 'y',
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
          tooltip: {
            callbacks: {
              label: (context) => {
                const value = context.parsed.x;
                const percentage = data[context.dataIndex].percentage;
                return `Users: ${value.toLocaleString()} (${percentage}%)`;
              }
            }
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.05)',
            }
          },
          y: {
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
  }, [data, title]);

  return (
    <div className="w-full h-full">
      <canvas ref={chartRef}></canvas>
    </div>
  );
}
