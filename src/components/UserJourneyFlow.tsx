import DoughnutChart from './DoughnutChart';

interface PathData {
  label: string;
  value: number;
}

interface Props {
  paths: PathData[];
  totalUsers: number;
}

export default function UserJourneyFlow({ paths, totalUsers }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-1">User Journey Distribution</h3>
        <p className="text-sm text-gray-500">Top conversion paths • {totalUsers.toLocaleString()} total users</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Chart */}
        <div className="h-[350px]">
          <DoughnutChart
            client:load
            data={paths}
          />
        </div>

        {/* Legend with Details */}
        <div className="space-y-3">
          {paths.map((path, index) => {
            const percentage = ((path.value / totalUsers) * 100).toFixed(1);
            const colors = [
              '#033180',
              '#f59e0b',
              '#22c55e',
              '#8b5cf6',
              '#ec4899',
              '#ef4444',
              '#06b6d4',
              '#f97316'
            ];
            
            return (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3 flex-1">
                  <div
                    className="w-4 h-4 rounded-full shadow-sm"
                    style={{ backgroundColor: colors[index % colors.length] }}
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-sm">{path.label}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{percentage}% of total journeys</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold" style={{ color: colors[index % colors.length] }}>
                    {path.value.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">users</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
