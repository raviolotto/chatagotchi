import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { 
  PetState, 
  PetStore, 
  PetAction, 
  PetMood, 
  PetStats, 
  PetPersonality,
  ChatMessage,
  PET_EMOJIS,
  PERSONALITY_TRAITS 
} from '../types';

// Default pet state
const createDefaultPet = (name: string, personality: PetPersonality): PetState => ({
  id: `pet_${Date.now()}`,
  name,
  personality,
  mood: 'happy',
  hunger: 100,
  happiness: 100,
  energy: 100,
  hygiene: 100,
  lastInteraction: Date.now(),
  createdAt: Date.now(),
  conversationHistory: [
    {
      id: 'welcome',
      sender: 'pet',
      content: `Ciao! Sono ${name}! Sono così felice di conoscerti! 🐾`,
      timestamp: Date.now(),
      mood: 'excited'
    }
  ]
});

// Action effects configuration
const ACTION_EFFECTS: Record<PetAction, (currentStats: PetStats) => Partial<PetStats>> = {
  feed: (stats) => ({
    hunger: Math.min(100, stats.hunger + 30),
    happiness: Math.min(100, stats.happiness + 5)
  }),
  play: (stats) => ({
    happiness: Math.min(100, stats.happiness + 25),
    energy: Math.max(0, stats.energy - 15),
    hunger: Math.max(0, stats.hunger - 10)
  }),
  clean: (stats) => ({
    hygiene: Math.min(100, stats.hygiene + 40),
    happiness: Math.min(100, stats.happiness + 10)
  }),
  sleep: (stats) => ({
    energy: Math.min(100, stats.energy + 35),
    happiness: Math.min(100, stats.happiness + 5)
  })
};

// Mood calculation logic
const calculateMood = (stats: PetStats): PetMood => {
  const { hunger, happiness, energy, hygiene } = stats;
  
  if (hygiene < 30) return 'dirty';
  if (hunger < 25) return 'hungry';
  if (energy < 20) return 'sleepy';
  if (happiness < 30) return 'sad';
  if (happiness > 80 && hunger > 70) return 'excited';
  if (happiness > 60) return 'happy';
  return 'content';
};

// Stat color mapping
const getStatColor = (statType: keyof PetStats, value: number): string => {
  const colors = {
    hunger: value > 60 ? 'bg-green-500' : value > 30 ? 'bg-yellow-500' : 'bg-red-500',
    happiness: value > 60 ? 'bg-pink-500' : value > 30 ? 'bg-orange-500' : 'bg-red-500',
    energy: value > 60 ? 'bg-blue-500' : value > 30 ? 'bg-yellow-500' : 'bg-red-500',
    hygiene: value > 60 ? 'bg-green-500' : value > 30 ? 'bg-yellow-500' : 'bg-red-500'
  };
  return colors[statType];
};

export const usePetStore = create<PetStore>()(
  persist(
    (set, get) => ({
      pet: createDefaultPet('MioPet', 'playful'),
      isLoading: false,
      error: null,

      // Actions
      createPet: (name: string, personality: PetPersonality) => {
        const newPet = createDefaultPet(name, personality);
        // Apply personality base stats
        const personalityTraits = PERSONALITY_TRAITS[personality];
        const updatedPet = {
          ...newPet,
          ...personalityTraits.baseStats
        };
        
        set({ 
          pet: updatedPet,
          error: null 
        });
      },

      updatePetStats: (newStats: Partial<PetStats>) => {
        set((state) => {
          const updatedStats = { ...state.pet, ...newStats };
          const newMood = calculateMood(updatedStats);
          
          return {
            pet: {
              ...state.pet,
              ...newStats,
              mood: newMood,
              lastInteraction: Date.now()
            }
          };
        });
      },

      performAction: (action: PetAction) => {
        set((state) => {
          const currentStats = {
            hunger: state.pet.hunger,
            happiness: state.pet.happiness,
            energy: state.pet.energy,
            hygiene: state.pet.hygiene
          };
          
          const statChanges = ACTION_EFFECTS[action](currentStats);
          const newStats = { ...currentStats, ...statChanges };
          const newMood = calculateMood(newStats);
          
          // Create action message
          const actionMessages = {
            feed: `Mmm, delizioso! Grazie per avermi nutrito! 🍖`,
            play: `Che divertimento! Mi piace giocare con te! 🎾`,
            clean: `Ahh, molto meglio! Ora sono tutto pulito! 🛁`,
            sleep: `Zzz... che bel sonnellino ristoratore! 💤`
          };
          
          const actionMessage: ChatMessage = {
            id: `action_${Date.now()}`,
            sender: 'pet',
            content: actionMessages[action],
            timestamp: Date.now(),
            mood: newMood
          };
          
          return {
            pet: {
              ...state.pet,
              ...newStats,
              mood: newMood,
              lastInteraction: Date.now(),
              conversationHistory: [...state.pet.conversationHistory, actionMessage]
            }
          };
        });
      },

      addChatMessage: (message: ChatMessage) => {
        set((state) => ({
          pet: {
            ...state.pet,
            conversationHistory: [...state.pet.conversationHistory, message],
            lastInteraction: Date.now()
          }
        }));
      },

      updatePetMood: (mood: PetMood) => {
        set((state) => ({
          pet: {
            ...state.pet,
            mood,
            lastInteraction: Date.now()
          }
        }));
      },

      // Getters
      getPetEmoji: () => {
        const { pet } = get();
        return PET_EMOJIS[pet.mood] || '😊';
      },

      getStatColor: (statType: keyof PetStats) => {
        const { pet } = get();
        return getStatColor(statType, pet[statType]);
      },

      needsAttention: () => {
        const { pet } = get();
        return pet.hunger < 30 || pet.happiness < 30 || pet.energy < 20 || pet.hygiene < 30;
      }
    }),
    {
      name: 'tamachat-pet-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ pet: state.pet }) // Only persist pet data
    }
  )
);