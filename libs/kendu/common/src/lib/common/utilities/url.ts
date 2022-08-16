import { filterByEntries } from './array'

export interface PathSections {
  protocol: string
  domain: string
  host: string
  path: string
  query: string | undefined
  hash: string | undefined
}

const pathExtractor =
  /^(?:(?<protocol>http[s]?|ftp):\/)?\/?(?<domain>(?<host>[^:/\s.]+)(?:\.[^:/\s.]+)+)(?<path>\/[^?#\n]+\/?)*(?:$|(?<query>\?[^#\n]*$)|(?<q>\?[^#\n]*)(?<h>#.*$)|(?<hash>#.*$)?)/m

interface PathExtractorResult {
  protocol: string
  domain: string
  host: string
  path: string
  query?: string
  hash?: string
  q?: string
  h?: string
}

export function parseURL(url: string | URL, base?: string | URL): PathSections | undefined {
  if (base) url = new URL(url, base)
  const sections = pathExtractor.exec(url?.toString())?.groups as unknown as PathExtractorResult | undefined

  if (!sections) return

  return {
    protocol: sections.protocol,
    domain: sections.domain,
    host: sections.host,
    path: sections.path,
    query: sections.query ?? sections.q,
    hash: sections.hash ?? sections.h,
  }
}

export function filterBySearchParams<T>(data: T[], searchParams: URLSearchParams): T[] {
  const entries: [keyof T, string][] = Array.from((searchParams as any).entries())

  return filterByEntries(data, entries)
}
