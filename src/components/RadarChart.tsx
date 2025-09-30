import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface RadarData {
  label: string;
  value: number;
}

interface Props {
  data: RadarData[];
  title?: string;
}

export default function RadarChart({ data, title }: Props) {
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
      type: 'radar',
      data: {
        labels: data.map(d => d.label),
        datasets: [{
          label: 'Performance',
          data: data.map(d => d.value),
          backgroundColor: 'rgba(99, 102, 241, 0.2)',
          borderColor: 'rgb(99, 102, 241)',
          pointBackgroundColor: 'rgb(99, 102, 241)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(99, 102, 241)',
          borderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'point',
          intersect: true,
        },
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
            enabled: true,
            mode: 'nearest',
            intersect: false,
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            titleColor: '#fff',
            bodyColor: '#fff',
            borderColor: 'rgb(99, 102, 241)',
            borderWidth: 2,
            padding: 15,
            displayColors: true,
            titleFont: {
              size: 14,
              weight: 'bold'
            },
            bodyFont: {
              size: 13
            },
            callbacks: {
              title: (context) => {
                return context[0].label || '';
              },
              label: (context) => {
                return `Engagement Score: ${context.parsed.r.toFixed(1)}%`;
              }
            }
          },
        },
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            grid: {
              color: 'rgba(0, 0, 0, 0.1)',
            },
            angleLines: {
              color: 'rgba(0, 0, 0, 0.1)',
            },
            ticks: {
              backdropColor: 'transparent',
              stepSize: 20,
            },
            pointLabels: {
              font: {
                size: 11
              }
            }
          }
        },
        elements: {
          line: {
            borderWidth: 3
          },
          point: {
            radius: 5,
            hoverRadius: 8,
            hitRadius: 15
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
