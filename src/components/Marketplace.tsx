
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Download, Code, MessageSquare } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface ExtensionProps {
  name: string;
  description: string;
  author: string;
  downloads: string;
  icon?: string;
  tags: string[];
  installed?: boolean;
}

const Extension: React.FC<ExtensionProps> = ({ 
  name, description, author, downloads, icon, tags, installed = false 
}) => {
  const [isInstalled, setIsInstalled] = useState(installed);

  return (
    <Card className="mb-4">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-editor-active rounded flex items-center justify-center">
              <Code size={20} />
            </div>
            <div>
              <CardTitle className="text-sm">{name}</CardTitle>
              <CardDescription className="text-xs">{author}</CardDescription>
            </div>
          </div>
          <div>
            <Button 
              variant={isInstalled ? "outline" : "default"} 
              size="sm"
              onClick={() => setIsInstalled(!isInstalled)}
            >
              {isInstalled ? "Uninstall" : "Install"}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-300">{description}</p>
        <div className="flex flex-wrap gap-1 mt-2">
          {tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">{tag}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="text-xs text-gray-500">
        <Download size={12} className="mr-1" /> {downloads} downloads
      </CardFooter>
    </Card>
  );
};

// Placeholder data for extensions
const editorExtensions: ExtensionProps[] = [
  {
    name: "Python",
    description: "Rich support for the Python language",
    author: "Microsoft",
    downloads: "34M+",
    tags: ["Programming Languages", "Linters"],
    installed: true
  },
  {
    name: "ESLint",
    description: "Integrates ESLint into VS Code",
    author: "Microsoft",
    downloads: "23M+",
    tags: ["Linters", "JavaScript"],
    installed: false
  },
  {
    name: "Live Server",
    description: "Launch a development local Server with live reload",
    author: "Ritwick Dey",
    downloads: "41M+",
    tags: ["Web", "HTML"],
    installed: false
  },
  {
    name: "Material Icon Theme",
    description: "Material Design Icons for Visual Studio Code",
    author: "Philipp Kief",
    downloads: "12M+",
    tags: ["Themes", "Icon Packs"],
    installed: false
  }
];

const aiPlugins: ExtensionProps[] = [
  {
    name: "OpenAI GPT-4o",
    description: "Access OpenAI's latest GPT-4o model",
    author: "OpenAI",
    downloads: "2.3M+",
    tags: ["AI", "Code Generation"],
    installed: true
  },
  {
    name: "Claude 3 Sonnet",
    description: "Connect to Anthropic's Claude 3 Sonnet model",
    author: "Anthropic",
    downloads: "1.5M+",
    tags: ["AI", "NLP"],
    installed: false
  },
  {
    name: "Gemini Pro",
    description: "Google's Gemini Pro for code assistance and generation",
    author: "Google",
    downloads: "1.8M+",
    tags: ["AI", "Code Analysis"],
    installed: false
  },
  {
    name: "Code Explain",
    description: "Explains selected code in plain English",
    author: "CodeAI",
    downloads: "920K+", 
    tags: ["AI", "Learning"],
    installed: false
  }
];

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <div className="h-full flex flex-col bg-editor-background overflow-hidden">
      <div className="p-3 border-b border-gray-800 flex items-center justify-between">
        <h3 className="text-sm font-medium flex items-center">
          <Code size={18} className="mr-2" />
          Marketplace
        </h3>
      </div>
      
      <div className="p-4">
        <div className="relative mb-4">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search extensions..."
            className="pl-8 bg-editor-active border-gray-700"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs defaultValue="editor">
          <TabsList className="w-full mb-4 bg-editor-active">
            <TabsTrigger value="editor" className="flex-1">Editor Extensions</TabsTrigger>
            <TabsTrigger value="ai" className="flex-1">AI Plugins</TabsTrigger>
          </TabsList>
          <TabsContent value="editor" className="mt-0">
            <div className="space-y-2">
              {editorExtensions.map((extension, index) => (
                <Extension key={index} {...extension} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="ai" className="mt-0">
            <div className="space-y-2">
              {aiPlugins.map((plugin, index) => (
                <Extension key={index} {...plugin} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Marketplace;
