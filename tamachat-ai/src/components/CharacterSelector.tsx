import React from 'react';
import { PetCharacter, CHARACTER_NAMES, PET_IMAGES } from '../types';

interface CharacterSelectorProps {
  selectedCharacter: PetCharacter;
  onCharacterSelect: (character: PetCharacter) => void;
}

export const CharacterSelector: React.FC<CharacterSelectorProps> = ({
  selectedCharacter,
  onCharacterSelect,
}) => {
  const characters: PetCharacter[] = ['fufi', 'pupi'];
  const currentIndex = characters.indexOf(selectedCharacter);
  
  const handlePrevious = () => {
    const prevIndex = currentIndex === 0 ? characters.length - 1 : currentIndex - 1;
    onCharacterSelect(characters[prevIndex]);
  };
  
  const handleNext = () => {
    const nextIndex = currentIndex === characters.length - 1 ? 0 : currentIndex + 1;
    onCharacterSelect(characters[nextIndex]);
  };

  return (
    <div className="flex items-center justify-center gap-4 mb-4">
      <button
        onClick={handlePrevious}
        className="text-2xl text-gray-600 hover:text-gray-800 transition-colors"
      >
        ←
      </button>
      
      <span className="text-sm text-gray-600 min-w-12 text-center">
        {CHARACTER_NAMES[selectedCharacter]}
      </span>
      
      <button
        onClick={handleNext}
        className="text-2xl text-gray-600 hover:text-gray-800 transition-colors"
      >
        →
      </button>
    </div>
  );
};
