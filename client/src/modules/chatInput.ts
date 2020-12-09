import { createAsyncThunk, PayloadAction, createSlice } from '@reduxjs/toolkit';

import { TranslateTextPropsType } from '../@types/types';
import api from '../assets/api';
import { getLanguageByLangCode, getLangCodeByLanguage } from '../utils/langCode';
import LangCode from '../@types/langCode';

const name = 'chatInput';

const getTranslatedText = createAsyncThunk(
  `${name}/getLanguageOfInputText`,
  async ({ text, currentLanguage }: { text: string; currentLanguage: 'Korean' | 'English' }, { rejectWithValue }) => {
    try {
      if (text.length === 0) return { translationText: '', language: currentLanguage };
      const { langCode } = (await api.detectLanguage({ query: text })).data;

      const source = langCode === LangCode.KOREAN ? LangCode.KOREAN : LangCode.ENGLISH;
      const target = langCode === LangCode.KOREAN ? LangCode.ENGLISH : LangCode.KOREAN;

      const translateTextProps: TranslateTextPropsType = {
        source,
        target,
        text,
      };

      const { translatedText } = (await api.translateText(translateTextProps)).data;
      return { translationText: translatedText, language: getLanguageByLangCode(source) };
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

type InitialStateType = {
  chatInput: {
    data: string;
  };

  translation: {
    data: {
      language: 'Korean' | 'English';
      translationText: string;
    };
    loading: boolean;
    error: Error | null;
  };
};

const initialState: InitialStateType = {
  chatInput: {
    data: '',
  },

  translation: {
    data: { language: 'Korean', translationText: '' },
    loading: false,
    error: null,
  },
};

const chatInput = createSlice({
  name,
  initialState,
  reducers: {
    setChatInput: (state, action) => {
      state.chatInput.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTranslatedText.pending.type, (state) => {
        state.translation.loading = true;
      })
      .addCase(
        getTranslatedText.fulfilled.type,
        (state, action: PayloadAction<{ translationText: string; language: 'Korean' | 'English' }>) => {
          state.translation.loading = false;
          state.translation.data = action.payload;
        },
      )
      .addCase(getTranslatedText.rejected.type, (state, action: PayloadAction<Error>) => {
        state.translation.loading = false;
        state.translation.error = action.payload;
      });
  },
});

export default chatInput.reducer;
const setChatInput = chatInput.actions.setChatInput;
export { getTranslatedText, setChatInput };
