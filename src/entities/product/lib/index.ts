export const cardFontColor = (color: string) => {
  const isDarken = Number(color?.split("-")?.[1] || 0) <= 400;
  const titleColor = isDarken ? "text-gray-900" : "text-white";
  const textColor = isDarken ? "text-gray-800" : "text-gray-50";
  return { titleColor, textColor };
};

/// yyyy-mm-dd
export const formatDate = (date: string) => {
  const [year = 0, month = 0, day = 0] = date.split("-");
  const asDate = new Date(Number(year), Number(month) - 1, Number(day));
  return asDate;
};

export const isDateExpired = (date: string) => {
  const formatted = formatDate(date);
  const current = new Date();
  return current >= formatted;
};
