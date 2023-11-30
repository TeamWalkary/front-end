export interface pinResponseType {
  pins: pinListType[];
}

export interface pinListType {
  id: number;
  contents: string;
  longitude: number;
  latitude: number;
  stampTime: string;
}

