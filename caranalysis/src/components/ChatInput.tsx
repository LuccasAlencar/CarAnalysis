interface ChatInputProps {
    input: string;
    setInput: (value: string) => void;
    onSend: () => void;
  }
  
  export default function ChatInput({ input, setInput, onSend }: ChatInputProps) {
    return (
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite sua mensagem..."
          onKeyDown={(e) => e.key === "Enter" && onSend()}
        />
        <button onClick={onSend}>Enviar</button>
      </div>
    );
  }
  