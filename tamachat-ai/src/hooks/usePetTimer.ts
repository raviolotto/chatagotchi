import { useEffect, useRef } from 'react';
import { usePetStore } from '../store/petStore';

// Configuration for stat degradation
const DEGRADATION_CONFIG = {
  hunger: 2,      // points per minute
  happiness: 1,   // points per minute  
  energy: 1.5,    // points per minute
  hygiene: 0.8    // points per minute
};

const TIMER_INTERVAL = 30000; // 30 seconds

export const usePetTimer = () => {
  const { pet, updatePetStats } = usePetStore();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const lastUpdateRef = useRef<number>(pet.lastInteraction);

  useEffect(() => {
    const degradeStats = () => {
      const now = Date.now();
      const timeDiff = now - lastUpdateRef.current;
      const minutesPassed = timeDiff / (1000 * 60);

      // Only degrade if some time has passed
      if (minutesPassed > 0.5) { // minimum 30 seconds
        const newStats = {
          hunger: Math.max(0, pet.hunger - (DEGRADATION_CONFIG.hunger * minutesPassed)),
          happiness: Math.max(0, pet.happiness - (DEGRADATION_CONFIG.happiness * minutesPassed)),
          energy: Math.max(0, pet.energy - (DEGRADATION_CONFIG.energy * minutesPassed)),
          hygiene: Math.max(0, pet.hygiene - (DEGRADATION_CONFIG.hygiene * minutesPassed))
        };

        updatePetStats(newStats);
        lastUpdateRef.current = now;
      }
    };

    // Handle page visibility changes (when user comes back)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        degradeStats();
      }
    };

    // Handle focus events
    const handleFocus = () => {
      degradeStats();
    };

    // Set up timer
    timerRef.current = setInterval(degradeStats, TIMER_INTERVAL);

    // Add event listeners
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);

    // Initial check when hook mounts
    degradeStats();

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [pet.hunger, pet.happiness, pet.energy, pet.hygiene, updatePetStats]);

  // Update last interaction reference when pet state changes
  useEffect(() => {
    lastUpdateRef.current = pet.lastInteraction;
  }, [pet.lastInteraction]);

  return {
    needsAttention: usePetStore(state => state.needsAttention()),
    petMood: pet.mood
  };
};