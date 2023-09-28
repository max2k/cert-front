export function formatDate2(dateStr) {
  const p = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'UTC',
  })
    .formatToParts(new Date(dateStr))
    .reduce((acc, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {});

  return `${p.year}-${p.month}-${p.day} ${p.hour}:${p.minute}`;
}

export function getSortDirectonObj(sortStr) {
  if (!sortStr) return {};
  const sortArr = sortStr.split(',');
  let directon = 'asc';
  if (sortArr[1]) if (sortArr[1].toLowerCase() === 'desc') directon = 'desc';
  const next = directon === 'asc' ? 'desc' : '';

  if (sortArr[0] === 'name') return { name: directon, next };
  if (sortArr[0] === 'description') return { description: directon, next };
  if (sortArr[0] === 'price') return { price: directon, next };

  return { createDate: directon };
}

export function getNextDirection(fieldStr, directon) {
  if (directon === 'asc') return fieldStr + ',desc';
  if (directon === 'desc') return '';
  return fieldStr + ',asc';
}
