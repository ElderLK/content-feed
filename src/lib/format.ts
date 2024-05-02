const CompactNumber = (value: number) => {
  const formatter = new Intl.NumberFormat("en", { notation: "compact" });
  return formatter.format(value);
};

export const Format = {
  CompactNumber,
};
