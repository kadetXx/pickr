type Day =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

type Month =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

interface DayData {
  weekDay: Day | null;
  dayOfMonth: number | null;
  month: number | null;
  year: number | null;
  dateString: Date | null;
  timeStamp: number | null;
}
