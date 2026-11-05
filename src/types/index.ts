export type AppState =
  | 'DARK_IDLE'
  | 'AI_LOADING'
  | 'BOARD_MOVING'
  | 'SILENCE_BEAT'
  | 'FLASH_TRANSITION'
  | 'ANGELS_APPEARING'
  | 'JESUS_REVEAL'
  | 'ANSWER_VISIBLE'
  | 'ERROR';

export interface AnswerData {
  question: string;
  fullAnswer: string;
  spelledPhrase: string;
  sentiment?: string;
  isCrisis?: boolean;
}

export interface BoardLetter {
  char: string;
  displayChar: string;
  x: number; // Percentage 0 - 100 on board
  y: number; // Percentage 0 - 100 on board
}
