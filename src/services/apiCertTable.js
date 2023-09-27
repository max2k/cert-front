import baseUrl from './baseUrl';

export async function getTable(page = 0, pageSize = 6, sorting) {
  const sortStr = sorting ? `&${sorting}` : '';

  if (!page || page < 0) page = 0;
  if (!pageSize || pageSize < 1) pageSize = 6;

  const tableData = await fetch(
    `${baseUrl}/GiftCertificates?page=${page}&size=${pageSize}${sortStr}`,
    { headers: { 'Content-type': 'application/json' } },
  );

  if (!tableData.ok) throw Error('Failed get certificate list');

  const data = await tableData.json();

  return data;
}
