
import React from "react";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Settings } from "lucide-react";

export interface AIModel {
  id: string;
  name: string;
  provider: string;
  description: string;
  apiKeyRequired: boolean;
}

const availableModels: AIModel[] = [
  {
    id: "gpt-4o",
    name: "GPT-4o",
    provider: "OpenAI",
    description: "Latest multimodal model with vision capabilities",
    apiKeyRequired: true
  },
  {
    id: "gpt-4-turbo",
    name: "GPT-4 Turbo",
    provider: "OpenAI",
    description: "Fast and cost-effective with high capabilities",
    apiKeyRequired: true
  },
  {
    id: "claude-3-sonnet",
    name: "Claude 3 Sonnet",
    provider: "Anthropic",
    description: "Strong reasoning and coding capabilities",
    apiKeyRequired: true
  },
  {
    id: "claude-3-opus",
    name: "Claude 3 Opus",
    provider: "Anthropic",
    description: "Anthropic's most powerful model for complex tasks",
    apiKeyRequired: true
  },
  {
    id: "gemini-pro",
    name: "Gemini Pro",
    provider: "Google",
    description: "Google's advanced AI model for code",
    apiKeyRequired: true
  },
  {
    id: "gemini-ultra",
    name: "Gemini Ultra",
    provider: "Google",
    description: "Google's most capable multimodal model",
    apiKeyRequired: true
  },
  {
    id: "mistral-large",
    name: "Mistral Large",
    provider: "Mistral AI",
    description: "Powerful general purpose model",
    apiKeyRequired: true
  }
];

interface AIModelSelectorProps {
  selectedModel: string;
  onModelChange: (modelId: string) => void;
}

const AIModelSelector: React.FC<AIModelSelectorProps> = ({ 
  selectedModel, 
  onModelChange 
}) => {
  const model = availableModels.find(m => m.id === selectedModel) || availableModels[0];
  
  return (
    <div className="flex items-center gap-2 p-2">
      <Settings size={16} className="text-gray-400" />
      <Select value={selectedModel} onValueChange={onModelChange}>
        <SelectTrigger className="w-[180px] h-8 text-xs bg-editor-active">
          <SelectValue placeholder="Select Model" />
        </SelectTrigger>
        <SelectContent className="bg-editor-background border-gray-700">
          {['OpenAI', 'Anthropic', 'Google', 'Mistral AI'].map(provider => (
            <SelectGroup key={provider}>
              <SelectLabel className="text-xs">{provider}</SelectLabel>
              {availableModels
                .filter(model => model.provider === provider)
                .map(model => (
                  <SelectItem key={model.id} value={model.id} className="text-xs">
                    {model.name}
                  </SelectItem>
                ))}
            </SelectGroup>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default AIModelSelector;
