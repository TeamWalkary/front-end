import { atom, selector } from 'recoil';
import { pinListType } from '../types/pin';
import { positionType } from '../types/map';
import axios from 'axios';

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

// export const pinList = selector({
//   key:'pinList',
//   get: async ({get}) => {
//     const token = localStorage.getItem('token');
//     const config = {
//       headers: { Authorization: token },
//       params: { sortBy: 'LATEST' },
//     };
//     const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/apis/main/maps-pin`,config);
//     return response.data.pins;

//   }
// })

// axios
// .get<pinResponseType>(
//   `${import.meta.env.VITE_APP_BASE_URL}/apis/main/maps-pin`,
//   config
// )
// .then(res => {
//   setPinList(res.data.pins);
// })
// .catch(error => {
//   console.log(error)