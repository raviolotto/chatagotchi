import React, { useState, useRef, useEffect } from 'react';
import { usePetStore } from '../../store/petStore';
import { getGroqAIResponse as getAIResponse, isGroqAIServiceAvailable as isAIServiceAvailable } from '../../services/groqAiService';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { ChatMessage as ChatMessageType } from '../../types';
import { MessageSquare } from 'lucide-react';

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
    <div className="flex flex-col h-full overflow-hidden">
      {/* Messages Container */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto space-y-3 mb-4"
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
                <div className="bg-gray-100 rounded-3xl px-4 py-2 max-w-xs">
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

      {/* Chat Input */}
      <ChatInput 
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
        disabled={isChatDisabled}
      />
    </div>
  );
};