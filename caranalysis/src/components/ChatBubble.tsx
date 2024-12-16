interface ChatBubbleProps {
    sender: "user" | "bot";
    content: string;
  }
  
  export default function ChatBubble({ sender, content }: ChatBubbleProps) {
    return (
      <div className={`message ${sender === "user" ? "user-message" : "bot-message"}`}>
        {content}
      </div>
    );
  }
  