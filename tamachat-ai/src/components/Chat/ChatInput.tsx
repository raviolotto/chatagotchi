import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ 
  onSendMessage, 
  isLoading, 
  disabled = false 
}) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input quando non è in loading
  useEffect(() => {
    if (!isLoading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedMessage = message.trim();
    if (!trimmedMessage || isLoading || disabled) return;
    
    onSendMessage(trimmedMessage);
    setMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const isButtonDisabled = !message.trim() || isLoading || disabled;

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 p-3 bg-white border-t border-gray-200">
      <div className="flex-1 relative">
        <input
          ref={inputRef}
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={
            disabled 
              ? "Il tuo pet ha bisogno di cure prima di chattare..." 
              : isLoading 
                ? "Il tuo pet sta pensando..." 
                : `Scrivi a ${disabled ? 'il tuo pet' : ''}...`
          }
          disabled={isLoading || disabled}
          className={`w-full px-4 py-2 border border-gray-300 rounded-full 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     ${disabled ? 'bg-gray-100 text-gray-500' : 'bg-white'}
                     ${isLoading ? 'cursor-wait' : ''}`}
          maxLength={200}
        />
        
        {/* Character counter */}
        {message.length > 150 && (
          <div className="absolute -top-6 right-2 text-xs text-gray-500">
            {message.length}/200
          </div>
        )}
      </div>
      
      <button
        type="submit"
        disabled={isButtonDisabled}
        className={`p-2 rounded-full transition-all duration-200 ${
          isButtonDisabled
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-blue-500 text-white hover:bg-blue-600 hover:scale-105 active:scale-95'
        }`}
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Send className="w-5 h-5" />
        )}
      </button>
    </form>
  );
};