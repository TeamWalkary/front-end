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