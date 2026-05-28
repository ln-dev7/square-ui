import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";
import {
  ZapIcon,
  MessageCircleDashedIcon,
  WandSparklesIcon,
  BoxIcon,
} from "lucide-react";
import { ChatInputBox } from "./chat-input-box";

const chatModes = [
  { id: "fast", label: "Fast", icon: ZapIcon },
  { id: "in-depth", label: "In-depth", icon: MessageCircleDashedIcon },
  { id: "magic", label: "Magic AI", icon: WandSparklesIcon, pro: true },
  { id: "holistic", label: "Holistic", icon: BoxIcon },
];

interface ChatWelcomeScreenProps {
  message: string;
  onMessageChange: (value: string) => void;
  onSend: () => void;
  selectedMode: string;
  onModeChange: (modeId: string) => void;
  selectedModel: string;
  onModelChange: (modelId: string) => void;
}

export function ChatWelcomeScreen({
  message,
  onMessageChange,
  onSend,
  selectedMode,
  onModeChange,
  selectedModel,
  onModelChange,
}: ChatWelcomeScreenProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-4 md:px-8">
      <div className="w-full max-w-[640px] space-y-9 -mt-12">
        <div className="flex justify-center">
          <div className="flex items-center justify-center size-8 rounded-full">
            <Logo className="size-20" />
          </div>
        </div>

        <div className="space-y-4 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Hey! I&apos;m Square.ai
          </h1>
          <p className="text-2xl text-foreground">
            Tell me everything you need
          </p>
        </div>

        <ChatInputBox
          message={message}
          onMessageChange={onMessageChange}
          onSend={onSend}
          selectedModel={selectedModel}
          onModelChange={onModelChange}
          showTools={true}
        />

        <div className="flex flex-wrap items-center justify-center gap-2">
          {chatModes.map((mode) => (
            <Button
              key={mode.id}
              variant={selectedMode === mode.id ? "secondary" : "ghost"}
              className={cn("gap-2", selectedMode === mode.id && "bg-accent")}
              onClick={() => onModeChange(mode.id)}
            >
              <mode.icon className="size-4" />
              <span>{mode.label}</span>
              {mode.pro && (
                <span className="rounded bg-primary/10 px-1.5 py-0.5 text-xs font-medium">
                  Pro
                </span>
              )}
            </Button>
          ))}
        </div>
      </div>

      <div className="absolute bottom-6 text-center">
        <p className="text-sm text-muted-foreground">
          Square AI can make mistakes. Check important info.
        </p>
      </div>
    </div>
  );
}

