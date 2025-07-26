import React from 'react';
import { ChatMessage as ChatMessageType } from '../../types';
import { usePetStore } from '../../store/petStore';
import { formatDistanceToNow } from 'date-fns';
import { it } from 'date-fns/locale';

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const { pet } = usePetStore();
  const isUser = message.sender === 'user';
  const timeAgo = formatDistanceToNow(new Date(message.timestamp), { 
    addSuffix: true, 
    locale: it 
  });

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
        isUser 
          ? 'bg-blue-500 text-white rounded-br-none' 
          : 'bg-gray-100 text-gray-800 rounded-bl-none'
      }`}>
        {/* Avatar per il pet */}
        {!isUser && (
          <div className="flex items-center mb-1">
            <span className="text-lg mr-2">
              {message.mood ? 
                ({'happy': '😊', 'sad': '😢', 'hungry': '😋', 'sleepy': '😴', 'dirty': '🤢', 'excited': '🤩', 'content': '😌'}[message.mood] || '😊') 
                : '😊'
              }
            </span>
            <span className="text-xs font-medium text-gray-600">
              {pet.name}
            </span>
          </div>
        )}
        
        {/* Messaggio */}
        <p className="text-sm leading-relaxed">
          {message.content}
        </p>
        
        {/* Timestamp */}
        <div className={`text-xs mt-1 ${
          isUser ? 'text-blue-100' : 'text-gray-500'
        }`}>
          {timeAgo}
        </div>
      </div>
    </div>
  );
};