import React, { useState, useEffect } from 'react';
import { usePetStore } from './store/petStore';
import { usePetTimer } from './hooks/usePetTimer';
import { getGroqAIStatusMessage as getAIStatusMessage } from './services/groqAiService';
import { PetDisplay } from './components/PetDisplay';
import { ActivityToast } from './components/ActivityToast';
import { ChatInterface } from './components/Chat/ChatInterface';
import { useActivityToast } from './hooks/useActivityToast';
import { MessageSquare, Heart, Gamepad2, Settings } from 'lucide-react';
import { PetCharacter } from './types';

function App() {
  const { pet, performAction, setPetCharacter, setPetName, createPet } = usePetStore();
  const { needsAttention } = usePetTimer();
  const { activities, isVisible, addActivity, toggleVisibility } = useActivityToast();
  const [activeTab, setActiveTab] = useState<'care' | 'chat'>('care');

  // Controlla se c'è un pet selezionato dalla landing page
  useEffect(() => {
    const selectedPet = localStorage.getItem('selectedPet') as PetCharacter;
    if (selectedPet && (!pet || pet.name === 'MioPet')) {
      const characterNames = {
        pupi: 'Pupi',
        fufi: 'Fufi', 
        titi: 'Titi'
      };
      createPet(characterNames[selectedPet], 'playful', selectedPet);
      localStorage.removeItem('selectedPet'); // Pulisci dopo l'uso
    }
  }, [pet, createPet]);

  // Reindirizza alla landing se nessun pet è configurato
  useEffect(() => {
    if (!pet || pet.name === 'MioPet') {
      window.location.href = '/home';
    }
  }, [pet]);

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
    <div className="min-h-screen w-full p-4 bg-gray-50">
      <div className="w-full max-w-7xl mx-auto h-screen flex flex-col">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            TamaChat AI
          </h1>
          <div className="text-sm text-gray-600">
            {getAIStatusMessage()}
          </div>
        </div>

        {/* Main Content - Side by Side */}
        <div className="flex-1 flex gap-6 items-stretch min-h-0">
          {/* Left Side - Pet Display */}
          <div 
            className="flex-1 rounded-3xl p-6 border border-gray-200 flex flex-col justify-center overflow-hidden clouds-background"
            style={{
              backgroundImage: 'url(/fufi-background.jpg)',
              backgroundSize: '150% auto',
              backgroundRepeat: 'repeat-x',
              backgroundPosition: '0% center',
              animation: 'cloudsFlow 60s linear infinite'
            }}
          >
            <div className="pet-content-overlay">
              <PetDisplay
                character={pet.character}
                mood={pet.mood}
                name={pet.name}
                needsAttention={needsAttention}
                onNameChange={setPetName}
                onCharacterChange={setPetCharacter}
              />
              <div className="text-sm text-gray-600 capitalize mt-4 text-center">
                Personalità: {pet.personality} • Umore: {pet.mood}
              </div>
              {needsAttention && (
                <div className="bg-red-50 border border-red-200 rounded-3xl p-3 mt-4">
                  <div className="text-red-600 text-sm font-medium flex items-center justify-center gap-2">
                    <Heart className="w-4 h-4" />
                    Ha bisogno di cure!
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Cura/Chat */}
          <div className="flex-1 bg-white rounded-3xl border border-gray-200 flex flex-col">
            {/* Tab Navigation */}
            <div className="p-2 flex-shrink-0">
              <div className="flex bg-gray-50 rounded-3xl">
                <button
                  onClick={() => setActiveTab('care')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 font-medium rounded-3xl transition-colors ${
                    activeTab === 'care'
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Heart className="w-5 h-5" />
                  Cura
                  {needsAttention && (
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('chat')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 font-medium rounded-3xl transition-colors ${
                    activeTab === 'chat'
                      ? 'bg-purple-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <MessageSquare className="w-5 h-5" />
                  Chat
                  {pet.conversationHistory.length > 1 && (
                    <div className="bg-purple-100 text-purple-600 text-xs rounded-full w-6 h-6 flex items-center justify-center font-semibold">
                      {pet.conversationHistory.length - 1}
                    </div>
                  )}
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="flex-1 p-6 pt-0 min-h-0">
              {activeTab === 'care' ? (
                <div className="h-full flex flex-col justify-center">
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {[
                      { label: 'Fame', value: pet.hunger, icon: '🍖', key: 'hunger' as const },
                      { label: 'Felicità', value: pet.happiness, icon: '😊', key: 'happiness' as const },
                      { label: 'Energia', value: pet.energy, icon: '⚡', key: 'energy' as const },
                      { label: 'Igiene', value: pet.hygiene, icon: '🛁', key: 'hygiene' as const }
                    ].map(({ label, value, icon, key }) => (
                      <div key={key} className="bg-gray-50 rounded-3xl p-4 border border-gray-100">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-lg">{icon}</span>
                          <span className="text-sm font-medium text-gray-700">
                            {label}
                          </span>
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
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { action: 'feed' as const, label: 'Nutri', icon: '🍖', color: 'bg-green-500 hover:bg-green-600' },
                      { action: 'play' as const, label: 'Gioca', icon: '🎾', color: 'bg-blue-500 hover:bg-blue-600' },
                      { action: 'clean' as const, label: 'Pulisci', icon: '🛁', color: 'bg-purple-500 hover:bg-purple-600' },
                      { action: 'sleep' as const, label: 'Riposa', icon: '💤', color: 'bg-indigo-500 hover:bg-indigo-600' }
                    ].map(({ action, label, icon, color }) => {
                      const isUrgent = (
                        (action === 'feed' && pet.hunger < 30) ||
                        (action === 'play' && pet.happiness < 30) ||
                        (action === 'clean' && pet.hygiene < 30) ||
                        (action === 'sleep' && pet.energy < 30)
                      );

                      return (
                        <button
                          key={action}
                          onClick={() => handleAction(action)}
                          className={`py-4 px-6 rounded-3xl text-white font-medium text-sm transition-colors ${color} ${
                            isUrgent ? 'ring-2 ring-red-400' : ''
                          }`}
                        >
                          <span className="text-lg mr-2">{icon}</span>
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col min-h-0">
                  <ChatInterface />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 text-center">
          <div className="bg-white rounded-3xl p-3 border border-gray-200">
            <div className="flex items-center justify-center gap-4 text-xs text-gray-600">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Sistema Attivo
              </div>
              <div className="flex items-center gap-1">
                <Settings className="w-3 h-3" />
                v1.0.0 Hackathon
              </div>
            </div>
          </div>
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