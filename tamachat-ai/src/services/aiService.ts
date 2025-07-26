import OpenAI from 'openai';
import { PetState, AIResponse, PetMood, PERSONALITY_TRAITS } from '../types';

// Initialize OpenAI (only if API key is available)
const openai = process.env.REACT_APP_OPENAI_API_KEY 
  ? new OpenAI({
      apiKey: process.env.REACT_APP_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true // Solo per prototipo hackathon
    })
  : null;

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

// Determine mood from response (simple keyword analysis)
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
  
  return currentMood; // Keep current mood if no clear indicator
};

// Main AI service function
export const getAIResponse = async (
  userMessage: string,
  pet: PetState
): Promise<AIResponse> => {
  try {
    // If no OpenAI API key, use fallback
    if (!openai) {
      console.warn('OpenAI API key not found, using fallback responses');
      const content = getFallbackResponse(pet.mood);
      return {
        content,
        mood: pet.mood
      };
    }

    // Build conversation history for context
    const messages = [
      {
        role: 'system' as const,
        content: buildSystemPrompt(pet)
      },
      // Include last few messages for context
      ...pet.conversationHistory.slice(-6).map(msg => ({
        role: msg.sender === 'user' ? 'user' as const : 'assistant' as const,
        content: msg.content
      })),
      {
        role: 'user' as const,
        content: userMessage
      }
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
      max_tokens: 150,
      temperature: 0.8,
      presence_penalty: 0.3,
      frequency_penalty: 0.3
    });

    const aiContent = completion.choices[0]?.message?.content || getFallbackResponse(pet.mood);
    const newMood = analyzeMoodFromResponse(aiContent, pet.mood);

    return {
      content: aiContent,
      mood: newMood
    };

  } catch (error) {
    console.error('AI Service Error:', error);
    
    // Fallback on error
    return {
      content: getFallbackResponse(pet.mood),
      mood: pet.mood
    };
  }
};

// Health check for AI service
export const isAIServiceAvailable = (): boolean => {
  return !!openai && !!process.env.REACT_APP_OPENAI_API_KEY;
};

// Get AI status message for UI
export const getAIStatusMessage = (): string => {
  if (!process.env.REACT_APP_OPENAI_API_KEY) {
    return 'Modalità Demo - Configura REACT_APP_OPENAI_API_KEY per l\'AI completa';
  }
  return 'AI Attiva';
};