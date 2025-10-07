<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import RecruitmentItemCard from '../components/RecruitmentItemCard.vue'
import RecruitmentItemDetail from '../components/RecruitmentItemDetail.vue'
import { useRecruitmentWidget } from '../composables/useRecruitmentWidget'

interface RecruitmentOpeningsProps {
  issuerUrl: string;
  apiUrl: string;
  tenantSlug: string;
}

const props = defineProps<RecruitmentOpeningsProps>()

const {
  currentView,
  currentOpening,
  openings,
  loading,
  error,
  detailError,
  viewDetails,
  backToOpenings,
  share,
  loadOpenings,
  hasMore,
} = useRecruitmentWidget(props.issuerUrl, props.apiUrl, props.tenantSlug)

const sentinel = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

onMounted(() => {

  observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && hasMore.value && !loading.value) {
      loadOpenings()
    }
  })

  if (sentinel.value) {
    observer.observe(sentinel.value)
  }

  loadOpenings()
})

watch(sentinel, (newSentinel, oldSentinel) => {
  if (observer) {
    if (oldSentinel) {
      observer.unobserve(oldSentinel)
    }

    if (newSentinel) {
      observer.observe(newSentinel)
    }
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<template>
  <div part="root"
    class="w-full rounded-2xl border border-gray-200/80 bg-white/90 p-4 shadow-lg backdrop-blur-sm md:p-6">
    <!-- Header -->
    <header part="header" class="mb-4 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <!-- Back button for detail view -->
        <button v-if="currentView === 'detail'" type="button"
          class="inline-flex items-center justify-center rounded-lg p-2 text-gray-600 transition hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 cursor-pointer"
          @click="backToOpenings" aria-label="Back to job listings">
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            aria-hidden="true">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>

        <h3 class="m-0 text-xl font-semibold tracking-tight text-gray-900">
          <span v-if="currentView === 'list'">Openings</span>
          <span v-else-if="currentOpening" class="max-w-xs truncate sm:max-w-sm">
            {{ currentOpening.title }}
          </span>
        </h3>
      </div>
    </header>

    <!-- Body -->
    <main part="body" class="min-h-10">
      <!-- List View -->
      <div v-if="currentView === 'list'" data-testid="openings-list" tabindex="-1">
        <!-- Error -->
        <div v-if="error" class="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
          role="alert">
          <span class="font-medium">Error:</span> {{ error }}
        </div>

        <!-- Openings Grid -->
        <div class="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <RecruitmentItemCard v-for="opening in openings" :key="opening.id" :opening="opening"
            @view-details="viewDetails(opening)" @share="share(opening)" />

          <!-- Show Skeleton while loading -->
          <div v-if="loading" v-for="n in 2" :key="n"
            class="flex flex-col justify-between rounded-2xl bg-gray-50 border p-6 shadow-md animate-pulse">
            <div class="flex-grow">
              <!-- Header: Title + Rate -->
              <div class="flex items-start justify-between">
                <div class="pr-4">
                  <div class="h-5 w-40 mb-2 bg-gray-300 rounded"></div>
                  <div class="h-4 w-32 bg-gray-200 rounded"></div>
                </div>
                <div class="h-6 w-24 bg-green-100 rounded"></div>
              </div>

              <!-- Address -->
              <div class="h-4 w-48 mt-6 bg-gray-200 rounded"></div>

              <!-- Short Description -->
              <div class="space-y-2 mt-4">
                <div class="h-3 w-full bg-gray-200 rounded"></div>
                <div class="h-3 w-5/6 bg-gray-200 rounded"></div>
                <div class="h-3 w-3/4 bg-gray-200 rounded"></div>
              </div>
            </div>

            <!-- Buttons -->
            <div class="mt-6 grid grid-cols-2 gap-4">
              <div class="h-10 bg-indigo-400 rounded-md"></div>
              <div class="h-10 bg-gray-100 border border-indigo-200 rounded-md"></div>
            </div>
          </div>
        </div>

        <!-- Sentinel for infinite scroll -->
        <span ref="sentinel" class="block h-px w-full"></span>

      </div>

      <!-- Detail View -->
      <div v-else-if="currentView === 'detail' && currentOpening" data-testid="opening-detail" tabindex="-1"
        class="focus:outline-none">

        <!-- Loading state -->
        <div v-if="loading" class="flex flex-col lg:flex-row gap-6">
          <!-- Left: Job Description -->
          <div class="w-full lg:w-2/3 bg-[#F6F9FF] rounded-2xl p-8 animate-pulse">
            <!-- Title -->
            <div class="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>

            <!-- Content lines -->
            <div class="space-y-3">
              <div class="h-3 bg-gray-200 rounded w-3/4"></div>
              <div class="h-3 bg-gray-200 rounded w-5/6"></div>
              <div class="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>

            <!-- Subheading -->
            <div class="h-4 bg-gray-300 rounded w-1/4 mt-8 mb-4"></div>

            <!-- Requirements text -->
            <div class="space-y-3">
              <div class="h-3 bg-gray-200 rounded w-5/6"></div>
              <div class="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>

          <!-- Right: Overview Card -->
          <div class="w-full lg:w-1/3 bg-[#F9FAFB] rounded-2xl p-8 animate-pulse">
            <!-- Overview heading -->
            <div class="h-5 bg-gray-300 rounded w-1/3 mb-6"></div>

            <!-- Job details -->
            <div class="space-y-4 mb-6">
              <div class="flex justify-between">
                <div class="h-3 bg-gray-200 rounded w-1/3"></div>
                <div class="h-3 bg-gray-200 rounded w-1/4"></div>
              </div>
              <div class="flex justify-between">
                <div class="h-3 bg-gray-200 rounded w-1/3"></div>
                <div class="h-3 bg-gray-200 rounded w-1/4"></div>
              </div>
              <div class="flex justify-between">
                <div class="h-3 bg-gray-200 rounded w-1/3"></div>
                <div class="h-3 bg-gray-200 rounded w-1/4"></div>
              </div>
              <div class="flex justify-between">
                <div class="h-3 bg-gray-200 rounded w-1/3"></div>
                <div class="h-3 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>

            <!-- Apply Button -->
            <div class="h-12 bg-[#4F46E5] opacity-40 rounded-lg w-full mb-4"></div>

            <!-- Share Link -->
            <div class="h-12 bg-white opacity-30 rounded-lg w-full mx-auto"></div>
          </div>
        </div>

        <!-- Error state -->
        <div v-else-if="detailError" class="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
          role="alert">
          <span class="font-medium">Error:</span> {{ detailError }}
        </div>

        <!-- Detail content -->
        <RecruitmentItemDetail v-else :opening="currentOpening" @share="share(currentOpening)"
          @back-to-list="backToOpenings" />

        <div class="pt-4 ml-auto">
          <button type="button" class="text-md text-blue-600 hover:text-blue-800 cursor-pointer"
            @click="backToOpenings">
            ← Back to openings
          </button>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer part="footer" class="mt-4 text-right text-[11px] text-gray-400">
      <small>
        Powered by
        <a href="https://www.logezy.com" target="_blank" rel="noopener noreferrer"
          class="font-medium text-gray-500 underline decoration-dotted underline-offset-2 hover:text-gray-700 hover:decoration-solid focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-1 rounded">Logezy</a>
      </small>
    </footer>
  </div>
</template>
