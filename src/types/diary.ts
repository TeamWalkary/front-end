export interface DiaryData {
  id: number;
  title: string;
  content: string;
  image: string;
  date: string;
}

export interface PostData {
  title: string;
  content: string;
  image?: string;
}
export interface CollectDiaryData {
  id: string;
  title: string;
  date: number;
  image: string;
  content: string;
}
