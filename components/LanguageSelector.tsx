import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'th', name: 'ไทย', flag: '🇹🇭' }
];

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);
  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg bg-white/95 backdrop-blur-sm hover:bg-white/100 transition-colors flex items-center gap-2 shadow-lg border border-white/20"
        aria-label="Select language"
      >
        <Globe size={18} className="text-gray-700" />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50 min-w-[160px]">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                i18n.changeLanguage(lang.code);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 ${
                i18n.language === lang.code ? 'bg-gray-50' : ''
              }`}
            >
              <span className="text-base">{lang.flag}</span>
              <span className="text-sm text-gray-700">{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;