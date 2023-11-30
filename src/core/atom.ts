import { atom } from 'recoil';
import { pinListType } from '../types/pin';
import { positionType } from '../types/map';

export const position = atom<positionType>({
  key: 'position',
  default: {
    currentLongitude: 0,
    currentLatitude: 0,
   },
});

export const pinList = atom<pinListType[]>({
  key: 'pinList',
  default: [],
});