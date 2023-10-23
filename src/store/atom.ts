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

export interface pinResponseType {
  pins: pinListType[];
}
export interface pinListType {
  id: number;
  contents: string;
  latitude: number;
  longitude: number;
  stampTime: string;
}

export const pinList = atom<pinListType[]>({
  key: 'pinList',
  default: [],
});
