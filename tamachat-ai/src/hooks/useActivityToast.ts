import { useState, useEffect, useCallback } from 'react';

interface ActivityItem {
  id: string;
  content: string;
  timestamp: number;
  isRecent: boolean;
}

export const useActivityToast = () => {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  // Auto-hide toast when no activities
  useEffect(() => {
    if (activities.length === 0) {
      setIsVisible(false);
    }
  }, [activities]);

  // Cleanup old activities
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setActivities(prev => 
        prev.filter(activity => now - activity.timestamp < 8000) // Remove after 8 seconds total
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Update recent status
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setActivities(prev => 
        prev.map(activity => ({
          ...activity,
          isRecent: now - activity.timestamp < 4000 // Recent (large text) for 4 seconds
        }))
      );
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const addActivity = useCallback((content: string) => {
    const newActivity: ActivityItem = {
      id: `activity_${Date.now()}_${Math.random()}`,
      content,
      timestamp: Date.now(),
      isRecent: true
    };

    setActivities(prev => [newActivity, ...prev.slice(0, 4)]); // Keep max 5 activities
    setIsVisible(true);
  }, []);

  const toggleVisibility = useCallback(() => {
    setIsVisible(prev => !prev);
  }, []);

  return {
    activities,
    isVisible,
    addActivity,
    toggleVisibility
  };
};
