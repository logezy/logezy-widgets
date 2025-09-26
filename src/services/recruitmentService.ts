import type { Opening } from '../types/recruitment'

export async function fetchRecruitmentOpenings(apiUrl:string, tenant: string): Promise<Opening[]> {
  const url = `${apiUrl}/v1/public/${encodeURIComponent(tenant)}/openings?limit=10&offset=0`

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

  return data.data.map((item: any, idx: number): Opening => ({
    id: item.id ?? item.jobId ?? `opening-${idx}`,
    title: item.title ?? item.name ?? 'Untitled',
    role: item.role ?? item.discipline ?? item.department ?? '',
    department: item.department ?? '',
    location: item.location ?? item.city ?? '',
    type: item.type ?? item.employmentType ?? '',
    excerpt:
      item.excerpt ??
      item.summary ??
      (typeof item.description === 'string' ? item.description.slice(0, 140) : '') ??
      '',
    description: item.description ?? item.summary ?? '',
    url: item.url ?? item.applyUrl ?? '',
    rate: item.rate ?? item.hourlyRate ?? item.payRate ?? item.salary ?? undefined,
    hourlyRate: item.hourlyRate,
    salary: item.salary,
    payRate: item.payRate,
    currency: item.currency ?? item.payCurrency ?? 'GBP',
  }))
}

export async function fetchRecruitmentOpeningDetail(apiUrl:string, tenant: string,id: string): Promise<Opening | null> {
  const url = `${apiUrl}/v1/public/${encodeURIComponent(tenant)}/openings/${encodeURIComponent(id)}`
  
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
    throw new Error('Opening not found')
  }

  const data = await res.json()
  const item = data.data || data

  return {
    id: item.id ?? item.jobId ?? id,
    title: item.title ?? item.name ?? 'Untitled',
    role: item.role ?? item.discipline ?? item.department ?? '',
    department: item.department ?? '',
    location: item.location ?? item.city ?? '',
    type: item.type ?? item.employmentType ?? '',
    excerpt:
      item.excerpt ??
      item.summary ??
      (typeof item.description === 'string' ? item.description.slice(0, 140) : '') ??
      '',
    description: item.description ?? item.summary ?? '',
    url: item.url ?? item.applyUrl ?? '',
    rate: item.rate ?? item.hourlyRate ?? item.payRate ?? item.salary ?? undefined,
    hourlyRate: item.hourlyRate,
    salary: item.salary,
    payRate: item.payRate,
    currency: item.currency ?? item.payCurrency ?? 'GBP',
  }
}