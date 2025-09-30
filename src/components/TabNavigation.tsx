import { useState, useEffect } from 'react';

interface Tab {
  id: string;
  label: string;
  icon: string;
}

interface Props {
  tabs: Tab[];
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

export default function TabNavigation({ tabs, activeTab: initialTab, onTabChange }: Props) {
  const [activeTab, setActiveTab] = useState(initialTab || 'overview');

  useEffect(() => {
    // Listen for hash changes
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || 'overview';
      setActiveTab(hash);
    };

    handleHashChange(); // Set initial tab from hash
    window.addEventListener('hashchange', handleHashChange);
    
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    
    // Dispatch custom event for vanilla JS to listen to
    const event = new CustomEvent('tabChange', { detail: { tabId } });
    document.dispatchEvent(event);
    
    // Call prop callback if provided
    if (onTabChange) {
      onTabChange(tabId);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 mb-8 sticky top-[96px] z-40">
      <div className="flex overflow-x-auto scrollbar-hide">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`
              flex items-center gap-2 px-6 py-4 font-semibold text-sm whitespace-nowrap transition-all border-b-4 min-w-fit
              ${index === 0 ? 'rounded-tl-xl rounded-bl-xl' : ''}
              ${index === tabs.length - 1 ? 'rounded-tr-xl rounded-br-xl' : ''}
              ${activeTab === tab.id 
                ? 'border-transparent text-white bg-opacity-90' 
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }
            `}
            style={activeTab === tab.id ? { backgroundColor: '#033180', borderBottomColor: '#033180' } : undefined}
          >
            <span className="text-xl">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
