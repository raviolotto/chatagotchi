import React from 'react';
import { usePetStore } from './store/petStore';
import { usePetTimer } from './hooks/usePetTimer';
import { getAIStatusMessage } from './services/aiService';

function App() {
  const { pet, performAction, getPetEmoji } = usePetStore();
  const { needsAttention } = usePetTimer();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            TamaChat AI
          </h1>
          <div className="text-sm text-gray-500">
            {getAIStatusMessage()}
          </div>
        </div>

        {/* Pet Display */}
        <div className="text-center mb-8">
          <div className="pet-container">
            <div className={`text-8xl ${needsAttention ? 'animate-pulse' : 'animate-bounce-slow'}`}>
              {getPetEmoji()}
            </div>
          </div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            {pet.name}
          </h2>
          <div className="text-sm text-gray-500 capitalize">
            Personalità: {pet.personality} • Umore: {pet.mood}
          </div>
          {needsAttention && (
            <div className="mt-2 text-red-500 text-sm font-medium animate-pulse">
              ⚠️ Ha bisogno di attenzioni!
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="space-y-3 mb-8">
          {[
            { label: 'Fame', value: pet.hunger, icon: '🍖', key: 'hunger' as const },
            { label: 'Felicità', value: pet.happiness, icon: '😊', key: 'happiness' as const },
            { label: 'Energia', value: pet.energy, icon: '⚡', key: 'energy' as const },
            { label: 'Igiene', value: pet.hygiene, icon: '🛁', key: 'hygiene' as const }
          ].map(({ label, value, icon, key }) => (
            <div key={key} className="flex items-center gap-3">
              <span className="text-lg">{icon}</span>
              <span className="text-sm font-medium text-gray-600 w-16">
                {label}
              </span>
              <div className="flex-1 stat-bar">
                <div 
                  className={`stat-fill ${
                    value > 60 ? 'bg-green-500' : 
                    value > 30 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${value}%` }}
                />
              </div>
              <span className="text-xs text-gray-500 w-10">
                {Math.round(value)}%
              </span>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {[
            { action: 'feed' as const, label: 'Nutri', icon: '🍖', color: 'bg-green-500 hover:bg-green-600' },
            { action: 'play' as const, label: 'Gioca', icon: '🎾', color: 'bg-blue-500 hover:bg-blue-600' },
            { action: 'clean' as const, label: 'Pulisci', icon: '🛁', color: 'bg-purple-500 hover:bg-purple-600' },
            { action: 'sleep' as const, label: 'Nanna', icon: '💤', color: 'bg-indigo-500 hover:bg-indigo-600' }
          ].map(({ action, label, icon, color }) => (
            <button
              key={action}
              onClick={() => performAction(action)}
              className={`action-button text-white ${color}`}
            >
              <span className="text-lg mr-2">{icon}</span>
              {label}
            </button>
          ))}
        </div>

        {/* Recent Messages Preview */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            💬 Ultimi messaggi
          </h3>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {pet.conversationHistory.slice(-3).map((message) => (
              <div key={message.id} className="text-sm">
                <span className="font-medium text-gray-600">
                  {message.sender === 'user' ? 'Tu' : pet.name}:
                </span>
                <span className="ml-2 text-gray-700">
                  {message.content}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Setup Status */}
        <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <h3 className="text-sm font-semibold text-green-800 mb-2">
            ✅ Setup Completato!
          </h3>
          <div className="text-xs text-green-700 space-y-1">
            <div>• Store Zustand: Funzionante</div>
            <div>• Timer automatico: Attivo</div>
            <div>• Persistenza dati: LocalStorage</div>
            <div>• Degradazione stats: Attiva</div>
            <div>• Servizio AI: {getAIStatusMessage()}</div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-sm font-semibold text-blue-800 mb-2">
            🚀 Prossimi Passi
          </h3>
          <div className="text-xs text-blue-700 space-y-1">
            <div>1. Implementare i componenti UI dettagliati</div>
            <div>2. Aggiungere l'interfaccia chat</div>
            <div>3. Migliorare le animazioni</div>
            <div>4. Testing e ottimizzazioni</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;