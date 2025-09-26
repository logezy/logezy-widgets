<template>
  <div
    part="root"
    class="w-full max-w-2xl rounded-2xl border border-gray-200/80 bg-white/90 shadow-lg backdrop-blur-sm p-4 md:p-6"
  >
    <!-- Header -->
    <header part="header" class="mb-4 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <!-- Back button for detail view -->
        <button
          v-if="currentView === 'detail'"
          type="button"
          class="inline-flex items-center justify-center rounded-lg p-2 text-gray-600 transition hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500"
          @click="backToList"
          aria-label="Back to job listings"
        >
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        
        <h3 class="m-0 text-xl font-semibold tracking-tight text-gray-900">
          <span v-if="currentView === 'list'">Openings</span>
          <span v-else-if="currentOpening" class="truncate max-w-xs sm:max-w-sm">
            {{ currentOpening.title }}
          </span>
        </h3>
      </div>
      
      <small class="text-[11px] font-medium text-gray-500">
        Tenant:
        <strong class="text-gray-800">{{ tenant || 'demo' }}</strong>
      </small>
    </header>

    <!-- Body -->
    <main part="body" class="min-h-10">
      <!-- List View -->
      <div v-if="currentView === 'list'" data-testid="openings-list" tabindex="-1">
        <!-- Loading -->
        <div v-if="loading" class="space-y-4" role="status" aria-label="Loading job openings">
          <div v-for="i in 2" :key="i" class="animate-pulse rounded-[22px] border border-gray-200/70 bg-white p-5 shadow-md" aria-hidden="true">
            <div class="h-5 w-40 rounded bg-gray-200/80"></div>
            <div class="mt-3 h-3 w-3/4 rounded bg-gray-200/80"></div>
            <div class="mt-2 h-3 w-2/3 rounded bg-gray-200/80"></div>
            <div class="mt-4 h-8 w-28 rounded bg-gray-200/80"></div>
          </div>
        </div>

        <!-- Error -->
        <div
          v-else-if="error"
          class="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
          role="alert"
        >
          <span class="font-medium">Error:</span> {{ error }}
        </div>

        <!-- List -->
        <ul v-else class="grid gap-4 sm:gap-5" role="list">
          <!-- Empty -->
          <li v-if="openings.length === 0" class="py-3 text-center text-xs text-gray-500" role="listitem">
            No openings found.
          </li>

          <!-- Opening cards -->
          <li v-for="opening in openings" :key="opening.id" role="listitem">
            <RecruitmentItemCard
              :opening="opening"
              @view-details="viewDetails(opening)"
              @share="share(opening)"
            />
          </li>
        </ul>
      </div>

      <!-- Detail View -->
      <div
        v-else-if="currentView === 'detail' && currentOpening"
        data-testid="opening-detail" 
        tabindex="-1"
        class="focus:outline-none"
      >
        <!-- Loading state -->
        <div v-if="detailLoading" class="space-y-4" role="status" aria-label="Loading job details">
          <div class="animate-pulse">
            <div class="h-8 w-3/4 rounded bg-gray-200/80"></div>
            <div class="mt-4 space-y-2">
              <div class="h-4 w-full rounded bg-gray-200/80"></div>
              <div class="h-4 w-5/6 rounded bg-gray-200/80"></div>
              <div class="h-4 w-4/5 rounded bg-gray-200/80"></div>
            </div>
            <div class="mt-6 h-10 w-32 rounded bg-gray-200/80"></div>
          </div>
        </div>

        <!-- Error state -->
        <div
          v-else-if="detailError"
          class="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
          role="alert"
        >
          <span class="font-medium">Error:</span> {{ detailError }}
          <button
            type="button"
            class="ml-3 text-red-600 underline hover:text-red-800"
            @click="backToList"
          >
            Back to listings
          </button>
        </div>

        <!-- Detail content -->
        <RecruitmentItemDetail
          v-else
          :opening="currentOpening"
          @share="share(currentOpening)"
          @back-to-list="backToList"
        />
      </div>
    </main>

    <!-- Footer -->
    <footer part="footer" class="mt-4 text-right text-[11px] text-gray-400">
      <small>
        Powered by
        <a
          href="https://www.logezy.com"
          target="_blank"
          rel="noopener noreferrer"
          class="font-medium text-gray-500 underline decoration-dotted underline-offset-2 hover:text-gray-700 hover:decoration-solid focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-1 rounded"
        >Logezy</a>
      </small>
    </footer>
  </div>
</template>

<script setup lang="ts">
import RecruitmentItemCard from '../components/RecruitmentItemCard.vue'
import RecruitmentItemDetail from '../components/RecruitmentItemDetail.vue'
import { useRecruitmentWidget } from '../composables/useRecruitmentWidget'

interface RecruitmentOpeningsProps {
  apiUrl: string
  issuer?: string
  tenant: string
}

const props = defineProps<RecruitmentOpeningsProps>()

const {
  currentView,
  currentOpening,
  openings,
  loading,
  error,
  detailLoading,
  detailError,
  viewDetails,
  backToList,
  share,
} = useRecruitmentWidget(props.apiUrl, props.tenant)
</script>