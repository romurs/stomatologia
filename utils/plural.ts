/** Русское склонение по числу: plural(3, ["врач", "врача", "врачей"]) → "врача" */
export const plural = (n: number, [one, few, many]: [string, string, string]) => {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
  return many;
};

/** «1 год», «3 года», «22 года», «11 лет» */
export const pluralYears = (n: number) => `${n} ${plural(n, ["год", "года", "лет"])}`;
