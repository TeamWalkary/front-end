export default function Today({ selectedDate }: { selectedDate: Date }) {
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth() + 1;
  const day = selectedDate.getDay();
  const date = selectedDate.getDate();

  const getKorDay = (day: number) => {
    switch (day) {
      case 0:
        return "일";
        break;
      case 1:
        return "월";
        break;
      case 2:
        return "화";
        break;
      case 3:
        return "수";
        break;
      case 4:
        return "목";
        break;
      case 5:
        return "금";
        break;
      case 6:
        return "토";
        break;

      default:
        break;
    }
  };
  return (
    <span>
      {year}. {month}. {date}. ({getKorDay(day)})
    </span>
  );
}
