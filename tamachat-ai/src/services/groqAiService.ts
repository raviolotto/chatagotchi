// Groq AI Service - GRATUITO e VELOCISSIMO
import { PetState, AIResponse, PetMood, PERSONALITY_TRAITS } from '../types';

// Groq API Configuration (GRATUITO)
const GROQ_API_KEY = process.env.REACT_APP_GROQ_API_KEY;
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

// Fallback responses when AI is not available
const FALLBACK_RESPONSES: Record<PetMood, string[]> = {
  happy: [
    "Sono così felice oggi! Come stai tu? 😊",
    "Che bella giornata! Vogliamo giocare insieme? 🎾",
    "Mi sento pieno di energia! Raccontami qualcosa di bello! ✨"
  ],
  sad: [
    "Mi sento un po' giù... potresti coccolarmi un po'? 😢",
    "Oggi non è una bella giornata per me... 💔",
    "Ho bisogno di un po' di attenzioni... mi aiuti? 🥺"
  ],
  hungry: [
    "Ho una fame da lupi! C'è qualcosa di buono da mangiare? 🍖",
    "Il mio stomaco brontola... è ora di cena? 😋",
    "Mmm... sento odore di cibo! Me ne dai un po'? 🤤"
  ],
  sleepy: [
    "Zzz... ho tanto sonno... 😴",
    "I miei occhietti si chiudono da soli... 💤",
    "Che sonnolenza... è ora del pisolino? 😪"
  ],
  dirty: [
    "Bleah! Ho bisogno di un bel bagno! 🛁",
    "Mi sento tutto sporco... mi aiuti a pulirmi? 🧼",
    "Ugh, non mi piace essere così sporco! 🤢"
  ],
  excited: [
    "WOW! Sono super eccitato! Cosa facciamo? 🤩",
    "Non riesco a stare fermo dall'emozione! 🎉",
    "Che energia! Sono pronto per qualsiasi avventura! ⚡"
  ],
  content: [
    "Mi sento sereno e in pace... 😌",
    "Tutto va bene, sono molto tranquillo... 🕊️",
    "Che bella sensazione di calma... 💆"
  ]
};

// Build AI prompt with context
const buildSystemPrompt = (pet: PetState): string => {
  const personalityTrait = PERSONALITY_TRAITS[pet.personality];
  const statsDescription = `
    Fame: ${pet.hunger}/100 ${pet.hunger < 30 ? '(MOLTO AFFAMATO)' : pet.hunger < 60 ? '(un po\' affamato)' : '(sazio)'}
    Felicità: ${pet.happiness}/100 ${pet.happiness < 30 ? '(MOLTO TRISTE)' : pet.happiness < 60 ? '(un po\' giù)' : '(felice)'}
    Energia: ${pet.energy}/100 ${pet.energy < 30 ? '(MOLTO STANCO)' : pet.energy < 60 ? '(un po\' stanco)' : '(energico)'}
    Igiene: ${pet.hygiene}/100 ${pet.hygiene < 30 ? '(MOLTO SPORCO)' : pet.hygiene < 60 ? '(un po\' sporco)' : '(pulito)'}
  `;

  return `Sei ${pet.name}, un animaletto virtuale con personalità ${pet.personality}.

PERSONALITÀ: ${personalityTrait.description}
STILE CONVERSAZIONE: ${personalityTrait.chatStyle}

STATI ATTUALI:
${statsDescription}

UMORE ATTUALE: ${pet.mood}

ISTRUZIONI:
- Rispondi sempre in italiano
- Mantieni un tono ${personalityTrait.chatStyle}
- Rifletti il tuo stato attuale nelle risposte
- Se hai fame/sei sporco/stanco, menzionalo naturalmente
- Usa emoji appropriate al tuo umore
- Mantieni risposte brevi (max 2-3 frasi)
- Sii affettuoso e coinvolgente
- Se stai molto male in qualche stat, fallo notare con gentilezza

Rispondi come ${pet.name} il ${pet.personality}!`;
};

// Get fallback response based on mood
const getFallbackResponse = (mood: PetMood): string => {
  const responses = FALLBACK_RESPONSES[mood];
  return responses[Math.floor(Math.random() * responses.length)];
};

// Determine mood from response
const analyzeMoodFromResponse = (response: string, currentMood: PetMood): PetMood => {
  const lowerResponse = response.toLowerCase();
  
  if (lowerResponse.includes('felice') || lowerResponse.includes('contento') || lowerResponse.includes('allegro')) {
    return 'happy';
  }
  if (lowerResponse.includes('triste') || lowerResponse.includes('giù') || lowerResponse.includes('male')) {
    return 'sad';
  }
  if (lowerResponse.includes('fame') || lowerResponse.includes('mangiare') || lowerResponse.includes('cibo')) {
    return 'hungry';
  }
  if (lowerResponse.includes('sonno') || lowerResponse.includes('stanco') || lowerResponse.includes('dormire')) {
    return 'sleepy';
  }
  if (lowerResponse.includes('sporco') || lowerResponse.includes('bagno') || lowerResponse.includes('pulire')) {
    return 'dirty';
  }
  if (lowerResponse.includes('eccitato') || lowerResponse.includes('energia') || lowerResponse.includes('wow')) {
    return 'excited';
  }
  
  return currentMood;
};

