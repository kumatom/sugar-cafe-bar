export function currency(num, fixed = 0) {
  const n = fixed > 0 ? parseFloat(num, 10) : parseInt(num, 10);
  return `${n
    .toFixed(fixed)
    .replace(/./g, (c, i, a) => (i && c !== '.' && (a.length - i) % 3 === 0 ? `, ${c}`.replace(/\s/g, '') : c))}`;
}

export function date(time) {
  const localDate = new Date(time * 1000);
  return localDate.toLocaleDateString();
}
