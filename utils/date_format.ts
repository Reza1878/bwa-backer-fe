export const dateFormat = (
  str: string,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    day: "numeric",
    month: "long",
  },
  timeZone = "id-ID"
) => {
  const date = new Date(str);

  return date.toLocaleDateString(timeZone, options);
};
