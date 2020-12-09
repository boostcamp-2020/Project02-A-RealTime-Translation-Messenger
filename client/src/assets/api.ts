import axios from 'axios';
import { RoomListType, TranslateTextPropsType, TranslateTextReturnType } from '../@types/types';

const backend = axios.create({
  baseURL: process.env.BASE_URL,
});

const getRoomList = async () => {
  return backend.get<{ roomList: RoomListType[] }>('/api/room');
};

const detectLanguage = async ({ query }: { query: string }) => {
  return backend.post<{ langCode: string }>('/api/papago/detection', {
    query,
  });
};

const translateText = async ({ source, target, text }: TranslateTextPropsType) => {
  return backend.post<TranslateTextReturnType>(`/api/papago/translation`, {
    source,
    target,
    text,
  });
};

const api = {
  getRoomList,
  detectLanguage,
  translateText,
};

export default api;
