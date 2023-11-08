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
