export const getMonthAndYearOfSpillOvers = ({
  type,
  month,
  year,
}: {
  month: number;
  year: number;
  type: "prev" | "next" | "current";
}) => {
  const prevMonth = month === 0 ? 11 : month - 1;
  const nextMonth = month === 11 ? 0 : month + 1;

  const prevYear = month === 0 ? year - 1 : year;
  const nextYear = month === 11 ? year + 1 : year;

  switch (type) {
    case "current":
      return {
        monthOfCurrentIndex: month,
        yearOfCurrentIndex: year,
      };

    case "prev":
      return {
        monthOfCurrentIndex: prevMonth,
        yearOfCurrentIndex: prevYear,
      };

    case "next":
      return {
        monthOfCurrentIndex: nextMonth,
        yearOfCurrentIndex: nextYear,
      };
  }
};