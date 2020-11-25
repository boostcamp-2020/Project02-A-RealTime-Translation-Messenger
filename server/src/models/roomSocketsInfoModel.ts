import client from './redisConnection';
import Database from '../types/databaseNames';

// 소켓 정보 저장 (룸의 소켓 리스트에 소켓 추가)
const setSocketInfo = (socketId: string, socketInfo: string) => {};

// 룸에 속한 소켓 리스트 뽑아주기
const getSocketsByRoom = (roomId: string) => {};

// 룸에 나간 소켓 삭제하기
const removeSocketByRoom = (roomId: string, socketId: string) => {};

// 룸이 비어있는지 체크
const isRoomEmpty = (roomId: string) => {};
