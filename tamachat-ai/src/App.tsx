import React, { useState } from 'react';
import { usePetStore } from './store/petStore';
import { usePetTimer } from './hooks/usePetTimer';
import { getAIStatusMessage } from './services/aiService';
import { PetDisplay } from './components/PetDisplay';
import { ActivityToast } from './components/ActivityToast';
import { ChatInterface } from './components/Chat/ChatInterface';
import { useActivityToast } from './hooks/useActivityToast';
import { MessageSquare, Heart, Gamepad2, Settings } from 'lucide-react';

function App() {
  const { pet, performAction, setPetCharacter, setPetName } = usePetStore();
  const { needsAttention } = usePetTimer();
  const { activities, isVisible, addActivity, toggleVisibility } = useActivityToast();
  const [activeTab, setActiveTab] = useState<'care' | 'chat'>('care');

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
        <div className="text-center mb-8">
          <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white border-opacity-30">
            <PetDisplay
              character={pet.character}
              mood={pet.mood}
              name={pet.name}
              needsAttention={needsAttention}
              onNameChange={setPetName}
              onCharacterChange={setPetCharacter}
            />
            <div className="text-sm text-gray-700 capitalize mt-4">
              Personalità: {pet.personality} • Umore: {pet.mood}
            </div>
            {needsAttention && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-2 mt-4">
                <div className="text-red-600 text-sm font-medium flex items-center justify-center gap-2">
                  <Heart className="w-4 h-4" />
                  Ha bisogno di cure!
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl shadow-lg mb-6 overflow-hidden border border-white border-opacity-30">
          <div className="flex">
            <button
              onClick={() => setActiveTab('care')}
              className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 font-medium transition-all duration-200 ${
                activeTab === 'care'
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-transparent text-gray-700 hover:bg-white hover:bg-opacity-50'
              }`}
            >
              <Heart className="w-5 h-5" />
              Cura
              {needsAttention && (
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 font-medium transition-all duration-200 ${
                activeTab === 'chat'
                  ? 'bg-purple-500 text-white shadow-lg'
                  : 'bg-transparent text-gray-700 hover:bg-white hover:bg-opacity-50'
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
        <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl shadow-lg border border-white border-opacity-30 overflow-hidden">
          {activeTab === 'care' ? (
            <div className="p-6">
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'Fame', value: pet.hunger, icon: '🍖', key: 'hunger' as const },
                  { label: 'Felicità', value: pet.happiness, icon: '😊', key: 'happiness' as const },
                  { label: 'Energia', value: pet.energy, icon: '⚡', key: 'energy' as const },
                  { label: 'Igiene', value: pet.hygiene, icon: '🛁', key: 'hygiene' as const }
                ].map(({ label, value, icon, key }) => (
                  <div key={key} className="bg-white bg-opacity-80 backdrop-blur-sm rounded-xl p-4 shadow-md border border-white border-opacity-40">
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
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
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
                      className={`py-4 px-6 rounded-xl text-white font-medium text-sm transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg relative ${color} ${
                        isUrgent ? 'ring-2 ring-red-400 ring-opacity-75 animate-pulse' : ''
                      }`}
                    >
                      <span className="text-lg mr-2">{icon}</span>
                      {label}
                      {isUrgent && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Care Tips */}
              <div className="bg-blue-50 bg-opacity-80 backdrop-blur-sm rounded-xl p-4 border border-blue-200 border-opacity-50">
                <h3 className="text-sm font-semibold text-blue-800 mb-2 flex items-center gap-2">
                  <Gamepad2 className="w-4 h-4" />
                  Consigli per la Cura
                </h3>
                <div className="text-xs text-blue-700 space-y-1">
                  {pet.hunger < 50 && <div>• Il tuo pet ha fame! Dagli da mangiare 🍖</div>}
                  {pet.happiness < 50 && <div>• Gioca con il tuo pet per renderlo felice 🎾</div>}
                  {pet.energy < 50 && <div>• Il tuo pet è stanco, fagli fare un riposino 💤</div>}
                  {pet.hygiene < 50 && <div>• È ora di un bel bagno! 🛁</div>}
                  {pet.hunger >= 50 && pet.happiness >= 50 && pet.energy >= 50 && pet.hygiene >= 50 && (
                    <div>• Il tuo pet sta benissimo! Continua così! ✨</div>
                  )}
                </div>
              </div>

              {/* Recent Actions */}
              {pet.conversationHistory.filter(msg => msg.sender === 'pet' && msg.content.includes('Grazie')).length > 0 && (
                <div className="mt-4 bg-green-50 bg-opacity-80 backdrop-blur-sm rounded-xl p-4 border border-green-200 border-opacity-50">
                  <h3 className="text-sm font-semibold text-green-800 mb-2">
                    💚 Ultime Azioni
                  </h3>
                  <div className="text-xs text-green-700">
                    {pet.conversationHistory
                      .filter(msg => msg.sender === 'pet' && msg.content.includes('Grazie'))
                      .slice(-3)
                      .map((msg, index) => (
                        <div key={index} className="mb-1">• {msg.content}</div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="h-96">
              <ChatInterface />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-xl shadow-md p-3 border border-white border-opacity-30">
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