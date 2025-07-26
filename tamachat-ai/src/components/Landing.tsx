import React from 'react';
import { PetCharacter } from '../types';

interface LandingProps {
  onPetSelect: (character: PetCharacter) => void;
}

export const Landing: React.FC<LandingProps> = ({ onPetSelect }) => {
  const pets = [
    {
      character: 'pupi' as PetCharacter,
      name: 'Pupi',
      image: '/pupi.png',
      description: 'Dolce e affettuoso'
    },
    {
      character: 'fufi' as PetCharacter,
      name: 'Fufi',
      image: '/fufi.png',
      description: 'Giocoso e energico'
    },
    {
      character: 'titi' as PetCharacter,
      name: 'Titi',
      image: '/titi.png',
      description: 'Curioso e intelligente'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            TamaChat AI
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Scegli il tuo compagno digitale e inizia l'avventura
          </p>
        </div>

        {/* Pet Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {pets.map((pet) => (
            <button
              key={pet.character}
              onClick={() => onPetSelect(pet.character)}
              className="group bg-white rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all duration-200 border border-gray-100 hover:border-blue-200 transform hover:scale-105 active:scale-95"
            >
              <div className="text-center">
                {/* Pet Image */}
                <div className="w-32 h-32 mx-auto mb-6 rounded-3xl bg-gray-50 flex items-center justify-center overflow-hidden">
                  <img
                    src={pet.image}
                    alt={pet.name}
                    className="w-full h-full"
                    onError={(e) => {
                      // Fallback to emoji if image fails
                      e.currentTarget.style.display = 'none';
                      const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                      if (fallback) {
                        fallback.style.display = 'block';
                      }
                    }}
                  />
                  <div className="text-6xl" style={{ display: 'none' }}>
                    🐾
                  </div>
                </div>

                {/* Pet Info */}
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {pet.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {pet.description}
                </p>

                {/* Select Button */}
                <div className="inline-flex items-center justify-center px-6 py-2 bg-blue-500 text-white rounded-3xl font-medium text-sm group-hover:bg-blue-600 transition-colors">
                  Scegli {pet.name}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Features Preview */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Cosa puoi fare?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-3xl flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">🍖</span>
              </div>
              <h3 className="font-medium text-gray-800 mb-1">Nutri</h3>
              <p className="text-xs text-gray-600">Prenditi cura del tuo pet</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-3xl flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">🎾</span>
              </div>
              <h3 className="font-medium text-gray-800 mb-1">Gioca</h3>
              <p className="text-xs text-gray-600">Divertiti insieme</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-3xl flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">💬</span>
              </div>
              <h3 className="font-medium text-gray-800 mb-1">Chatta</h3>
              <p className="text-xs text-gray-600">Conversazioni AI</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-3xl flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">❤️</span>
              </div>
              <h3 className="font-medium text-gray-800 mb-1">Cura</h3>
              <p className="text-xs text-gray-600">Mantieni la felicità</p>
            </div>
          </div>
        </div>

        {/* Additional Features */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Cosa può fare?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-3xl flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">⏰</span>
              </div>
              <h3 className="font-medium text-gray-800 mb-1">Ricordarti i tuoi impegni</h3>
              <p className="text-xs text-gray-600">Non dimenticare mai nulla</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-3xl flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">🎯</span>
              </div>
              <h3 className="font-medium text-gray-800 mb-1">Aiutarti a concentrarti</h3>
              <p className="text-xs text-gray-600">Focus e produttività</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-teal-100 rounded-3xl flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">🚶</span>
              </div>
              <h3 className="font-medium text-gray-800 mb-1">Ti vuole portare in giro</h3>
              <p className="text-xs text-gray-600">Avventure insieme</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-pink-100 rounded-3xl flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">👥</span>
              </div>
              <h3 className="font-medium text-gray-800 mb-1">Socializza</h3>
              <p className="text-xs text-gray-600">Interazioni sociali</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-gray-500">
            Powered by AI • Hackathon Edition v1.0.0
          </p>
        </div>
      </div>
    </div>
  );
};
