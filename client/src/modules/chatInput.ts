import { createAsyncThunk, PayloadAction, createSlice } from '@reduxjs/toolkit';

import { TranslateTextPropsType } from '../@types/types';
import api from '../assets/api';
import { getLanguageByLangCode, getLangCodeByLanguage } from '../utils/langCode';
import LangCode from '../@types/langCode';
import useUser from '../hooks/useUser';

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

const getTextOrigin = createAsyncThunk(`${name}/getTextOrigin`, async (text: string, { rejectWithValue }) => {
  try {
    if (text.length === 0) return null;
    const { langCode } = (await api.detectLanguage({ query: text })).data;

    return langCode === 'ko' ? 'Korean' : 'English';
  } catch (e) {
    return rejectWithValue(e);
  }
});

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

  origin: {
    data: 'Korean' | 'English' | null;
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

  origin: {
    data: null,
    loading: false,
    error: null,
  },
};

const chatInput = createSlice({
  name,
  initialState,
  reducers: {
    setChatInput: (state, action: PayloadAction<string>) => {
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
      })
      .addCase(getTextOrigin.pending.type, (state) => {
        state.origin.loading = true;
      })
      .addCase(getTextOrigin.fulfilled.type, (state, action: PayloadAction<'Korean' | 'English'>) => {
        state.origin.loading = false;
        state.origin.data = action.payload;
      })
      .addCase(getTextOrigin.rejected.type, (state, action: PayloadAction<Error>) => {
        state.origin.loading = false;
        state.origin.error = action.payload;
      });
  },
});

export default chatInput.reducer;
const setChatInput = chatInput.actions.setChatInput;
export { getTranslatedText, setChatInput, getTextOrigin };
