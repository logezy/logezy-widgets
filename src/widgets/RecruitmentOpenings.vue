<template>
  <div
    part="root"
    class="w-full max-w-2xl rounded-2xl border border-gray-200/80 bg-white/90 shadow-lg backdrop-blur-sm p-4 md:p-6"
  >
    <!-- Header -->
    <header part="header" class="mb-4 flex items-center justify-between">
      <h3 class="m-0 text-xl font-semibold tracking-tight text-gray-900">
        Openings
      </h3>
      <small class="text-[11px] font-medium text-gray-500">
        Tenant:
        <strong class="text-gray-800">{{ tenant || 'demo' }}</strong>
      </small>
    </header>

    <!-- Body -->
    <main part="body" class="min-h-10">
      <!-- Loading -->
      <div v-if="loading" class="space-y-4">
        <div class="animate-pulse rounded-[22px] border border-gray-200/70 bg-white p-5 shadow-md">
          <div class="h-5 w-40 rounded bg-gray-200/80"></div>
          <div class="mt-3 h-3 w-3/4 rounded bg-gray-200/80"></div>
          <div class="mt-2 h-3 w-2/3 rounded bg-gray-200/80"></div>
          <div class="mt-4 h-8 w-28 rounded bg-gray-200/80"></div>
        </div>
        <div class="animate-pulse rounded-[22px] border border-gray-200/70 bg-white p-5 shadow-md">
          <div class="h-5 w-48 rounded bg-gray-200/80"></div>
          <div class="mt-3 h-3 w-4/5 rounded bg-gray-200/80"></div>
          <div class="mt-2 h-3 w-1/2 rounded bg-gray-200/80"></div>
          <div class="mt-4 h-8 w-28 rounded bg-gray-200/80"></div>
        </div>
      </div>

      <!-- Error -->
      <div
        v-else-if="error"
        class="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
      >
        <span class="font-medium">Error:</span> {{ error }}
      </div>

      <!-- List -->
      <ul v-else class="grid gap-4 sm:gap-5">
        <!-- Empty -->
        <li v-if="openings.length === 0" class="py-3 text-center text-xs text-gray-500">
          No openings found.
        </li>

        <!-- Opening card -->
        <li
          v-for="opening in openings"
          :key="opening.id"
          class="relative rounded-[22px] border border-gray-200/70 bg-white p-5 shadow-md"
        >
          <!-- Top-right pay badge -->
          <div
            v-if="displayRate(opening)"
            class="absolute right-4 top-4 rounded-md bg-gray-100 px-3 py-1 text-sm font-semibold text-slate-800"
            :aria-label="`Rate ${displayRate(opening)}`"
          >
            {{ displayRate(opening) }}
          </div>

          <!-- Title -->
          <h3 class="text-xl font-semibold text-slate-900">
            {{ opening.title }}
          </h3>

          <!-- Meta -->
          <div class="mt-3 space-y-2 text-sm text-gray-500">
            <!-- Role/Discipline -->
            <div v-if="opening.role || opening.department" class="flex items-start gap-2">
              <svg class="h-5 w-5 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20 7h-4V6a4 4 0 10-8 0v1H4a2 2 0 00-2 2v8a3 3 0 003 3h14a3 3 0 003-3V9a2 2 0 00-2-2zM10 6a2 2 0 114 0v1h-4V6z"/>
              </svg>
              <span>{{ opening.role || opening.department }}</span>
            </div>

            <!-- Location -->
            <div v-if="opening.location" class="flex items-start gap-2">
              <svg class="h-5 w-5 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"/>
              </svg>
              <span class="capitalize">{{ opening.location }}</span>
            </div>

            <!-- Type chip -->
            <div v-if="opening.type" class="pt-1">
              <span class="inline-flex items-center rounded-md bg-slate-200/70 px-2.5 py-1 text-xs font-semibold text-slate-800">
                {{ opening.type.replace('_', ' ') }}
              </span>
            </div>
          </div>

          <!-- Excerpt -->
          <p v-if="opening.excerpt" class="mt-4 text-sm text-gray-600">
            {{ opening.excerpt }}
          </p>

          <!-- Actions -->
          <div class="mt-5 flex flex-wrap items-center gap-3">
            <a
              v-if="opening.url"
              :href="opening.url"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500"
            >
              Details
            </a>

            <button
              type="button"
              class="inline-flex items-center justify-center rounded-lg bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              @click="share(opening)"
            >
              Share
            </button>
          </div>
        </li>
      </ul>
    </main>

    <!-- Footer -->
    <footer part="footer" class="mt-4 text-right text-[11px] text-gray-400">
      <small>
        Powered by
        <a
          href="https://www.logezy.com"
          target="_blank"
          rel="noopener noreferrer"
          class="font-medium text-gray-500 underline decoration-dotted underline-offset-2 hover:text-gray-700 hover:decoration-solid"
        >Logezy</a>
      </small>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

