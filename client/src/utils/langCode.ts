const getLanguageByLangCode = (langCode: 'ko' | 'en') => {
  if (langCode === 'ko') return 'Korean';
  return 'English';
};

const getLangCodeByLanguage = (language: 'Korean' | 'English') => {
  if (language === 'Korean') return 'ko';
  return 'en';
};

export { getLanguageByLangCode, getLangCodeByLanguage };
