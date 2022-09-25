export const dateFormat = (str: string) => {
  const date = new Date(str);

  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    day: "numeric",
    month: "long",
  });
};
