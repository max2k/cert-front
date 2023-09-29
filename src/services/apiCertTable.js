import baseUrl from './baseUrl';

export async function getTable(
  page = 0,
  pageSize = 6,
  sorting,
  nameDescSubStr,
  tags,
) {
  const sortStr = sorting ? `&sort=${sorting}` : '';
  const subStr = nameDescSubStr ? `&substr=${nameDescSubStr}` : '';
  console.log(tags, tags.length);
  const tagsStr = tags?.length > 0 ? '&tags=' + tags.join('&tags=') : '';

  if (!page || page < 0) page = 0;
  if (!pageSize || pageSize < 1) pageSize = 6;

  const tableData = await fetch(
    `${baseUrl}/GiftCertificates?page=${page}&size=${pageSize}${sortStr}${subStr}${tagsStr}`,
    { headers: { 'Content-type': 'application/json' } },
  );

  if (!tableData.ok) throw Error('Failed get certificate list');

  const data = await tableData.json();

  return data;
}
