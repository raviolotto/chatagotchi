import React from 'react';
import { usePetStore } from './store/petStore';
import { usePetTimer } from './hooks/usePetTimer';
import { getAIStatusMessage } from './services/aiService';
import { PetDisplay } from './components/PetDisplay';
import { ActivityToast } from './components/ActivityToast';
import { useActivityToast } from './hooks/useActivityToast';

function App() {
  const { pet, performAction, setPetCharacter, setPetName } = usePetStore();
  const { needsAttention } = usePetTimer();
  const { activities, isVisible, addActivity, toggleVisibility } = useActivityToast();

  // Handle action with activity notification
  const handleAction = (action: 'feed' | 'play' | 'clean' | 'sleep') => {
    performAction(action);
    
    const actionMessages = {
      feed: `${pet.name} ha mangiato!`,
      play: `${pet.name} si è divertito!`,
      clean: `${pet.name} è stato pulito!`,
      sleep: `${pet.name} ha fatto un sonnellino!`
    };
    
    addActivity(actionMessages[action]);
  };

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center p-4"
      style={{
        backgroundImage: 'url(/background.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black bg-opacity-10"></div>
      
      <div className="w-full max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
            TamaChat AI
          </h1>
          <div className="text-sm text-white text-opacity-90 drop-shadow">
            {getAIStatusMessage()}
          </div>
        </div>

        {/* Pet Display */}
        <div className="text-center mb-12">
          <PetDisplay
            character={pet.character}
            mood={pet.mood}
            name={pet.name}
            needsAttention={needsAttention}
            onNameChange={setPetName}
            onCharacterChange={setPetCharacter}
          />
          <div className="text-sm text-white text-opacity-90 capitalize mt-4 drop-shadow">
            Personalità: {pet.personality} • Umore: {pet.mood}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 max-w-2xl mx-auto">
          {[
            { label: 'Fame', value: pet.hunger, key: 'hunger' as const },
            { label: 'Felicità', value: pet.happiness, key: 'happiness' as const },
            { label: 'Energia', value: pet.energy, key: 'energy' as const },
            { label: 'Igiene', value: pet.hygiene, key: 'hygiene' as const }
          ].map(({ label, value, key }) => (
            <div key={key} className="bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white border-opacity-30">
              <div className="text-sm font-medium text-gray-700 mb-2 text-center">
                {label}
              </div>
              <div className="stat-bar mb-2">
                <div 
                  className={`stat-fill ${
                    value > 60 ? 'bg-green-500' : 
                    value > 30 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${value}%` }}
                />
              </div>
              <div className="text-xs text-gray-600 text-center">
                {Math.round(value)}%
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-2xl mx-auto">
          {[
            { action: 'feed' as const, label: 'Nutri', color: 'bg-green-500 hover:bg-green-600' },
            { action: 'play' as const, label: 'Gioca', color: 'bg-blue-500 hover:bg-blue-600' },
            { action: 'clean' as const, label: 'Pulisci', color: 'bg-purple-500 hover:bg-purple-600' },
            { action: 'sleep' as const, label: 'Nanna', color: 'bg-indigo-500 hover:bg-indigo-600' }
          ].map(({ action, label, color }) => (
            <button
              key={action}
              onClick={() => handleAction(action)}
              className={`py-4 px-6 rounded-full text-white font-medium text-sm transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg ${color}`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Activity Toast */}
        <ActivityToast
          activities={activities}
          isVisible={isVisible}
          onToggle={toggleVisibility}
        />
      </div>
    </div>
  );
}

export default App;