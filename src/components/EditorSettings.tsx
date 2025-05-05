
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings, Sliders } from "lucide-react";
import { EditorOptions } from "@/types/editor";
import { useToast } from "@/hooks/use-toast";

interface EditorSettingsProps {
  options: EditorOptions;
  onOptionsChange: (options: Partial<EditorOptions>) => void;
}

const EditorSettings: React.FC<EditorSettingsProps> = ({ options, onOptionsChange }) => {
  const [autoSave, setAutoSave] = useState(true);
  const [formatOnSave, setFormatOnSave] = useState(true);
  const { toast } = useToast();
  
  const handleFontSizeChange = (value: number[]) => {
    onOptionsChange({ fontSize: value[0] });
    toast({
      title: "Font size updated",
      description: `Font size set to ${value[0]}px`,
      duration: 2000,
    });
  };
  
  const handleThemeChange = (value: string) => {
    onOptionsChange({ theme: value });
    toast({
      title: "Theme updated",
      description: `Editor theme changed to ${value}`,
      duration: 2000,
    });
  };
  
  const handleMinimapChange = (checked: boolean) => {
    onOptionsChange({ minimap: { enabled: checked } });
    toast({
      title: "Minimap setting updated",
      description: checked ? "Minimap enabled" : "Minimap disabled",
      duration: 2000,
    });
  };
  
  const handleLineNumbersChange = (checked: boolean) => {
    onOptionsChange({ lineNumbers: checked ? 'on' : 'off' });
    toast({
      title: "Line numbers setting updated",
      description: checked ? "Line numbers enabled" : "Line numbers disabled",
      duration: 2000,
    });
  };
  
  const handleTabSizeChange = (value: string) => {
    onOptionsChange({ tabSize: parseInt(value) });
    toast({
      title: "Tab size updated",
      description: `Tab size set to ${value} spaces`,
      duration: 2000,
    });
  };
  
  const handleWordWrapChange = (checked: boolean) => {
    onOptionsChange({ wordWrap: checked ? 'on' : 'off' });
    toast({
      title: "Word wrap setting updated",
      description: checked ? "Word wrap enabled" : "Word wrap disabled",
      duration: 2000,
    });
  };
  
  const handleAutoSaveChange = (checked: boolean) => {
    setAutoSave(checked);
    toast({
      title: "Auto save setting updated",
      description: checked ? "Auto save enabled" : "Auto save disabled",
      duration: 2000,
    });
  };
  
  const handleFormatOnSaveChange = (checked: boolean) => {
    setFormatOnSave(checked);
    toast({
      title: "Format on save setting updated",
      description: checked ? "Format on save enabled" : "Format on save disabled",
      duration: 2000,
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="h-8 w-8">
          <Sliders size={16} />
          <span className="sr-only">Editor settings</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-editor-background/90 backdrop-blur-sm border-gray-700">
        <div className="space-y-4">
          <h4 className="font-medium text-sm text-gray-200">Editor Settings</h4>
          <Tabs defaultValue="appearance">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="editor">Editor</TabsTrigger>
              <TabsTrigger value="files">Files</TabsTrigger>
            </TabsList>
            
            <TabsContent value="appearance" className="mt-2 space-y-3">
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select 
                  value={options.theme || 'vs-dark'} 
                  onValueChange={handleThemeChange}
                >
                  <SelectTrigger id="theme" className="bg-editor-active">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-editor-background border-gray-700">
                    <SelectItem value="vs-dark">Dark (Visual Studio)</SelectItem>
                    <SelectItem value="hc-black">High Contrast Dark</SelectItem>
                    <SelectItem value="vs">Light (Visual Studio)</SelectItem>
                    <SelectItem value="vs-code-dark">Dark+ (Visual Studio Code)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="font-size">Font Size: {options.fontSize || 14}px</Label>
                </div>
                <Slider 
                  id="font-size" 
                  min={10} 
                  max={30} 
                  step={1} 
                  value={[options.fontSize || 14]} 
                  onValueChange={handleFontSizeChange}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="minimap">Minimap</Label>
                <Switch 
                  id="minimap" 
                  checked={options.minimap?.enabled || false}
                  onCheckedChange={handleMinimapChange}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="lineNumbers">Line Numbers</Label>
                <Switch 
                  id="lineNumbers" 
                  checked={options.lineNumbers !== 'off'}
                  onCheckedChange={handleLineNumbersChange}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="editor" className="mt-2 space-y-3">
              <div className="space-y-2">
                <Label htmlFor="tabSize">Tab Size</Label>
                <Select 
                  value={String(options.tabSize || 2)} 
                  onValueChange={handleTabSizeChange}
                >
                  <SelectTrigger id="tabSize" className="bg-editor-active">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-editor-background border-gray-700">
                    <SelectItem value="2">2 spaces</SelectItem>
                    <SelectItem value="4">4 spaces</SelectItem>
                    <SelectItem value="8">8 spaces</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="wordWrap">Word Wrap</Label>
                <Switch 
                  id="wordWrap" 
                  checked={options.wordWrap === 'on'}
                  onCheckedChange={handleWordWrapChange}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="autoSave">Auto Save</Label>
                <Switch 
                  id="autoSave" 
                  checked={autoSave}
                  onCheckedChange={handleAutoSaveChange}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="formatOnSave">Format On Save</Label>
                <Switch 
                  id="formatOnSave" 
                  checked={formatOnSave}
                  onCheckedChange={handleFormatOnSaveChange}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="files" className="mt-2 space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="insertFinalNewline">Insert Final Newline</Label>
                <Switch 
                  id="insertFinalNewline" 
                  defaultChecked={true} 
                  onCheckedChange={(checked) => {
                    toast({
                      title: "Insert final newline setting updated",
                      description: checked ? "Insert final newline enabled" : "Insert final newline disabled",
                      duration: 2000,
                    });
                  }}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="trimTrailingWhitespace">Trim Trailing Whitespace</Label>
                <Switch 
                  id="trimTrailingWhitespace" 
                  defaultChecked={true}
                  onCheckedChange={(checked) => {
                    toast({
                      title: "Trim trailing whitespace setting updated",
                      description: checked ? "Trim trailing whitespace enabled" : "Trim trailing whitespace disabled",
                      duration: 2000,
                    });
                  }}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="eol">End of Line</Label>
                <Select defaultValue="lf" onValueChange={(value) => {
                  toast({
                    title: "End of line setting updated",
                    description: `End of line set to ${value.toUpperCase()}`,
                    duration: 2000,
                  });
                }}>
                  <SelectTrigger id="eol" className="bg-editor-active">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-editor-background border-gray-700">
                    <SelectItem value="lf">LF (Unix)</SelectItem>
                    <SelectItem value="crlf">CRLF (Windows)</SelectItem>
                    <SelectItem value="cr">CR (Mac)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default EditorSettings;
