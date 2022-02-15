export const formatDate = (
  day: number,
  month: number,
  year: number,
  format: DateFormat,
  separator: Separators
): DDMMYY => {
  // extend number object to include padding function
  const pad = (value: number) => {
    const padded = ("0" + value).slice(-2);
    return padded;
  };

  const paddedDay = pad(day);
  const paddedMonth = pad(month + 1);

  const allFormats = {
    ddmmyy: `${paddedDay}${separator}${paddedMonth}${separator}${year}`,
    mmddyy: `${paddedMonth}${separator}${paddedDay}${separator}${year}`,
    yymmdd: `${year}${separator}${paddedMonth}${separator}${paddedDay}`,
  };

  return allFormats[format] as DDMMYY;
};
