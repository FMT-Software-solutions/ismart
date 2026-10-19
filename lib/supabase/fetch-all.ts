// Supabase (PostgREST) caps every response at 1000 rows by default, so large
// tables silently get truncated. This pages through with .range() until a
// short page comes back.
const PAGE_SIZE = 1000;

type PageResult<T> = PromiseLike<{
  data: T[] | null;
  error: { message: string } | null;
}>;

export async function fetchAllRows<T>(
  fetchPage: (from: number, to: number) => PageResult<T>
): Promise<{ data: T[]; error: { message: string } | null }> {
  const rows: T[] = [];

  for (let from = 0; ; from += PAGE_SIZE) {
    const { data, error } = await fetchPage(from, from + PAGE_SIZE - 1);
    if (error) return { data: rows, error };

    rows.push(...(data || []));
    if (!data || data.length < PAGE_SIZE) break;
  }

  return { data: rows, error: null };
}
