import { useEffect, useRef } from "react";
import useIntersectionObserver from "../../../hooks/useIntersectionObserver";
import { S } from "./style";

type DiaryProps = {
  id: string;
  title: string;
  date: number;
  image: string;
  content: string;
  onFetchMore: () => void;
  isLastItem: boolean;
};

export default function Diary({
  id,
  title,
  date,
  image,
  content,
  onFetchMore,
  isLastItem,
}: DiaryProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {});
  const isIntersecting = !!entry?.isIntersecting;

  useEffect(() => {
    isLastItem && isIntersecting && onFetchMore();
  }, [isLastItem, isIntersecting]);

  return (
    <S.DiaryList key={id}>
      <div>
        <header>{title}</header>
        <p>{date}</p>
      </div>
      {image && <img alt="일기 이미지" src={image}></img>}
      <main>{content}</main>
    </S.DiaryList>
  );
}
