import React from 'react';
import { PetCharacter, PetMood, PET_IMAGES, CHARACTER_NAMES } from '../types';
import { NameEditor } from './NameEditor';

interface PetDisplayProps {
  character: PetCharacter;
  mood: PetMood;
  name: string;
  needsAttention: boolean;
  onNameChange: (name: string) => void;
  onCharacterChange: (character: PetCharacter) => void;
}

export const PetDisplay: React.FC<PetDisplayProps> = ({
  character,
  mood,
  name,
  needsAttention,
  onNameChange,
  onCharacterChange,
}) => {
  const characters: PetCharacter[] = ['fufi', 'pupi', 'titi'];
  const currentIndex = characters.indexOf(character);
  
  const handlePrevious = () => {
    const prevIndex = currentIndex === 0 ? characters.length - 1 : currentIndex - 1;
    onCharacterChange(characters[prevIndex]);
  };
  
  const handleNext = () => {
    const nextIndex = currentIndex === characters.length - 1 ? 0 : currentIndex + 1;
    onCharacterChange(characters[nextIndex]);
  };

  const getMoodAnimation = (mood: PetMood): string => {
    switch (mood) {
      case 'excited':
        return 'animate-gentle-bounce';
      case 'sleepy':
        return 'animate-gentle-pulse';
      case 'happy':
        return 'animate-gentle-float';
      default:
        return needsAttention ? 'animate-gentle-pulse' : '';
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center gap-4 md:gap-8 mb-6">
        {/* Left Arrow */}
        <button 
          onClick={handlePrevious}
          className="text-2xl md:text-3xl text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
        >
          ←
        </button>
        
        {/* Pet Image */}
        <div className={`${getMoodAnimation(mood)}`}>
          <img
            src={PET_IMAGES[character]}
            alt={CHARACTER_NAMES[character]}
            className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 object-contain"
          />
        </div>
        
        {/* Right Arrow */}
        <button 
          onClick={handleNext}
          className="text-2xl md:text-3xl text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
        >
          →
        </button>
      </div>
      
      <div className="mb-4">
        <NameEditor 
          currentName={name} 
          onNameChange={onNameChange}
        />
      </div>
      
      {needsAttention && (
        <div className="text-red-500 text-sm font-medium animate-pulse">
          Ha bisogno di attenzioni!
        </div>
      )}
    </div>
  );
};
