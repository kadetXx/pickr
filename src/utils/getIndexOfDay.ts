export const getIndexOfDay = (day: DayData, calendar: DayData[]) => {
  return calendar.findIndex((item) => {
    return (
      item.dayOfMonth === day.dayOfMonth &&
      item.month === day.month &&
      item.year === day.year
    );
  });
};