interface Opening {
  id: string
  title: string
  role?: string
  department?: string
  location: string
  type: string
  excerpt: string
  url: string
  rate?: number
  hourlyRate?: number
  salary?: number
  payRate?: number
  currency?: string
}

interface RecruitmentOpeningsProps {
  apiUrl: string
  issuer?: string
  tenant: string
}

interface ApiResponse {
  data: unknown[]
}

const props = defineProps<RecruitmentOpeningsProps>()

const loading = ref<boolean>(false)
const error = ref<string | null>(null)
const openings = ref<Opening[]>([])

// demo data so component works out of the box
const demoOpenings: Opening[] = [
  {
    id: 'demo-1',
    title: 'Frontend Engineer (Demo)',
    role: 'Engineer',
    location: 'Remote',
    type: 'Full-time',
    excerpt: 'Build delightful web experiences. Demo listing.',
    url: 'https://example.com/demo-1',
    rate: 21,
    currency: 'GBP',
  },
  {
    id: 'demo-2',
    title: 'Backend Engineer (Demo)',
    role: 'Engineer',
    location: 'Bengaluru, India',
    type: 'Full-time',
    excerpt: 'Work on APIs and infrastructure. Demo listing.',
    url: 'https://example.com/demo-2',
    rate: 27.5,
    currency: 'GBP',
  },
]

async function fetchOpeningsForTenant(tenant: string): Promise<void> {
  loading.value = true
  error.value = null
  openings.value = []

  try {
    if (!tenant) {
      await new Promise((r) => setTimeout(r, 300))
      openings.value = demoOpenings
      return
    }

    const url = `${props.apiUrl}/v1/public/${encodeURIComponent(tenant)}/openings?limit=10&offset=0`

    const res: Response = await fetch(url, {
      method: 'GET',
      credentials: 'omit',
      headers: {
        'Content-Type': 'application/json',
        'X-APPLICATION': 'logezy',
        'X-CLIENT-PLATFORM': 'web',
      },
    })

    if (!res.ok) {
      const text: string = await res.text()
      throw new Error(`${res.status} ${res.statusText} — ${text}`)
    }

    const data: ApiResponse = await res.json()

    if (!Array.isArray((data as any).data)) {
      throw new Error('Unexpected API response format (expected array)')
    }

    openings.value = (data as any).data.map((item: any, idx: number): Opening => ({
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
      url: item.url ?? item.applyUrl ?? '',
      rate: item.rate ?? item.hourlyRate ?? item.payRate ?? item.salary ?? undefined,
      hourlyRate: item.hourlyRate,
      salary: item.salary,
      payRate: item.payRate,
      currency: item.currency ?? item.payCurrency ?? 'GBP',
    }))
  } catch (err: any) {
    console.error('RecruitmentOpenings fetch error:', err)
    error.value = err && err.message ? err.message : String(err)
    openings.value = []
  } finally {
    loading.value = false
  }
}

// helpers
function displayRate(opening: Opening): string | '' {
  const amount =
    opening.rate ??
    opening.hourlyRate ??
    opening.salary ??
    opening.payRate ??
    null
  if (amount == null) return ''
  const currency = opening.currency || 'GBP'
  try {
    const fmt = new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency,
      maximumFractionDigits: 2,
    })
    return fmt.format(Number(amount))
  } catch {
    const symbol = currency === 'GBP' ? '£' : currency === 'USD' ? '$' : ''
    return `${symbol} ${Number(amount).toFixed(2)}`
  }
}

async function share(opening: Opening) {
  const url = opening.url || location.href
  const title = opening.title || 'Opening'
  const text = `${opening.title}${opening.location ? ' · ' + opening.location : ''}${opening.type ? ' · ' + opening.type : ''}`

  if (navigator.share) {
    try {
      await navigator.share({ title, text, url })
      return
    } catch {
      // user cancelled
    }
  }
  try {
    await navigator.clipboard.writeText(url)
  } catch {
    // noop
  }
}

onMounted(() => fetchOpeningsForTenant(props.tenant))
watch(
  () => props.tenant,
  (nv: string) => {
    fetchOpeningsForTenant(nv)
  }
)
</script>
