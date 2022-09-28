export const dateFormat = (
  str: string,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    day: "numeric",
    month: "long",
  }
) => {
  const date = new Date(str);

  return date.toLocaleDateString("id-ID", options);
};
