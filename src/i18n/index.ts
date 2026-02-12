import { Translation } from './types';
import { en } from './en';
import { de } from './de';

type Language = 'en' | 'de';
type Listener = (lang: Language, t: Translation) => void;

export class I18nService {
  private currentLang: Language = 'de';
  private listeners: Listener[] = [];
  
  // Singleton instance
  private static instance: I18nService;

  private constructor() {}

  public static getInstance(): I18nService {
    if (!I18nService.instance) {
      I18nService.instance = new I18nService();
    }
    return I18nService.instance;
  }

  public get t(): Translation {
    return this.currentLang === 'en' ? en : de;
  }

  public get language(): Language {
    return this.currentLang;
  }

  public setLanguage(lang: Language) {
    if (this.currentLang === lang) return;
    this.currentLang = lang;
    this.notify();
  }

  public subscribe(listener: Listener) {
    this.listeners.push(listener);
    // Immediately call listener with current state
    listener(this.currentLang, this.t);
    
    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach(listener => listener(this.currentLang, this.t));
  }
}

export const i18n = I18nService.getInstance();
