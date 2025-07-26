# Product Requirements Document: Tamagotchi AI Companion

**Data:** 26 Luglio 2025  
**Autore:** VelocityPRD  
**Stato:** Bozza Iniziale per Hackathon  

## 1. Visione del Prodotto e Obiettivi

### Visione
Creare un compagno digitale interattivo e coinvolgente, accessibile via web, che offra un'esperienza di cura e conversazione unica, sfruttando l'intelligenza artificiale per simulare una personalità dinamica. L'obiettivo è fornire un prototipo funzionante e dimostrativo entro un hackathon di un giorno.

### Obiettivi per l'Hackathon (MVP)

- **Validare l'interazione AI:** Dimostrare la capacità dell'animaletto di comprendere e rispondere in modo coerente e personalizzato tramite chat.

- **Funzionalità di cura essenziali:** Implementare le azioni fondamentali (nutrire, giocare, pulire) che influenzano lo stato dell'animaletto.

- **Feedback visivo immediato:** Assicurare che lo stato dell'animaletto sia chiaramente visibile e che le interazioni generino risposte visive.

- **Stabilità tecnica:** Realizzare una base solida e priva di bug critici per una demo efficace.

## 2. Utenti e Bisogni

### Target Utente

- **Partecipanti all'Hackathon:** Giudici e altri sviluppatori interessati a soluzioni innovative e prototipi rapidi.

- **Utenti Casuali/Curiosi:** Individui alla ricerca di un'interazione divertente e nuova con l'AI, nostalgici dei Tamagotchi o semplicemente curiosi di provare un "animaletto parlante".

### Bisogni dell'Utente

- **Divertimento e Novità:** Vogliono un'esperienza leggera e innovativa che combini la nostalgia del Tamagotchi con la modernità dell'AI.

- **Companionship e Affetto:** Desiderano sentirsi connessi a un'entità digitale che risponde e "si preoccupa" di loro.

- **Interazione Semplice e Immediata:** Necessitano di un'interfaccia intuitiva che permetta di interagire con l'animaletto senza sforzo.

- **Feedback Chiaro:** Vogliono capire facilmente lo stato del loro animaletto e vedere l'impatto delle loro azioni.

## 3. Funzionalità Chiave (Prioritizzate per Hackathon)

Le funzionalità sono suddivise per fasi, riflettendo la strategia di sviluppo per un hackathon di un giorno.

### Fase 1: Minimum Viable Product (MVP) - Ore 1-4
**Obiettivo:** Stabilire il nucleo funzionale del Tamagotchi.

#### Gestione dello Stato dell'Animaletto
- **Descrizione:** Un sistema interno (oggetto JavaScript) che traccia parametri vitali come Fame, Felicità, Energia, Igiene (valori 0-100).
- **Comportamento:** Questi parametri diminuiscono gradualmente nel tempo.
- **Valore Utente:** Fornisce la base per il "gioco" di cura e la necessità di interazione.

#### Interfaccia Utente Base (Layout Responsive)
- **Descrizione:** Un'area centrale per la visualizzazione dell'animaletto, una barra di stato, pulsanti di azione e un'area chat.
- **Comportamento:** Il layout si adatta a diverse dimensioni dello schermo (mobile-first).
- **Valore Utente:** Garantisce accessibilità e usabilità su vari dispositivi.

#### Azioni di Cura Base
- **Descrizione:** Pulsanti per "Nutri", "Gioca", "Pulisci".
- **Comportamento:** Cliccando un pulsante, il parametro corrispondente aumenta (es. "Nutri" aumenta la Fame).
- **Valore Utente:** Permette all'utente di influenzare direttamente il benessere dell'animaletto.

#### Feedback Visivo Semplice
- **Descrizione:** L'aspetto dell'animaletto (es. colore, emoji) cambia in base al suo stato dominante (es. rosso/triste se la fame è bassa, verde/felice se la felicità è alta).
- **Comportamento:** Aggiornamento immediato del display dopo ogni interazione o cambiamento di stato.
- **Valore Utente:** Fornisce un'indicazione visiva rapida dello stato dell'animaletto, aumentando l'immersione.

### Fase 2: Integrazione AI - Ore 5-7
**Obiettivo:** Abilitare l'interazione conversazionale con l'animaletto.

#### Interfaccia Chat
- **Descrizione:** Un campo di input per l'utente e un'area di visualizzazione per la cronologia dei messaggi.
- **Comportamento:** I messaggi dell'utente vengono inviati, le risposte dell'AI vengono visualizzate.
- **Valore Utente:** Il canale primario per l'interazione "personale" con l'animaletto.

#### Integrazione API AI
- **Descrizione:** Chiamate fetch a un servizio AI esterno (es. OpenAI GPT, Claude) per generare risposte.
- **Comportamento:** Il prompt inviato all'AI include il messaggio dell'utente e lo stato attuale dell'animaletto.
- **Valore Utente:** Permette all'animaletto di "capire" e "rispondere" in modo intelligente.

