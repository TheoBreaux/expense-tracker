export const getFormattedDate = (date) => {
  // return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`; //option 1
  return date.toISOString().slice(0, 10);
};

export const getDateMinusDays = (date, days) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
};
