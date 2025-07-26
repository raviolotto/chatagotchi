import React, { useState, useRef, useEffect } from 'react';
import { usePetStore } from '../../store/petStore';
import { getGroqAIResponse as getAIResponse, isGroqAIServiceAvailable as isAIServiceAvailable } from '../../services/groqAiService';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { ChatMessage as ChatMessageType } from '../../types';
import { MessageSquare, AlertCircle, Zap } from 'lucide-react';

export const ChatInterface: React.FC = () => {
  const { pet, addChatMessage, updatePetMood, needsAttention } = usePetStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [pet.conversationHistory]);

  // Handle sending a new message
  const handleSendMessage = async (userMessage: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Add user message to conversation
      const userChatMessage: ChatMessageType = {
        id: `user_${Date.now()}`,
        sender: 'user',
        content: userMessage,
        timestamp: Date.now()
      };

      addChatMessage(userChatMessage);

      // Get AI response
      const aiResponse = await getAIResponse(userMessage, pet);

      // Add AI response to conversation
      const aiChatMessage: ChatMessageType = {
        id: `pet_${Date.now()}`,
        sender: 'pet',
        content: aiResponse.content,
        timestamp: Date.now(),
        mood: aiResponse.mood
      };

      addChatMessage(aiChatMessage);

      // Update pet mood if it changed
      if (aiResponse.mood !== pet.mood) {
        updatePetMood(aiResponse.mood);
      }

    } catch (err) {
      console.error('Chat error:', err);
      setError('Ops! Il tuo pet non riesce a rispondere. Riprova tra poco.');
      
      // Add error message
      const errorMessage: ChatMessageType = {
        id: `error_${Date.now()}`,
        sender: 'pet',
        content: 'Scusa, ho avuto un problema... puoi ripetere? 😅',
        timestamp: Date.now(),
        mood: pet.mood
      };
      addChatMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Suggest quick actions if pet needs attention
  const getSuggestedActions = () => {
    const suggestions = [];
    if (pet.hunger < 40) suggestions.push('🍖 Nutrimi!');
    if (pet.happiness < 40) suggestions.push('🎾 Giochiamo!');
    if (pet.hygiene < 40) suggestions.push('🛁 Puliscimi!');
    if (pet.energy < 40) suggestions.push('💤 Ho sonno...');
    return suggestions;
  };

  const suggestedActions = getSuggestedActions();
  const isChatDisabled = needsAttention() && pet.happiness < 20; // Very unhappy pet won't chat

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MessageSquare className="w-5 h-5" />
            <div>
              <h3 className="font-semibold">Chat con {pet.name}</h3>
              <p className="text-xs text-blue-100">
                {isAIServiceAvailable() ? (
                  <><Zap className="w-3 h-3 inline mr-1" />AI Attiva</>
                ) : (
                  'Modalità Demo'
                )}
              </p>
            </div>
          </div>
          
          {/* Pet status indicator */}
          <div className="text-right">
            <div className="text-2xl">{pet.mood === 'happy' ? '😊' : pet.mood === 'sad' ? '😢' : '😐'}</div>
            <div className="text-xs text-blue-100 capitalize">{pet.mood}</div>
          </div>
        </div>
      </div>

      {/* Attention Alert */}
      {needsAttention() && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3">
          <div className="flex items-start">
            <AlertCircle className="w-4 h-4 text-yellow-400 mt-0.5 mr-2" />
            <div className="text-sm">
              <p className="text-yellow-800 font-medium">
                {pet.name} ha bisogno di attenzioni!
              </p>
              {suggestedActions.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {suggestedActions.map((action, index) => (
                    <span key={index} className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                      {action}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Chat Disabled Warning */}
      {isChatDisabled && (
        <div className="bg-red-50 border-l-4 border-red-400 p-3">
          <div className="flex items-start">
            <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 mr-2" />
            <p className="text-sm text-red-800">
              {pet.name} è troppo triste per chattare. Prenditi cura di lui prima! 💔
            </p>
          </div>
        </div>
      )}

      {/* Messages Container */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-2 max-h-96"
      >
        {pet.conversationHistory.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p className="text-sm">Inizia una conversazione con {pet.name}!</p>
            <p className="text-xs text-gray-400 mt-2">
              Puoi chiedergli come sta, cosa pensa, o semplicemente chiacchierare
            </p>
          </div>
        ) : (
          <>
            {pet.conversationHistory.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            
            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg px-4 py-2 max-w-xs">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                    <span className="text-xs text-gray-500">{pet.name} sta scrivendo...</span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border-t border-red-200 p-3">
          <p className="text-sm text-red-600 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            {error}
          </p>
        </div>
      )}

      {/* Chat Input */}
      <ChatInput 
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
        disabled={isChatDisabled}
      />

      {/* Quick Suggestions */}
      {!isChatDisabled && pet.conversationHistory.length <= 1 && (
        <div className="bg-gray-50 p-3 border-t border-gray-200">
          <p className="text-xs text-gray-600 mb-2">💡 Prova a dire:</p>
          <div className="flex flex-wrap gap-2">
            {[
              'Ciao! Come stai?',
              'Che cosa pensi?',
              'Raccontami una storia',
              'Hai fame?'
            ].map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSendMessage(suggestion)}
                disabled={isLoading}
                className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1 
                         hover:bg-blue-50 hover:border-blue-200 transition-colors
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};