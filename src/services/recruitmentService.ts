import type { Opening } from '../types/recruitment'

function transformOpening(
  item: any,
  idx: number = 0,
  issuerUrl?: string,
  tenantSlug?: string
): Opening {
  return {
    id: item.id ?? item.jobId ?? `opening-${idx}`,
    title: item.title ?? item.name ?? 'Untitled',
    job: item.job.name,
    department: item.department ?? '',
    location: item.address,
    type: item.workType ?? item.employmentType ?? '',
    excerpt: item.excerpt ?? item.summary ?? (typeof item.description === 'string' ? item.description.slice(0, 140) : '') ?? '',
    description: item.description ?? item.summary ?? '',
    url: item.url ?? (issuerUrl && tenantSlug ? `${issuerUrl}/recruitment/${tenantSlug}/signup` : ''),
    rate: item.rate ?? item.hourlyRate ?? item.payRate ?? item.salary ?? undefined,
    hourlyRate: item.hourlyRate,
    salary: item.salary,
    payRate: item.payRate,
    currency: item.currency ?? item.payCurrency ?? 'GBP',
    color: item.job.colorCode,
    timeSpan: item.timeSpan,
    requirement: item.requirement,
  }
}

export async function fetchRecruitmentOpenings(
  apiUrl: string,
  tenantSlug: string,
  offset: number
): Promise<Opening[]> {
  const url = `${apiUrl}/public/${encodeURIComponent(
    tenantSlug
  )}/openings?limit=6&offset=${offset}`

  const res = await fetch(url, {
    method: 'GET',
    credentials: 'omit',
    headers: {
      'Content-Type': 'application/json',
      'X-APPLICATION': 'logezy',
      'X-CLIENT-PLATFORM': 'web',
    },
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`${res.status} ${res.statusText} — ${text}`)
  }

  const data = await res.json()

  if (!Array.isArray(data?.data)) {
    throw new Error('Unexpected API response format (expected array)')
  }

  return data.data.map((item: any, idx: number) => transformOpening(item, idx))
}

export async function fetchRecruitmentOpeningDetail(
  issuerUrl: string,
  apiUrl: string,
  tenantSlug: string,
  id: string
): Promise<Opening | null> {
  const url = `${apiUrl}/public/${encodeURIComponent(
    tenantSlug
  )}/openings/${encodeURIComponent(id)}`

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
