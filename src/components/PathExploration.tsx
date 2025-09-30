import React from 'react';

interface PathStep {
  step: number;
  topPages: Array<{ path: string; users: number }>;
}

interface Props {
  data: PathStep[];
  endingPoint: string;
  totalConversions: number;
}

export default function PathExploration({ data, endingPoint, totalConversions }: Props) {
  const maxUsers = Math.max(...data.flatMap(step => step.topPages.map(p => p.users)));

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900">Path to Form Submission</h3>
        <p className="text-sm text-gray-500 mt-1">User journey leading to {totalConversions.toLocaleString()} form submissions</p>
      </div>

      <div className="relative">
        {/* Timeline */}
        <div className="flex items-center justify-between mb-8">
          {data.map((stepData, idx) => (
            <React.Fragment key={idx}>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-lg z-10" style={{ background: 'linear-gradient(to bottom right, #033180, #022456)' }}>
                  {stepData.step}
                </div>
                <span className="text-xs text-gray-500 mt-2 font-medium">STEP {stepData.step}</span>
              </div>
              {idx < data.length - 1 && (
                <div className="flex-1 h-1 mx-2" style={{ background: 'linear-gradient(to right, #4d6fa8, #5876b3)' }}></div>
              )}
            </React.Fragment>
          ))}
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg z-10">
              ✓
            </div>
            <span className="text-xs text-gray-500 mt-2 font-medium">SUBMIT</span>
          </div>
        </div>

        {/* Path Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {data.map((stepData, idx) => (
            <div key={idx} className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Step {stepData.step}</h4>
              <div className="space-y-2">
                {stepData.topPages.map((page, pageIdx) => {
                  const widthPercent = (page.users / maxUsers) * 100;
                  const isMoreItem = page.path.includes('More');
                  
                  return (
                    <div key={pageIdx}>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className={`truncate flex-1 ${isMoreItem ? 'font-medium' : 'text-gray-600'}`} style={isMoreItem ? { color: '#033180' } : undefined} title={page.path}>
                          {page.path}
                        </span>
                        <span className="text-gray-900 font-semibold ml-2">{page.users}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className={`h-1.5 rounded-full transition-all duration-500 ${
                            ''
                          }`}
                          style={{ 
                            width: `${widthPercent}%`,
                            background: isMoreItem ? '#4d6fa8' : 'linear-gradient(to right, #033180, #022456)'
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Ending Point */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border-2 border-green-300">
            <h4 className="text-sm font-semibold text-green-700 mb-3">Form Submit</h4>
            <div className="flex flex-col items-center justify-center py-4">
              <div className="text-3xl font-bold text-green-600">{totalConversions.toLocaleString()}</div>
              <div className="text-xs text-gray-600 mt-1">Total Conversions</div>
            </div>
            <div className="mt-3 text-xs text-center text-gray-600 font-medium">
              {endingPoint}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
