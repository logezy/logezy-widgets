<template>
  <div class="widget-root" part="root">
    <header class="header" part="header">
      <h3 class="title">Openings</h3>
      <small class="tenant"
        >Tenant: <strong>{{ tenant || "demo" }}</strong></small
      >
    </header>

    <main class="body" part="body">
      <div v-if="loading" class="status">Loading openings…</div>
      <div v-else-if="error" class="status error">Error: {{ error }}</div>

      <ul v-else class="list">
        <li v-if="jobs.length === 0" class="no-results">No openings found.</li>

        <li v-for="job in jobs" :key="job.id" class="job">
          <div class="job-row">
            <div class="job-title">{{ job.title }}</div>
            <div class="job-meta">
              <span class="location" v-if="job.location">{{
                job.location
              }}</span>
              <span class="type" v-if="job.type"> — {{ job.type }}</span>
            </div>
          </div>

          <p class="job-excerpt" v-if="job.excerpt">{{ job.excerpt }}</p>

          <a
            v-if="job.url"
            :href="job.url"
            target="_blank"
            rel="noopener noreferrer"
            class="apply"
          >
            View
          </a>
        </li>
      </ul>
    </main>

    <footer class="footer" part="footer">
      <small>Powered by <a href="https://www.logezy.com" target="_blank" rel="noopener noreferrer">Logezy</a></small>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

interface Job {
  id: string;
  title: string;
  location: string;
  type: string;
  excerpt: string;
  url: string;
}

interface RecruitmentOpeningsProps {
  apiUrl: string;
  issuer: string;
  tenant: string;
}

interface ApiResponse {
  data: any[]; // This will be further refined with Job type
}

const props = defineProps<RecruitmentOpeningsProps>()

const loading = ref<boolean>(false)
const error = ref<string | null>(null)
const jobs = ref<Job[]>([])

// demo data so component works out of the box
const demoJobs: Job[] = [
  {
    id: 'demo-1',
    title: 'Frontend Engineer (Demo)',
    location: 'Remote',
    type: 'Full-time',
    excerpt: 'Build delightful web experiences. Demo listing.',
    url: 'https://example.com/demo-1',
  },
  {
    id: 'demo-2',
    title: 'Backend Engineer (Demo)',
    location: 'Bengaluru, India',
    type: 'Full-time',
    excerpt: 'Work on APIs and infrastructure. Demo listing.',
    url: 'https://example.com/demo-2',
  },
]

async function fetchJobsForTenant(tenant: string): Promise<void> {
  loading.value = true
  error.value = null
  jobs.value = []

  try {
    if (!tenant) {
      await new Promise((r) => setTimeout(r, 300))
      jobs.value = demoJobs
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

   
    if (!Array.isArray(data.data)) {
      throw new Error('Unexpected API response format (expected array)')
    }

    jobs.value = data.data.map((item: any, idx: number): Job => ({
      id: item.id ?? item.jobId ?? `job-${idx}`,
      title: item.title ?? item.name ?? 'Untitled',
      location: item.location ?? item.city ?? '',
      type: item.type ?? item.employmentType ?? '',
      excerpt:
        item.excerpt ??
        item.summary ??
        item.description?.slice(0, 140) ??
        '',
      url: item.url ?? item.applyUrl ?? '',
    }))
  } catch (err: any) {
    console.error('RecruitmentOpenings fetch error:', err)
    error.value = err && err.message ? err.message : String(err)
    jobs.value = []
  } finally {
    loading.value = false
  }
}

onMounted(() => fetchJobsForTenant(props.tenant))
watch(
  () => props.tenant,
  (nv: string) => {
    fetchJobsForTenant(nv)
  }
)
</script>

<style scoped>
/* Scoped to shadow DOM by SFC custom element build — safe for host pages */
:host {
  display: block;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue",
    Arial;
  color: #111827;
}

.widget-root {
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(16, 24, 40, 0.04);
  padding: 12px;
  background: #fff;
  border: 1px solid rgba(16, 24, 40, 0.04);
  max-width: 420px;
}

.header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 8px;
}

.title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.tenant {
  color: #6b7280;
  font-size: 12px;
}

.body {
  min-height: 40px;
}

.status {
  color: #374151;
  font-size: 14px;
}

.status.error {
  color: #b91c1c;
}

.list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.job {
  padding: 10px 8px;
  border-top: 1px solid rgba(16, 24, 40, 0.03);
  display: flex;
  flex-direction: column;
}

.job:first-of-type {
  border-top: none;
}

.job-row {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  align-items: baseline;
}

.job-title {
  font-weight: 600;
  font-size: 14px;
}

.job-meta {
  font-size: 12px;
  color: #6b7280;
}

.job-excerpt {
  margin: 6px 0 0;
  font-size: 13px;
  color: #374151;
}

.apply {
  margin-top: 8px;
  font-size: 13px;
  text-decoration: none;
  align-self: flex-start;
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid rgba(16, 24, 40, 0.06);
  background: linear-gradient(180deg, #ffffff, #f8fafc);
  color: #0f172a;
}
.footer {
  margin-top: 10px;
  text-align: right;
  font-size: 11px;
  color: #9ca3af;
}
.no-results {
  padding: 10px 8px;
  color: #6b7280;
  font-size: 13px;
}
</style>
