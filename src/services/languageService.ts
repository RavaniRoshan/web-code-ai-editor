
// Common programming languages supported by Monaco editor
export interface LanguageInfo {
  name: string;
  extensions: string[];
  language: string; // Monaco editor language identifier
  icon?: string;    // CSS class for icon (can be extended with more icons)
}

export const supportedLanguages: LanguageInfo[] = [
  { name: 'JavaScript', extensions: ['js'], language: 'javascript', icon: 'text-yellow-400' },
  { name: 'TypeScript', extensions: ['ts'], language: 'typescript', icon: 'text-blue-400' },
  { name: 'JSX', extensions: ['jsx'], language: 'javascript', icon: 'text-yellow-400' },
  { name: 'TSX', extensions: ['tsx'], language: 'typescript', icon: 'text-blue-400' },
  { name: 'HTML', extensions: ['html', 'htm'], language: 'html', icon: 'text-orange-400' },
  { name: 'CSS', extensions: ['css'], language: 'css', icon: 'text-purple-400' },
  { name: 'JSON', extensions: ['json'], language: 'json', icon: 'text-green-400' },
  { name: 'Markdown', extensions: ['md', 'markdown'], language: 'markdown', icon: 'text-gray-400' },
  { name: 'Python', extensions: ['py', 'pyw'], language: 'python', icon: 'text-blue-600' },
  { name: 'Java', extensions: ['java'], language: 'java', icon: 'text-red-400' },
  { name: 'C#', extensions: ['cs'], language: 'csharp', icon: 'text-green-600' },
  { name: 'C++', extensions: ['cpp', 'cxx', 'cc'], language: 'cpp', icon: 'text-blue-500' },
  { name: 'C', extensions: ['c'], language: 'c', icon: 'text-blue-300' },
  { name: 'PHP', extensions: ['php'], language: 'php', icon: 'text-indigo-400' },
  { name: 'Ruby', extensions: ['rb'], language: 'ruby', icon: 'text-red-500' },
  { name: 'Go', extensions: ['go'], language: 'go', icon: 'text-blue-400' },
  { name: 'Rust', extensions: ['rs'], language: 'rust', icon: 'text-orange-600' },
  { name: 'Swift', extensions: ['swift'], language: 'swift', icon: 'text-orange-500' },
  { name: 'YAML', extensions: ['yml', 'yaml'], language: 'yaml', icon: 'text-yellow-600' },
  { name: 'SQL', extensions: ['sql'], language: 'sql', icon: 'text-blue-300' },
  { name: 'Shell', extensions: ['sh', 'bash'], language: 'shell', icon: 'text-green-400' },
  { name: 'PowerShell', extensions: ['ps1'], language: 'powershell', icon: 'text-blue-400' },
  { name: 'XML', extensions: ['xml'], language: 'xml', icon: 'text-orange-300' },
  { name: 'Docker', extensions: ['dockerfile'], language: 'dockerfile', icon: 'text-blue-500' },
  { name: 'GraphQL', extensions: ['graphql', 'gql'], language: 'graphql', icon: 'text-pink-400' },
  { name: 'SCSS', extensions: ['scss'], language: 'scss', icon: 'text-pink-600' },
  { name: 'LESS', extensions: ['less'], language: 'less', icon: 'text-indigo-300' },
  { name: 'Plain Text', extensions: ['txt'], language: 'plaintext', icon: 'text-gray-400' }
];

export const getLanguageFromExtension = (fileName: string): string => {
  const extension = fileName.split('.').pop()?.toLowerCase() || '';
  
  for (const lang of supportedLanguages) {
    if (lang.extensions.includes(extension)) {
      return lang.language;
    }
  }
  
  return 'plaintext';
};

export const getIconForLanguage = (language: string): string => {
  const lang = supportedLanguages.find(l => l.language === language);
  return lang?.icon || 'text-gray-400';
};

export const getExtensionFromLanguage = (language: string): string => {
  const lang = supportedLanguages.find(l => l.language === language);
  return lang?.extensions[0] || 'txt';
};

export const getAllFileTypes = (): { label: string; value: string; description?: string }[] => {
  return supportedLanguages.map(lang => ({
    label: lang.name,
    value: lang.language,
    description: lang.extensions.map(ext => `.${ext}`).join(', ')
  }));
};
