import axios from 'axios';
import { logger } from './logger';

const GOOGLE_TRANSLATE_API_KEY = import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY;
const GOOGLE_TRANSLATE_API_URL = 'https://translation.googleapis.com/language/translate/v2';

export async function translateText(text: string, targetLang: string): Promise<string> {
  try {
    const response = await axios.post(
      `${GOOGLE_TRANSLATE_API_URL}?key=${GOOGLE_TRANSLATE_API_KEY}`,
      {
        q: text,
        target: targetLang,
        format: 'text'
      }
    );

    return response.data.data.translations[0].translatedText;
  } catch (error) {
    logger.error('Translation error:', error);
    return text; // Return original text if translation fails
  }
}

export async function translateObject<T extends Record<string, any>>(
  obj: T,
  targetLang: string,
  excludeKeys: string[] = []
): Promise<T> {
  const translatedObj = { ...obj };

  for (const key in obj) {
    if (excludeKeys.includes(key)) continue;

    const value = obj[key];
    if (typeof value === 'string') {
      translatedObj[key] = await translateText(value, targetLang);
    } else if (typeof value === 'object' && value !== null) {
      translatedObj[key] = await translateObject(value, targetLang, excludeKeys);
    }
  }

  return translatedObj;
}