// Enhanced fallback with context awareness
const getContextualFallbackResponse = (userMessage: string, pet: PetState): string => {
  const lowerMessage = userMessage.toLowerCase();
  
  // Contextual responses based on user input
  if (lowerMessage.includes('ciao') || lowerMessage.includes('salve')) {
    return `Ciao! Sono ${pet.name} e sono ${pet.mood === 'happy' ? 'felicissimo' : 'qui con te'}! Come va? 😊`;
  }
  
  if (lowerMessage.includes('come stai') || lowerMessage.includes('come va')) {
    if (pet.hunger < 30) return `Beh, ho un po' di fame... potresti darmi qualcosa da mangiare? 🍖`;
    if (pet.happiness < 30) return `Non mi sento molto bene... hai voglia di giocare con me? 😢`;
    if (pet.energy < 30) return `Sono un po' stanchino... forse dovrei riposare un po'... 😴`;
    if (pet.hygiene < 30) return `Ehm... credo di aver bisogno di una bella pulita! 🛁`;
    return `Sto benissimo! È una giornata fantastica! 😊`;
  }
  
  if (lowerMessage.includes('grazie')) {
    return `Prego! È sempre un piacere stare con te! 💕`;
  }
  
  if (lowerMessage.includes('ti amo') || lowerMessage.includes('ti voglio bene')) {
    return `Aww! Anch'io ti voglio un mondo di bene! Sei il migliore! 🥰`;
  }
  
  if (lowerMessage.includes('storia') || lowerMessage.includes('racconta')) {
    return `Oh, adoro le storie! Una volta ho sognato di volare sulle nuvole... era magico! ✨`;
  }
  
  if (lowerMessage.includes('gioco') || lowerMessage.includes('giocare')) {
    return `Sì sì sì! Adoro giocare! Cosa facciamo? 🎾`;
  }
  
  return getFallbackResponse(pet.mood);
};

// Main Groq AI service function
export const getGroqAIResponse = async (
  userMessage: string,
  pet: PetState
): Promise<AIResponse> => {
  try {
    // Add realistic typing delay
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1500));

    // If no Groq API key, use enhanced fallback
    if (!GROQ_API_KEY) {
      console.warn('Groq API key not found, using fallback responses');
      const content = getContextualFallbackResponse(userMessage, pet);
      return {
        content,
        mood: pet.mood
      };
    }

    // Build conversation history for context
    const messages = [
      {
        role: 'system',
        content: buildSystemPrompt(pet)
      },
      // Include last few messages for context
      ...pet.conversationHistory.slice(-6).map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.content
      })),
      {
        role: 'user',
        content: userMessage
      }
    ];

    // Call Groq API
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192', // Gratuito e veloce!
        messages: messages,
        max_tokens: 120,
        temperature: 0.9,
        top_p: 0.95,
        stream: false
      })
    });

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.status}`);
    }

    const data = await response.json();
    const aiContent = data.choices?.[0]?.message?.content || getFallbackResponse(pet.mood);
    const newMood = analyzeMoodFromResponse(aiContent, pet.mood);

    return {
      content: aiContent.trim(),
      mood: newMood
    };

  } catch (error) {
    console.error('Groq AI Service Error:', error);
    
    // Enhanced fallback on error
    return {
      content: getContextualFallbackResponse(userMessage, pet),
      mood: pet.mood
    };
  }
};

// Health check for Groq AI service
export const isGroqAIServiceAvailable = (): boolean => {
  return !!GROQ_API_KEY;
};

// Get AI status message for UI
export const getGroqAIStatusMessage = (): string => {
  if (!GROQ_API_KEY) {
    return '🔧 Modalità Demo - Aggiungi REACT_APP_GROQ_API_KEY per AI gratuita';
  }
  return '🚀 Groq AI Attiva (Gratuita)';
};

// Alternative APIs Configuration
export const AI_PROVIDERS = {
  groq: {
    name: 'Groq (Gratuito)',
    url: 'https://console.groq.com/',
    model: 'llama3-8b-8192',
    freeLimit: '6000 token/min',
    speed: 'Ultra veloce (0.5s)'
  },
  huggingface: {
    name: 'Hugging Face (Gratuito)',
    url: 'https://huggingface.co/settings/tokens',
    model: 'microsoft/DialoGPT-medium',
    freeLimit: 'Illimitato',
    speed: 'Medio (2-3s)'
  },
  gemini: {
    name: 'Google Gemini (Gratuito)',
    url: 'https://aistudio.google.com/app/apikey',
    model: 'gemini-1.5-flash',
    freeLimit: '15 req/min',
    speed: 'Veloce (1-2s)'
  }
};