import { BoardLetter } from '../types';

// Arabic alphabet (28 letters)
export const ARABIC_LETTERS: BoardLetter[] = [
  { char: 'ا', displayChar: 'أ', x: 88, y: 32 },
  { char: 'ب', displayChar: 'ب', x: 82, y: 30 },
  { char: 'ت', displayChar: 'ت', x: 76, y: 28 },
  { char: 'ث', displayChar: 'ث', x: 70, y: 27 },
  { char: 'ج', displayChar: 'ج', x: 64, y: 26 },
  { char: 'ح', displayChar: 'ح', x: 58, y: 25 },
  { char: 'خ', displayChar: 'خ', x: 52, y: 25 },
  { char: 'د', displayChar: 'د', x: 46, y: 25 },
  { char: 'ذ', displayChar: 'ذ', x: 40, y: 26 },
  { char: 'ر', displayChar: 'ر', x: 34, y: 27 },
  { char: 'ز', displayChar: 'ز', x: 28, y: 28 },
  { char: 'س', displayChar: 'س', x: 22, y: 30 },
  { char: 'ش', displayChar: 'ش', x: 16, y: 32 },
  { char: 'ص', displayChar: 'ص', x: 12, y: 36 },
  { char: 'ض', displayChar: 'ض', x: 88, y: 44 },
  { char: 'ط', displayChar: 'ط', x: 82, y: 42 },
  { char: 'ظ', displayChar: 'ظ', x: 76, y: 40 },
  { char: 'ع', displayChar: 'ع', x: 70, y: 39 },
  { char: 'غ', displayChar: 'غ', x: 64, y: 38 },
  { char: 'ف', displayChar: 'ف', x: 58, y: 37 },
  { char: 'ق', displayChar: 'ق', x: 52, y: 37 },
  { char: 'ك', displayChar: 'ك', x: 46, y: 38 },
  { char: 'ل', displayChar: 'ل', x: 40, y: 39 },
  { char: 'م', displayChar: 'م', x: 34, y: 40 },
  { char: 'ن', displayChar: 'ن', x: 28, y: 42 },
  { char: 'هـ', displayChar: 'هـ', x: 22, y: 44 },
  { char: 'و', displayChar: 'و', x: 16, y: 46 },
  { char: 'ي', displayChar: 'ي', x: 12, y: 49 },
];

// Latin letters (A to Z)
export const LATIN_LETTERS: BoardLetter[] = [
  { char: 'A', displayChar: 'A', x: 12, y: 57 },
  { char: 'B', displayChar: 'B', x: 18, y: 55 },
  { char: 'C', displayChar: 'C', x: 24, y: 54 },
  { char: 'D', displayChar: 'D', x: 30, y: 53 },
  { char: 'E', displayChar: 'E', x: 37, y: 52 },
  { char: 'F', displayChar: 'F', x: 43, y: 51 },
  { char: 'G', displayChar: 'G', x: 50, y: 51 },
  { char: 'H', displayChar: 'H', x: 57, y: 51 },
  { char: 'I', displayChar: 'I', x: 63, y: 52 },
  { char: 'J', displayChar: 'J', x: 70, y: 53 },
  { char: 'K', displayChar: 'K', x: 76, y: 54 },
  { char: 'L', displayChar: 'L', x: 82, y: 55 },
  { char: 'M', displayChar: 'M', x: 88, y: 57 },
  { char: 'N', displayChar: 'N', x: 14, y: 65 },
  { char: 'O', displayChar: 'O', x: 20, y: 64 },
  { char: 'P', displayChar: 'P', x: 26, y: 63 },
  { char: 'Q', displayChar: 'Q', x: 32, y: 62 },
  { char: 'R', displayChar: 'R', x: 39, y: 61 },
  { char: 'S', displayChar: 'S', x: 45, y: 61 },
  { char: 'T', displayChar: 'T', x: 52, y: 61 },
  { char: 'U', displayChar: 'U', x: 58, y: 61 },
  { char: 'V', displayChar: 'V', x: 65, y: 62 },
  { char: 'W', displayChar: 'W', x: 71, y: 63 },
  { char: 'X', displayChar: 'X', x: 77, y: 64 },
  { char: 'Y', displayChar: 'Y', x: 83, y: 65 },
  { char: 'Z', displayChar: 'Z', x: 88, y: 66 },
];

// Numbers 0-9
export const NUMBER_LETTERS: BoardLetter[] = [
  { char: '1', displayChar: '1', x: 18, y: 74 },
  { char: '2', displayChar: '2', x: 25, y: 74 },
  { char: '3', displayChar: '3', x: 32, y: 74 },
  { char: '4', displayChar: '4', x: 39, y: 74 },
  { char: '5', displayChar: '5', x: 46, y: 74 },
  { char: '6', displayChar: '6', x: 54, y: 74 },
  { char: '7', displayChar: '7', x: 61, y: 74 },
  { char: '8', displayChar: '8', x: 68, y: 74 },
  { char: '9', displayChar: '9', x: 75, y: 74 },
  { char: '0', displayChar: '0', x: 82, y: 74 },
];

// Special spots
export const SPECIAL_SPOTS: Record<string, { x: number; y: number; label: string }> = {
  YES: { x: 20, y: 15, label: 'YES / نعم' },
  NO: { x: 80, y: 15, label: 'NO / لا' },
  GOODBYE: { x: 50, y: 88, label: 'GOODBYE / وداعاً' },
  CENTER: { x: 50, y: 50, label: 'CENTER' },
};

export const normalizeChar = (rawChar: string): string => {
  const c = rawChar.trim();
  if (!c) return '';
  // Arabic normalization
  if (/[أإآا]/i.test(c)) return 'ا';
  if (/[ةه]/i.test(c)) return 'هـ';
  if (/[ىي]/i.test(c)) return 'ي';
  // English uppercase
  if (/[a-zA-Z]/.test(c)) return c.toUpperCase();
  return c;
};

export const findBoardCoordinate = (char: string): { x: number; y: number; key: string } => {
  const normalized = normalizeChar(char);

  // Check Arabic letters
  const foundArabic = ARABIC_LETTERS.find(
    (l) => l.char === normalized || l.displayChar === normalized
  );
  if (foundArabic) {
    return { x: foundArabic.x, y: foundArabic.y, key: `ar-${foundArabic.displayChar}` };
  }

  // Check Latin letters
  const foundLatin = LATIN_LETTERS.find((l) => l.char === normalized);
  if (foundLatin) {
    return { x: foundLatin.x, y: foundLatin.y, key: `la-${foundLatin.displayChar}` };
  }

  // Check Numbers
  const foundNum = NUMBER_LETTERS.find((l) => l.char === normalized);
  if (foundNum) {
    return { x: foundNum.x, y: foundNum.y, key: `num-${foundNum.displayChar}` };
  }

  // Special words
  if (normalized === 'نعم' || normalized === 'YES') {
    return { ...SPECIAL_SPOTS.YES, key: 'spot-YES' };
  }
  if (normalized === 'لا' || normalized === 'NO') {
    return { ...SPECIAL_SPOTS.NO, key: 'spot-NO' };
  }
  if (normalized === 'وداعاً' || normalized === 'GOODBYE') {
    return { ...SPECIAL_SPOTS.GOODBYE, key: 'spot-GOODBYE' };
  }

  // Default to center
  return { ...SPECIAL_SPOTS.CENTER, key: 'spot-CENTER' };
};
