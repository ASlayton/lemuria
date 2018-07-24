
const percentageBar = (current, total) => {
  const currentPercent = (current * 1 / total * 1) * 100;
  return currentPercent;
};

export default percentageBar;
