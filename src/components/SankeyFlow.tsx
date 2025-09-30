import { useEffect, useRef, useState } from 'react';

interface FlowData {
  from: string;
  to: string;
  users: number;
}

interface Props {
  data: FlowData[];
  title?: string;
}

export default function SankeyFlow({ data, title }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div ref={containerRef} className="w-full bg-white rounded-xl p-6">
      {title && <h3 className="text-lg font-bold mb-4">{title}</h3>}
      
      <div className="space-y-3">
        {data.map((flow, idx) => {
          const maxUsers = Math.max(...data.map(f => f.users));
          const widthPercent = (flow.users / maxUsers) * 100;
          const totalUsers = data.reduce((sum, f) => sum + f.users, 0);
          const percentage = ((flow.users / totalUsers) * 100).toFixed(1);
          const isHovered = hoveredIndex === idx;
          
          return (
            <div 
              key={idx} 
              className="relative group"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className={`flex items-center justify-between mb-1 text-sm transition-all ${isHovered ? 'scale-102' : ''}`}>
                <span className="font-medium text-gray-700">{flow.from}</span>
                <span className="text-gray-500">→</span>
                <span className="font-medium text-gray-700">{flow.to}</span>
                <span className="font-semibold" style={{ color: '#033180' }}>{flow.users.toLocaleString()}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5 relative overflow-visible">
                <div 
                  className={`h-2.5 rounded-full transition-all duration-500 ${
                    isHovered ? 'shadow-lg scale-y-125' : ''
                  }`}
                  style={{ width: `${widthPercent}%`, background: 'linear-gradient(to right, #033180, #022456)' }}
                />
                {isHovered && (
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap shadow-xl z-10">
                    <div className="font-semibold">{flow.users.toLocaleString()} users ({percentage}%)</div>
                    <div className="text-gray-300 text-[10px]">{flow.from} → {flow.to}</div>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
