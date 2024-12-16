import { useState, useEffect, useRef } from "react"; 
import Image from 'next/image';

interface Message { 
  sender: "user" | "bot"; 
  content: string; 
}

export default function ChatPage() { 
  const [messages, setMessages] = useState<Message[]>([]); 
  const [input, setInput] = useState(""); 
  const interactiveRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;

    function move() {
      if (interactiveRef.current) {
        curX += (tgX - curX) / 20;
        curY += (tgY - curY) / 20;
        interactiveRef.current.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
        requestAnimationFrame(move);
      }
    }

    const handleMouseMove = (event: MouseEvent) => {
      tgX = event.clientX;
      tgY = event.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    move();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const sendMessage = async () => { 
    if (!input.trim()) return; 
    
    const userMessage: Message = { sender: "user", content: input }; 
    setMessages((prev) => [...prev, userMessage]); 
    setInput(""); 

    try { 
      const response = await fetch("/api/chat", { 
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({ message: input }), 
      }); 
      
      const data = await response.json(); 
      const botMessage: Message = { sender: "bot", content: data.response }; 
      setMessages((prev) => [...prev, botMessage]); 
    } catch { 
      const errorMessage: Message = { sender: "bot", content: "Erro ao se comunicar com o servidor." }; 
      setMessages((prev) => [...prev, errorMessage]); 
    } 
  }; 

  return ( 
    <div className="gradient-container">
      <div className="gradient-bg">
        <svg xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
              <feColorMatrix 
                in="blur" 
                mode="matrix" 
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" 
                result="goo" 
              />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>
        <div className="gradients-container">
          {[1, 2, 3, 4, 5].map((num) => (
            <div 
              key={num} 
              className={`g${num}`}
            />
          ))}
          <div 
            ref={interactiveRef}
            className="interactive"
          />
        </div>
      </div>
      
      <div className="chat-container">
        <div className="messages">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`message ${msg.sender === "user" ? "user-message" : "bot-message"}`}
            >
              {msg.content}
            </div>
          ))}
        </div>
        <div className="input-container">
          <input 
            type="text" 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            placeholder="Digite sua mensagem..." 
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage}>
            <Image src="/images/enviar-2.svg" alt="Menu" width={35} height={35} />
          </button>
        </div>
      </div>
    </div>
  ); 
}