export const formatDate = (
  day: number,
  month: number,
  year: number,
  format: "ddmmyy" | "mmddyy" | "yymmdd" | undefined,
  separator: "/" | "-" | "." | undefined
): DDMMYY => {
  const dateSeparator = separator || "/";

  // padding single numbers with a zero
  const pad = (value: number) => {
    const padded = ("0" + value).slice(-2);
    return padded;
  };

  const paddedDay = pad(day);
  const paddedMonth = pad(month + 1);

  // create dates with all formats and separators
  const allFormats = {
    ddmmyy: `${paddedDay}${dateSeparator}${paddedMonth}${dateSeparator}${year}`,
    mmddyy: `${paddedMonth}${dateSeparator}${paddedDay}${dateSeparator}${year}`,
    yymmdd: `${year}${dateSeparator}${paddedMonth}${dateSeparator}${paddedDay}`,
  };

  // return the date with specified format and separator
  return allFormats[format || "ddmmyy"] as DDMMYY;
};
