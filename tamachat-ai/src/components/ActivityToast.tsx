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
      {/* Single Clean Notification Stack */}
      {activities.length > 0 && (
        <div className="fixed bottom-16 right-6 max-w-xs z-40">
          <div className="space-y-2">
            {activities.map((activity, index) => {
              // Show only recent activity when toggle is off
              if (!isVisible && !activity.isRecent) return null;
              
              return (
                <div
                  key={activity.id}
                  className={`
                    transition-all duration-500 ease-out transform
                    ${activity.isRecent 
                      ? 'text-xl font-semibold text-white animate-fade-in-scale' 
                      : 'text-sm text-white opacity-60'
                    }
                    ${index === 0 ? 'animate-slide-in-right' : ''}
                    text-right leading-tight
                  `}
                >
                  {activity.content}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Minimal Toggle Button - Under the text */}
      <button
        onClick={onToggle}
        className={`
          fixed bottom-6 right-6 w-8 h-8 rounded-full shadow-lg hover:shadow-xl 
          transition-all duration-200 flex items-center justify-center z-50 hover:scale-110
          ${isVisible ? 'bg-gray-800 bg-opacity-70 text-white' : 'bg-white bg-opacity-80 text-gray-600'}
          border border-gray-300 border-opacity-50
        `}
      >
        <span className="text-xs">
          {isVisible ? '×' : '+'}
        </span>
      </button>
    </>
  );
};