#### Prompt Engineering per Personalità
- **Descrizione:** Il prompt iniziale dell'AI deve istruire il modello a rispondere come un animaletto affettuoso, giocoso e che riflette i suoi stati (es. menziona la fame se bassa).
- **Comportamento:** L'AI mantiene un tono coerente e personalizzato.
- **Valore Utente:** Rende l'interazione più credibile e coinvolgente.

### Fase 3: Polish e Ottimizzazione - Ore 7-8
**Obiettivo:** Migliorare l'esperienza utente e la robustezza del prototipo.

#### Miglioramenti UI/UX
- **Descrizione:** Piccole transizioni CSS, feedback visivi più raffinati (es. animazione quando si nutre), icone più chiare.
- **Comportamento:** L'interfaccia appare più "viva" e reattiva.
- **Valore Utente:** Aumenta la percezione di qualità e la soddisfazione nell'uso.

#### Persistenza dello Stato (LocalStorage)
- **Descrizione:** Salvataggio dello stato dell'animaletto nel localStorage del browser.
- **Comportamento:** Lo stato viene caricato al riavvio dell'applicazione.
- **Valore Utente:** L'utente non perde i progressi dell'animaletto tra una sessione e l'altra (entro i limiti del browser).

#### Bug Fixing e Ottimizzazioni Minori
- **Descrizione:** Risoluzione dei bug più evidenti e ottimizzazione del codice per migliorare le prestazioni.
- **Comportamento:** L'applicazione è più stabile e fluida.
- **Valore Utente:** Un'esperienza più affidabile e meno frustrante.

## 4. Esperienza Utente (UX) e Interfaccia Utente (UI)

### Principi Guida

- **Immediatezza:** L'utente deve comprendere e interagire con l'app in pochi secondi.
- **Chiarezza:** Gli stati dell'animaletto e le azioni disponibili devono essere immediatamente comprensibili.
- **Feedback Visivo:** Ogni interazione deve avere una risposta visiva chiara e gratificante.
- **Semplicità:** Mantenere l'interfaccia pulita e minimale per evitare sovraccarico cognitivo, cruciale per un hackathon.
- **Reattività:** L'app deve funzionare bene su schermi di diverse dimensioni (mobile-first).

### Flusso Utente Base

1. **Primo Accesso:** L'utente apre la web app. Viene accolto da un messaggio che lo invita ad "adottare" l'animaletto e dargli un nome.

2. **Dashboard Principale:** L'utente vede l'animaletto al centro dello schermo. Sopra o sotto, sono visibili le barre di stato (Fame, Felicità, Energia, Igiene). Sotto l'animaletto, ci sono i pulsanti di azione (Nutri, Gioca, Pulisci). In basso, l'interfaccia di chat.

3. **Interazione Fisica:**
   - L'utente clicca su "Nutri".
   - Il parametro "Fame" aumenta, l'animaletto mostra una breve animazione/cambio di stato visivo (es. un'emoji di soddisfazione).
   - Un breve messaggio di conferma potrebbe apparire (es. "Yum!").

4. **Interazione Chat:**
   - L'utente digita un messaggio nell'input della chat e preme Invio.
   - Il messaggio appare nella cronologia.
   - Dopo un breve caricamento, la risposta dell'AI appare nella cronologia, riflettendo la personalità e lo stato attuale dell'animaletto.

5. **Ciclo di Cura:** I parametri dell'animaletto diminuiscono automaticamente nel tempo, spingendo l'utente a interagire per mantenerlo in salute.

## 5. Requisiti Tecnici e Architettura

### Architettura Semplificata (Client-Side Only)

- **Frontend:** Single Page Application (SPA) con HTML5, CSS3 e JavaScript ES6+. L'uso di React è un'opzione per accelerare lo sviluppo UI, ma il vanilla JS è più leggero per un hackathon di un giorno.
- **Integrazione AI:** Chiamate dirette all'API di servizi AI (es. OpenAI GPT-3.5/4, Claude) tramite fetch API del browser. Nessun backend intermedio per la logica AI.
- **Storage:** localStorage del browser per la persistenza dello stato dell'animaletto. Questo evita la necessità di un database o di un server backend.

### Stack Tecnologico Consigliato

- **HTML5:** Struttura semantica della pagina.
- **CSS3:** Styling, layout (CSS Grid/Flexbox per la responsività), animazioni leggere (transizioni, keyframes). Utilizzo di CSS Variables per temi rapidi.
- **JavaScript ES6+:** Logica dell'applicazione, gestione dello stato, interazioni UI, chiamate API asincrone (async/await).
- **API AI:** OpenAI API (es. gpt-3.5-turbo) o Claude API. È fondamentale avere una chiave API pronta.
- **LocalStorage:** Per salvare e caricare lo stato dell'animaletto.

### Esempio di Implementazione

