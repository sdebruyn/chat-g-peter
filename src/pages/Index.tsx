import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";

const RESPONSES = [
  "Zoek 't uit!",
  "Zoek 't op!",
  "Ik weet het niet, zoek het uit en laat het mij weten!",
  "... iets over een database ... iets over ANB-geschiedenis ... iets over wat Peter vorige week nog bedacht had ... hier en daar een grapje ... dus eigenlijk een heel lang antwoord om te zeggen: Ik weet het niet.",
  "...zucht",
  "Oh nee, Peter toch... ja, je had een vraag kun je het nog eens herhalen?",
  "Hmm, ik weet het niet. Ik denk dat je best een ticketje maakt en dan kunnen we dat bespreken bij die meeting waarvan ik de naam niet meer weet die elke woensdagnamiddag plaatsvindt.",
];

const SPECIAL_RESPONSES: Record<string, string> = {
  "wie is peter vandemaele?": "Peter Vandemaele is de legendarische data architect die bij het Agentschap voor Natuur & Bos orde in de datachaos bracht. Na 3 jaren van vlekkeloze in-productiestellingen, succesvol ontrafelen van conceptuele en logische modellen - gepaard met af en toe eens een goed geplaatste \"Och, Peter!\" - besloot hij om de reuzen van de data warenhuizen achter zich te laten om zich een jaar lang te focussen op bakstenen huizen.",
};

interface Message {
  role: "user" | "bot";
  text: string;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Hallo ANB! Ik ben Chat-G-PeTer 🤖 Stel me een vraag!" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || isTyping) return;

    setMessages((prev) => [...prev, { role: "user", text: trimmed }]);
    setInput("");
    setIsTyping(true);

    const delay = 800 + Math.random() * 1500;
    setTimeout(() => {
      const reply = SPECIAL_RESPONSES[trimmed.toLowerCase()] ?? RESPONSES[Math.floor(Math.random() * RESPONSES.length)];
      setMessages((prev) => [...prev, { role: "bot", text: reply }]);
      setIsTyping(false);
    }, delay);
  };

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto">
      {/* Header */}
      <header className="flex items-center gap-3 px-6 py-4 border-b border-border">
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-lg chat-glow">
            P
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-primary border-2 border-background" />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-tight text-foreground">
            Chat-G-<span className="text-primary">PeTer</span>
          </h1>
          <p className="text-xs text-muted-foreground font-mono flex items-center gap-1">
            v1.2.3 - <svg viewBox="0 0 24 24" className="w-3 h-3 inline-block" fill="none"><defs><linearGradient id="jira" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#2684FF"/><stop offset="100%" stopColor="#0052CC"/></linearGradient></defs><path d="M11.53 2L2 11.53a.67.67 0 000 .94L11.53 22a.67.67 0 00.94 0L22 12.47a.67.67 0 000-.94L12.47 2a.67.67 0 00-.94 0z" fill="url(#jira)"/><path d="M11.53 2L2 11.53a.67.67 0 000 .94l4.24 4.24L12 11l5.76 5.71 4.24-4.24a.67.67 0 000-.94L12.47 2a.67.67 0 00-.94 0z" fill="#2684FF"/></svg> IPS status: ARCHITECTURAL REVIEW • Online
          </p>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground rounded-br-md"
                  : "bg-secondary text-secondary-foreground rounded-bl-md"
              }`}
              style={{ fontFamily: msg.role === "bot" ? "'JetBrains Mono', monospace" : undefined }}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-secondary text-muted-foreground px-4 py-2.5 rounded-2xl rounded-bl-md text-sm font-mono">
              <span className="typing-cursor">Aan het denken</span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-4 pb-4 pt-2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2 bg-secondary rounded-xl px-4 py-2 border border-border focus-within:border-primary/50 transition-colors"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Stel een vraag aan Chat-G-PeTer..."
            className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="p-2 rounded-lg bg-primary text-primary-foreground disabled:opacity-30 hover:brightness-110 transition-all"
          >
            <Send size={16} />
          </button>
        </form>
        <p className="text-[10px] text-muted-foreground text-center mt-2 font-mono">
          Chat-G-PeTer kan fouten maken. Eigenlijk maakt hij alleen maar fouten.
        </p>
      </div>
    </div>
  );
};

export default Index;
