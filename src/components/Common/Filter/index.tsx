import { S } from "./style";

type filterProps = {
  changeSort: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  selectDate: (e) => void;
  selectedDate: { startDate: string; lastDate: string };
};
export default function Filter({
  changeSort,
  selectDate,
  selectedDate,
}: filterProps) {
  return (
    <S.Container>
      <S.Date
        type="date"
        name="startDate"
        // value={selectedDate.startDate}
        onChange={(e) => selectDate(e)}
      ></S.Date>
      <S.Date
        type="date"
        name="lastDate"
        // value={selectedDate.lastDate}
        onChange={(e) => selectDate(e)}
      ></S.Date>
      <select name="sortBy" onChange={(e) => changeSort(e)}>
        <option value="earliest">작성순</option>
        <option value="latest">최신순</option>
      </select>
    </S.Container>
  );
}
