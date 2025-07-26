// Character Types
export type PetCharacter = 'fufi' | 'pupi' | 'titi';

// Core Pet Types
export interface PetState {
  id: string;
  name: string;
  character: PetCharacter;
  hunger: number;        // 0-100
  happiness: number;     // 0-100
  energy: number;        // 0-100
  hygiene: number;       // 0-100
  personality: PetPersonality;
  mood: PetMood;
  lastInteraction: number;
  createdAt: number;
  conversationHistory: ChatMessage[];
}

export type PetPersonality = 'playful' | 'shy' | 'curious' | 'lazy' | 'energetic';

export type PetMood = 'happy' | 'sad' | 'hungry' | 'sleepy' | 'dirty' | 'excited' | 'content';

export interface PetStats {
  hunger: number;
  happiness: number;
  energy: number;
  hygiene: number;
}

// Chat Types
export interface ChatMessage {
  id: string;
  sender: 'user' | 'pet';
  content: string;
  timestamp: number;
  mood?: PetMood;
}

export interface AIResponse {
  content: string;
  mood: PetMood;
  stateChanges?: Partial<PetStats>;
}

// Action Types
export type PetAction = 'feed' | 'play' | 'clean' | 'sleep';

export interface ActionEffect {
  statChanges: Partial<PetStats>;
  message?: string;
  moodChange?: PetMood;
}

// UI Types
export interface StatBarProps {
  label: string;
  value: number;
  maxValue: number;
  color: string;
  icon: string;
}

export interface ActionButtonProps {
  action: PetAction;
  label: string;
  icon: string;
  color: string;
  onClick: () => void;
  disabled?: boolean;
}

// Store Types
export interface PetStore {
  pet: PetState;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  createPet: (name: string, personality: PetPersonality, character: PetCharacter) => void;
  updatePetStats: (stats: Partial<PetStats>) => void;
  performAction: (action: PetAction) => void;
  addChatMessage: (message: ChatMessage) => void;
  updatePetMood: (mood: PetMood) => void;
  setPetCharacter: (character: PetCharacter) => void;
  setPetName: (name: string) => void;
  
  // Getters
  getPetEmoji: () => string;
  getPetImage: () => string;
  getStatColor: (statType: keyof PetStats) => string;
  needsAttention: () => boolean;
}

// Constants
export const PET_EMOJIS: Record<PetMood, string> = {
  happy: '😊',
  sad: '😢',
  hungry: '😋',
  sleepy: '😴',
  dirty: '🤢',
  excited: '🤩',
  content: '😌'
};

export const PET_IMAGES: Record<PetCharacter, string> = {
  fufi: '/fufi.png',
  pupi: '/pupi.png',
  titi: '/titi.png'
};

export const CHARACTER_NAMES: Record<PetCharacter, string> = {
  fufi: 'Fufi',
  pupi: 'Pupi',
  titi: 'Titi'
};

export const PERSONALITY_TRAITS: Record<PetPersonality, {
  description: string;
  baseStats: Partial<PetStats>;
  chatStyle: string;
}> = {
  playful: {
    description: 'Loves games and fun activities',
    baseStats: { happiness: 80, energy: 90 },
    chatStyle: 'enthusiastic and energetic'
  },
  shy: {
    description: 'Gentle and needs encouragement',
    baseStats: { happiness: 60, energy: 70 },
    chatStyle: 'quiet and thoughtful'
  },
  curious: {
    description: 'Always asking questions',
    baseStats: { happiness: 75, energy: 85 },
    chatStyle: 'inquisitive and clever'
  },
  lazy: {
    description: 'Prefers relaxing activities',
    baseStats: { happiness: 70, energy: 50 },
    chatStyle: 'calm and easygoing'
  },
  energetic: {
    description: 'Always ready for action',
    baseStats: { happiness: 85, energy: 95 },
    chatStyle: 'excited and active'
  }
};