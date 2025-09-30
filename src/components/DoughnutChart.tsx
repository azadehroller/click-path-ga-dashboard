import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface DoughnutData {
  label: string;
  value: number;
}

interface Props {
  data: DoughnutData[];
  title?: string;
}

export default function DoughnutChart({ data, title }: Props) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    const colors = [
      'rgba(3, 49, 128, 0.8)',
      'rgba(99, 102, 241, 0.8)',
      'rgba(139, 92, 246, 0.8)',
      'rgba(168, 85, 247, 0.8)',
      'rgba(217, 70, 239, 0.8)',
      'rgba(236, 72, 153, 0.8)',
      'rgba(244, 63, 94, 0.8)',
      'rgba(251, 146, 60, 0.8)',
    ];

    chartInstance.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: data.map(d => d.label),
        datasets: [{
          data: data.map(d => d.value),
          backgroundColor: colors.slice(0, data.length),
          borderColor: '#fff',
          borderWidth: 3,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              padding: 15,
              font: {
                size: 12
              },
              generateLabels: (chart) => {
                const datasets = chart.data.datasets;
                const labels = chart.data.labels as string[];
                return labels.map((label, i) => ({
                  text: `${label}: ${data[i].value.toLocaleString()}`,
                  fillStyle: colors[i],
                  hidden: false,
                  index: i,
                }));
              }
            }
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
                const value = context.parsed;
                const total = data.reduce((sum, d) => sum + d.value, 0);
                const percentage = ((value / total) * 100).toFixed(1);
                return `${context.label}: ${value.toLocaleString()} (${percentage}%)`;
              }
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
