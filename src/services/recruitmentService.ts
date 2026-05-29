import type { Opening } from '../types/recruitment'

const transformOpening = (
  item: any,
  idx = 0,
  issuerUrl?: string,
  tenantSlug?: string
): Opening => {
  const hasSignupUrl = issuerUrl ? tenantSlug : false

  return {
    id: item.id ?? `opening-${idx}`,
    title: item.title ?? 'Untitled',
    job: item.job?.name ?? '',
    color: item.job?.colorCode,
    location: item.address ?? '',
    type: item.workType ?? '',
    excerpt: typeof item.description === 'string' ? item.description.slice(0, 140) : '',
    description: item.description ?? '',
    url: item.url ?? (hasSignupUrl ? `${issuerUrl}/recruitment/${tenantSlug}/signup` : ''),
    rate: item.rate,
    currency: item.currency ?? 'GBP',
    timeSpan: item.timeSpan,
    requirement: item.requirement,
  }
}

export const fetchRecruitmentOpenings = async (
  apiUrl: string,
  tenantSlug: string,
  offset: number,
): Promise<Opening[]> => {
  const url = `${apiUrl}/public/${encodeURIComponent(tenantSlug)}/openings?limit=6&offset=${offset}`

  const res = await fetch(url, {
    method: 'GET',
    credentials: 'omit',
    headers: {
      'Content-Type': 'application/json',
      'X-APPLICATION': 'logezy',
      'X-CLIENT-PLATFORM': 'web',
    },
  })

  if (res.ok) {
    const data = await res.json()
    const openings = data?.data

    if (Array.isArray(openings)) {
      return openings.map(
        (item: any, idx: number) =>
          transformOpening(
            item,
            idx,
            apiUrl,
            tenantSlug,
          ),
      )
    }

    throw new Error('Unexpected API response format (expected array)')
  }

  const text = await res.text()

  throw new Error(`${res.status} ${res.statusText} — ${text}`)
}

export const fetchRecruitmentOpeningDetail = async (
  issuerUrl: string,
  apiUrl: string,
  tenantSlug: string,
  id: string,
): Promise<Opening | null> => {
  const url = `${apiUrl}/public/${encodeURIComponent(tenantSlug)}/openings/${encodeURIComponent(id)}`

  const res = await fetch(url, {
    method: 'GET',
    credentials: 'omit',
    headers: {
      'Content-Type': 'application/json',
      'X-APPLICATION': 'logezy',
      'X-CLIENT-PLATFORM': 'web',
    },
  })

  if (res.ok) {
    const data = await res.json()
    const item = data.data || data

    return transformOpening(item, 0, issuerUrl, tenantSlug)
  }

  throw new Error('Opening not found')
}
