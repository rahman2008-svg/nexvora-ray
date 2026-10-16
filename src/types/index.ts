export type PaddingOption = 16 | 32 | 64 | 128;

export type FontFamily = 'JetBrains Mono' | 'Fira Code' | 'Source Code Pro' | 'Space Mono';

export type FrameStyle = 'mac' | 'windows' | 'none';

export interface ThemeConfig {
  id: string;
  name: string;
  background: string;
  accent: string;
}

export interface LanguageOption {
  id: string;
  name: string;
  extension: string;
  sample: string;
}

export interface SnippetState {
  code: string;
  title: string;
  language: string;
  themeId: string;
  showBackground: boolean;
  isDarkMode: boolean;
  padding: PaddingOption;
  showLineNumbers: boolean;
  font: FontFamily;
  fontSize: number;
  frameStyle: FrameStyle;
  dropShadow: 'none' | 'subtle' | 'medium' | 'dramatic';
}
