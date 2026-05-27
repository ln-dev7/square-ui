import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div
      className={cn(
        "flex gap-4",
        message.sender === "user" ? "justify-end" : "justify-start"
      )}
    >
      {message.sender === "ai" && (
        <div className="shrink-0">
          <div className="size-8 rounded-full bg-secondary flex items-center justify-center">
            <Logo className="size-6" />
          </div>
        </div>
      )}

      <div
        className={cn(
          "rounded-2xl px-4 py-3 max-w-[80%]",
          message.sender === "user"
            ? "bg-primary text-primary-foreground"
            : "bg-secondary"
        )}
      >
        <p className="text-sm leading-relaxed">{message.content}</p>
      </div>

      {message.sender === "user" && (
        <div className="shrink-0">
          <Avatar className="size-8">
            <AvatarImage src="/ln.png" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      )}
    </div>
  );
}

