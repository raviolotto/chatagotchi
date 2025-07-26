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
      {/* Single Clean Notification Stack - LEFT SIDE */}
      {activities.length > 0 && (
        <div className="fixed bottom-16 left-6 max-w-xs z-40">
          <div className="space-y-2">
            {activities.map((activity, index) => {
              // Show only recent activity when toggle is off
              if (!isVisible && !activity.isRecent) return null;
              
              return (
                <div
                  key={activity.id}
                  className={`
                    transition-all duration-500 ease-out
                    ${activity.isRecent 
                      ? 'text-xl font-semibold text-gray-800' 
                      : 'text-sm text-gray-600 opacity-60'
                    }
                    text-left leading-tight
                  `}
                >
                  {activity.content}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Minimal Toggle Button - FIXED BOTTOM LEFT */}
      <button
        onClick={onToggle}
        className={`
          fixed bottom-6 left-6 w-10 h-10 rounded-3xl 
          transition-colors flex items-center justify-center z-50
          ${isVisible ? 'bg-gray-800 text-white' : 'bg-white text-gray-600 border border-gray-200'}
        `}
      >
        <span className="text-sm font-medium">
          {isVisible ? '×' : '+'}
        </span>
      </button>
    </>
  );
};
