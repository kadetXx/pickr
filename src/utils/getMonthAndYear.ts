// gets the month and year for the next, previous or current calendar group
export const getMonthAndYear = ({
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
      return [month, year];

    case "prev":
      return [prevMonth, prevYear];

    case "next":
      return [nextMonth, nextYear];
  }
};
