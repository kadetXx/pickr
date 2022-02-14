export const formatDate = (
  day: number,
  month: number,
  year: number,
  format: DateFormat
): DDMMYY => {
  // extend number object to include padding function
  const pad = (value: number) => {
    const padded = ("0" + value).slice(-2);
    return padded;
  };

  const paddedDay = pad(day);
  const paddedMonth = pad(month);

  const allFormats = {
    ddmmyy: `${paddedDay}/${paddedMonth}/${year}`,
    mmddyy: `${paddedMonth}/${paddedDay}/${year}`,
    yymmdd: `${year}/${paddedMonth}/${paddedDay}`,
  };

  return allFormats[format] as DDMMYY;
};
