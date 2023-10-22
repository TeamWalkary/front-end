import { atom } from 'recoil';

export interface positionType {
  currentLatitude: number;
  currentLongitude: number;
}

export const position = atom<positionType>({
  key: 'position',
  default: {
    currentLatitude: 0,
    currentLongitude: 0,
  },
});
