# 🐾 TamaChat AI - Guida Completa dei File

**Progetto:** Tamagotchi AI Companion per Hackathon  
**Data Aggiornamento:** 26 Luglio 2025  
**Versione:** 1.0.0 Hackathon Edition  

## 📋 Panoramica del Progetto

TamaChat AI è un'applicazione web interattiva che simula un compagno digitale (Tamagotchi) potenziato dall'intelligenza artificiale. L'app combina la nostalgia dei classici pet virtuali con le moderne capacità conversazionali dell'AI.

### 🎯 Funzionalità Principali (AGGIORNATE)
- ✅ **Sistema di Tab Navigation** - Interfaccia divisa tra "Cura" e "Chat"
- ✅ **Gestione stati del pet** con degradazione automatica nel tempo
- ✅ **Chat AI integrata** per conversazioni intelligenti
- ✅ **Sistema di persistenza** con localStorage
- ✅ **Interfaccia responsive** con design glassmorphism
- ✅ **Notifiche attività** con toast animati
- ✅ **Personalizzazione pet** (carattere, nome, personalità)

---

## 📁 Struttura delle Cartelle

```
src/
├── components/          # Componenti React riutilizzabili
│   ├── Chat/           # Componenti specifici per la chat
│   ├── Layout/         # Componenti di layout (placeholder)
│   └── Pet/            # Componenti specifici del pet (placeholder)
├── hooks/              # Custom React hooks
├── services/           # Servizi esterni (AI, API)
├── store/              # Gestione stato globale (Zustand)
├── types/              # Definizioni TypeScript
└── utils/              # Utilities (vuoto, preparato per il futuro)
```

---

## 📄 Analisi Dettagliata dei File

### � **App.tsx** - Componente Principale (AGGIORNATO)
**Ruolo:** Entry point dell'applicazione con tab navigation

**Funzionalità Chiave:**
- **Tab System:** Navigazione tra "Cura" e "Chat" con stato persistente
- **Background Design:** Immagine di sfondo con overlay glassmorphism
- **Pet Display:** Visualizzazione centralizzata del pet con controlli
- **Stats Dashboard:** Monitoraggio stato del pet con indicatori visivi
- **Action Buttons:** Pulsanti per nutrire, giocare, pulire, far dormire
- **Care Tips:** Suggerimenti contestuali basati sullo stato del pet
- **Chat Integration:** Interfaccia chat completamente integrata
- **Activity Notifications:** Sistema di notifiche per le azioni

**Dipendenze:**
- `usePetStore` - Gestione stato globale
- `usePetTimer` - Timer automatico degradazione
- `useActivityToast` - Notifiche attività
- `PetDisplay` - Componente visualizzazione pet
- `ChatInterface` - Interfaccia chat
- `lucide-react` - Icone moderne

**Tecnologie Usate:**
- React Hooks (useState)
- Tailwind CSS con classi glassmorphism
- Lucide React per le icone
- Layout responsive grid

---

### 🗃️ **store/petStore.ts** - State Management (AGGIORNATO)
**Ruolo:** Gestione centralizzata dello stato del pet con Zustand

**Funzionalità Principali:**
- **Creazione Pet:** Factory function per nuovi pet con personalità
- **Gestione Stati:** Tracciamento di fame, felicità, energia, igiene (0-100)
- **Sistema Azioni:** Effetti delle azioni sui parametri del pet
- **Mood Calculation:** Calcolo automatico dell'umore basato sui parametri
- **Chat History:** Gestione cronologia conversazioni con limite di 50 messaggi
- **Persistenza:** Salvataggio automatico in localStorage
- **Character System:** Supporto per diversi tipi di pet

**Nuove Funzionalità Integrate:**
- ✅ **clearConversationHistory()** - Reset cronologia chat
- ✅ **Emoji nei messaggi** - Messaggi azione con emoji (🍖🎾🛁💤)
- ✅ **Limite cronologia** - Performance ottimizzata con max 50 messaggi
- ✅ **Messaggi migliorati** - Feedback più coinvolgente per le azioni

**Pattern Architetturali:**
- Factory Pattern per creazione pet
- State Management con Zustand
- Immutable updates con spread operator
- Middleware di persistenza con JSON storage
