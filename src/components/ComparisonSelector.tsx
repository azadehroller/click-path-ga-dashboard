import { useState, useEffect } from 'react';
import BarChart from './BarChart';
import RadarChart from './RadarChart';
import DoughnutChart from './DoughnutChart';

interface ComparisonItem {
  id: string;
  label: string;
  metrics: Record<string, number | string>;
}

interface Props {
  title: string;
  items: ComparisonItem[];
  metricDefinitions: Array<{
    key: string;
    label: string;
    format?: 'number' | 'percentage' | 'time' | 'currency' | 'text';
  }>;
  maxSelections?: number;
}

export default function ComparisonSelector({ title, items, metricDefinitions, maxSelections = 6 }: Props) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'table' | 'chart' | 'radar'>('table');

  useEffect(() => {
    // Pre-select first 3 items by default
    if (items.length > 0) {
      setSelectedIds(items.slice(0, Math.min(3, items.length)).map(item => item.id));
    }
  }, [items]);

  const toggleSelection = (id: string) => {
    setSelectedIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(i => i !== id);
      } else if (prev.length < maxSelections) {
        return [...prev, id];
      }
      return prev;
    });
  };

  const selectedItems = items.filter(item => selectedIds.includes(item.id));

  const formatValue = (value: number | string, format?: string) => {
    if (typeof value === 'string') return value;
    
    switch (format) {
      case 'percentage':
        return `${value}%`;
      case 'time':
        return value;
      case 'currency':
        return `$${value.toLocaleString()}`;
      case 'text':
        return String(value);
      case 'number':
      default:
        return value.toLocaleString();
    }
  };

  const getChartColor = (index: number) => {
    const colors = [
      'rgba(3, 49, 128, 0.8)',     // Blue
      'rgba(236, 72, 153, 0.8)',   // Pink
      'rgba(34, 197, 94, 0.8)',    // Green
      'rgba(249, 115, 22, 0.8)',   // Orange
      'rgba(139, 92, 246, 0.8)',   // Purple
      'rgba(255, 41, 12, 0.8)',    // Red
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-500">Select up to {maxSelections} items to compare</p>
      </div>

      {/* Item Selection */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => toggleSelection(item.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedIds.includes(item.id)
                  ? 'text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              style={selectedIds.includes(item.id) ? { backgroundColor: '#033180' } : undefined}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* View Mode Toggle */}
      {selectedItems.length > 0 && (
        <>
          <div className="mb-6 flex gap-2 border-b border-gray-200">
            <button
              onClick={() => setViewMode('table')}
              className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
                viewMode === 'table'
                  ? 'border-transparent'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
              style={viewMode === 'table' ? { borderBottomColor: '#033180', color: '#033180' } : undefined}
            >
              📋 Table View
            </button>
            <button
              onClick={() => setViewMode('chart')}
              className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
                viewMode === 'chart'
                  ? 'border-transparent'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
              style={viewMode === 'chart' ? { borderBottomColor: '#033180', color: '#033180' } : undefined}
            >
              📊 Chart View
            </button>
            <button
              onClick={() => setViewMode('radar')}
              className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
                viewMode === 'radar'
                  ? 'border-transparent'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
              style={viewMode === 'radar' ? { borderBottomColor: '#033180', color: '#033180' } : undefined}
            >
              🎯 Radar View
            </button>
          </div>

          {/* Table View */}
          {viewMode === 'table' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Metric</th>
                    {selectedItems.map((item, idx) => (
                      <th key={item.id} className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                        <span className="inline-flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: getChartColor(idx) }}></span>
                          {item.label}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {metricDefinitions.map((metric, idx) => (
                    <tr key={metric.key} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="py-3 px-4 text-sm font-medium text-gray-900">{metric.label}</td>
                      {selectedItems.map((item) => (
                        <td key={item.id} className="text-right py-3 px-4 text-sm text-gray-700 font-semibold">
                          {formatValue(item.metrics[metric.key], metric.format)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Chart View */}
          {viewMode === 'chart' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {metricDefinitions.filter(m => typeof selectedItems[0].metrics[m.key] === 'number').map((metric) => (
                <div key={metric.key} className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-4">{metric.label}</h4>
                  <div className="h-[250px]">
                    <BarChart
                      client:load
                      data={selectedItems.map((item, idx) => ({
                        label: item.label,
                        value: Number(item.metrics[metric.key])
                      }))}
                      color="rgba(3, 49, 128, 0.8)"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Radar View */}
          {viewMode === 'radar' && (
            <div className="h-[500px]">
              <RadarChart
                client:load
                data={selectedItems.map((item) => {
                  // Calculate average score across all numeric metrics
                  const numericMetrics = metricDefinitions.filter(m => typeof item.metrics[m.key] === 'number');
                  const total = numericMetrics.reduce((sum, m) => sum + Number(item.metrics[m.key]), 0);
                  const avg = numericMetrics.length > 0 ? total / numericMetrics.length : 0;
                  
                  return {
                    label: item.label,
                    value: avg
                  };
                })}
              />
            </div>
          )}
        </>
      )}

      {selectedItems.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">Select items above to compare</p>
        </div>
      )}
    </div>
  );
}
