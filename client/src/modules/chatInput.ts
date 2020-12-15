import { createAsyncThunk, PayloadAction, createSlice } from '@reduxjs/toolkit';

import { TranslateTextPropsType } from '../@types/types';
import api from '../assets/api';
import LangCode from '../@types/langCode';
import useUser from '../hooks/useUser';

const name = 'chatInput';

const getTranslatedText = createAsyncThunk(
  `${name}/getLanguageOfInputText`,
  async ({ text, origin }: { text: string; origin: LangCode }, { rejectWithValue }) => {
    try {
      if (text.trim().length === 0) return { translationText: '', origin: origin };
      const { langCode } = (await api.detectLanguage({ query: text })).data;

      const source = langCode === LangCode.KOREAN ? LangCode.KOREAN : LangCode.ENGLISH;
      const target = langCode === LangCode.KOREAN ? LangCode.ENGLISH : LangCode.KOREAN;

      const translateTextProps: TranslateTextPropsType = {
        source,
        target,
        text,
      };

      const { translatedText } = (await api.translateText(translateTextProps)).data;
      return { translationText: translatedText, origin: source };
    } catch (e) {
      console.log(e);
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
      origin: LangCode;
      translationText: string;
    };
    loading: boolean;
    error: Error | null;
  };

  cycle: {
    data: 'PROCESS' | 'DONE';
  };
};

const initialState: InitialStateType = {
  chatInput: {
    data: '',
  },

  translation: {
    data: { origin: LangCode.KOREAN, translationText: '' },
    loading: false,
    error: null,
  },

  cycle: {
    data: 'DONE',
  },
};

const chatInput = createSlice({
  name,
  initialState,
  reducers: {
    setChatInput: (state, action: PayloadAction<string>) => {
      state.chatInput.data = action.payload;
    },
    setTranslation: (state, action: PayloadAction<string>) => {
      state.translation.data.translationText = action.payload;
    },
    resetChatInput: (state) => {
      state.chatInput.data = '';
      state.translation.data = { origin: LangCode.KOREAN, translationText: '' };
    },
    setCycle: (state, action: PayloadAction<'PROCESS' | 'DONE'>) => {
      state.cycle.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTranslatedText.pending.type, (state) => {
        state.translation.loading = true;
      })
      .addCase(
        getTranslatedText.fulfilled.type,
        (state, action: PayloadAction<{ translationText: string; origin: LangCode }>) => {
          state.translation.loading = false;
          state.translation.data = action.payload;
          state.cycle.data = 'DONE';
        },
      )
      .addCase(getTranslatedText.rejected.type, (state, action: PayloadAction<Error>) => {
        state.translation.loading = false;
        state.translation.error = action.payload;
      });
  },
});

export default chatInput.reducer;
export const setChatInput = chatInput.actions.setChatInput;
export const setTranslation = chatInput.actions.setTranslation;
export const resetChatInput = chatInput.actions.resetChatInput;
export const setCycle = chatInput.actions.setCycle;
export { getTranslatedText };
