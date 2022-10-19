export async function parseIntFromContextQuery(
  query: string | string[] | undefined,
) {
  if (!query || Array.isArray(query)) return undefined;
  if (query === 'string') return query;
  return await parseInt(query);
}
