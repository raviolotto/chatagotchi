import React from 'react';

interface ActivityToast {
  id: string;
  content: string;
  timestamp: number;
  isRecent: boolean;
}

interface ActivityToastProps {
  activities: ActivityToast[];
  isVisible: boolean;
  onToggle: () => void;
}

export const ActivityToast: React.FC<ActivityToastProps> = ({
  activities,
  isVisible,
  onToggle,
}) => {
  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className={`
          fixed bottom-6 right-6 w-12 h-12 rounded-full shadow-xl hover:shadow-2xl 
          transition-all duration-200 flex items-center justify-center z-50 hover:scale-105
          backdrop-blur-sm border border-white border-opacity-30
          ${isVisible ? 'bg-gray-900 bg-opacity-80 text-white' : 'bg-white bg-opacity-90 text-gray-700'}
        `}
      >
        <span className="text-lg">
          {isVisible ? '×' : '📋'}
        </span>
      </button>

      {/* Activity Stack */}
      {isVisible && activities.length > 0 && (
        <div className="fixed bottom-24 right-6 max-w-xs z-40">
          <div className="space-y-3">
            {activities.map((activity, index) => (
              <div
                key={activity.id}
                className={`
                  transition-all duration-500 ease-out transform
                  ${activity.isRecent 
                    ? 'text-lg font-bold text-white animate-fade-in-scale' 
                    : 'text-sm text-white opacity-60'
                  }
                  ${index === 0 ? 'animate-slide-in-right' : ''}
                  text-right leading-tight bg-black bg-opacity-40 backdrop-blur-sm 
                  px-3 py-2 rounded-lg border border-white border-opacity-20
                `}
                style={{
                  textShadow: activity.isRecent ? '0 2px 4px rgba(0,0,0,0.5)' : '0 1px 2px rgba(0,0,0,0.3)',
                  filter: activity.isRecent ? 'none' : 'blur(0.5px)'
                }}
              >
                {activity.content}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