```javascript
// Struttura semplice ma efficace
// HTML5 + CSS3 (animazioni, grid/flexbox)
// JavaScript ES6+ (async/await, modules)
// OpenAI API o Claude API per l'AI
// CSS Variables per temi/colori dinamici
// LocalStorage per persistenza

class TamagotchiState {
    constructor() {
        this.hunger = 100;      // 0-100
        this.happiness = 100;   // 0-100
        this.energy = 100;      // 0-100
        this.hygiene = 100;     // 0-100
        this.lastUpdate = Date.now();
    }

    update() {
        const now = Date.now();
        const timePassed = (now - this.lastUpdate) / 60000; // minuti

        this.hunger = Math.max(0, this.hunger - timePassed * 2);
        this.happiness = Math.max(0, this.happiness - timePassed * 1.5);
        this.energy = Math.max(0, this.energy - timePassed * 1); // Esempio di decremento energia
        this.hygiene = Math.max(0, this.hygiene - timePassed * 0.5); // Esempio di decremento igiene

        this.lastUpdate = now;
    }

    // Metodi per le azioni
    feed() { this.hunger = Math.min(100, this.hunger + 20); }
    play() { this.happiness = Math.min(100, this.happiness + 25); this.energy = Math.max(0, this.energy - 10); }
    clean() { this.hygiene = Math.min(100, this.hygiene + 30); }
    sleep() { this.energy = Math.min(100, this.energy + 40); } // Aggiunta azione "dormi"
}

const generateAIPrompt = (userMessage, petState) => {
    return `Sei un animaletto virtuale affettuoso e un po' birichino. I tuoi stati attuali sono:
- Fame: ${petState.hunger}/100
- Felicità: ${petState.happiness}/100
- Energia: ${petState.energy}/100
- Igiene: ${petState.hygiene}/100

Rispondi come un animaletto che riflette questi stati. Se hai fame, menzionalo dolcemente o con un piccolo brontolio. Se sei stanco, potresti sbadigliare. Mantieni un tono giocoso e affettuoso.
Messaggio dell'utente: ${userMessage}`;
};
```

## 6. Metriche di Successo e Apprendimento

### Metriche di Successo per l'Hackathon

- **Funzionalità Core Operative:** Tutte le funzionalità MVP (stato, azioni, feedback visivo) e l'integrazione AI di base sono dimostrabili.
- **Interazione AI Coinvolgente:** L'AI risponde in modo pertinente e con una personalità definita.
- **Usabilità:** L'interfaccia è intuitiva e facile da usare per una prima interazione.
- **Presentabilità:** Il prototipo è stabile e visivamente accettabile per una demo.

### Strategie di Apprendimento (anche in un giorno)

- **Feedback Rapido:** Durante lo sviluppo, testare frequentemente le funzionalità con altri membri del team o "utenti" improvvisati per identificare subito problemi di UX o di logica.
- **Iterazione Veloce:** Essere pronti a semplificare o rimuovere funzionalità non essenziali se il tempo stringe, concentrandosi sul nucleo.
- **Monitoraggio AI:** Valutare la qualità delle risposte AI e aggiustare il prompt engineering per migliorare la personalità e la coerenza.

## 7. Rischi e Mitigazioni

### Rischi

#### Complessità Integrazione AI
Le API AI possono essere imprevedibili o richiedere più tempo del previsto per l'integrazione e il prompt engineering.

**Mitigazione:** Iniziare con risposte AI "mock" o predefinite. Se l'integrazione API è troppo complessa, ripiegare su un chatbot più semplice basato su regole fisse.

#### Gestione del Tempo
Un hackathon di un giorno è molto breve.

**Mitigazione:** Timeboxing rigoroso per ogni funzionalità. Concentrarsi sull'MVP e aggiungere polish solo se c'è tempo. Git commits frequenti per salvare i progressi.

#### Bug Imprevisti
Problemi tecnici che possono bloccare lo sviluppo.

**Mitigazione:** Sviluppo incrementale e test continui. Utilizzare strumenti di debug del browser.

#### Performance del Browser
Un'applicazione client-side con logica di stato che si aggiorna nel tempo potrebbe avere impatti sulla performance.

**Mitigazione:** Mantenere la logica di aggiornamento dello stato leggera. Ottimizzare le animazioni CSS.

#### Costo API AI
Le chiamate API hanno un costo.

**Mitigazione:** Monitorare l'utilizzo durante lo sviluppo. Limitare il numero di chiamate in fase di test.

## 8. Considerazioni Future (Oltre l'Hackathon)

Se il progetto dovesse continuare, si potrebbero esplorare le seguenti aree:

- **Stati e Interazioni più Complessi:** Aggiungere stati come malattia, sonno, e mini-giochi interattivi.

- **Personalizzazione Avanzata:** Permettere all'utente di scegliere il tipo di animaletto, il suo aspetto o la sua personalità iniziale.

- **Persistenza Cloud:** Spostare lo stato dell'animaletto su un database cloud (es. Firebase Firestore) per una persistenza cross-device.

- **Notifiche:** Implementare notifiche push per avvisare l'utente quando l'animaletto ha bisogno di attenzione.

- **Social Features:** Condivisione dello stato dell'animaletto o interazione con animaletti di altri utenti.

- **Monetizzazione:** (A lungo termine) Opzioni per personalizzazioni premium o oggetti virtuali.
