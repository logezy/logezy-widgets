<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue";
import RecruitmentItemCard from "../components/RecruitmentItemCard.vue";
import RecruitmentItemDetail from "../components/RecruitmentItemDetail.vue";
import { useRecruitmentWidget } from "../composables/useRecruitmentWidget";

interface RecruitmentOpeningsProps {
  apiUrl: string;
  issuer?: string;
  tenant: string;
}

const props = defineProps<RecruitmentOpeningsProps>();

const {
  currentView,
  currentOpening,
  openings,
  loading,
  error,
  detailLoading,
  detailError,
  detailPageRefreshed,
  viewDetails,
  backToList,
  share,
  loadOpenings,
  hasMore,
} = useRecruitmentWidget(props.apiUrl, props.tenant, props.issuer);

const sentinel = ref(null);
let observer: IntersectionObserver | null = null;

onMounted(() => {
  console.log("hi");

  observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && hasMore.value && !loading.value) {
      loadOpenings();
    }
  });

  if (sentinel.value) {
    console.log(sentinel.value);

    observer.observe(sentinel.value);
  }

  loadOpenings(); // initial load
});

onUnmounted(() => {
  if (observer && sentinel.value) {
    observer.unobserve(sentinel.value);
  }
});

watch(detailPageRefreshed, (detailPageRefreshed) => {
  console.log("works");
  if (detailPageRefreshed && sentinel.value) {
    console.log("worked");

    observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasMore.value && !loading.value) {
        loadOpenings();
      }
    });

    observer.observe(sentinel.value);
  }
});
</script>

<template>
  <div
    part="root"
    class="w-full rounded-2xl border border-gray-200/80 bg-white/90 shadow-lg backdrop-blur-sm p-4 md:p-6"
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
          <svg
            class="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>

        <h3 class="m-0 text-xl font-semibold tracking-tight text-gray-900">
          <span v-if="currentView === 'list'">Openings</span>
          <span
            v-else-if="currentOpening"
            class="truncate max-w-xs sm:max-w-sm"
          >
            {{ currentOpening.title }}
          </span>
        </h3>
      </div>
    </header>

    <!-- Body -->
    <main part="body" class="min-h-10">
      <!-- List View -->
      <div
        v-if="currentView === 'list'"
        data-testid="openings-list"
        tabindex="-1"
      >
        <!-- Error -->
        <div
          v-if="error"
          class="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
          role="alert"
        >
          <span class="font-medium">Error:</span> {{ error }}
        </div>

        <!-- List -->

        <!-- Opening cards -->
        <div
          v-if="currentView === 'list'"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8"
        >
          <RecruitmentItemCard
            v-for="opening in openings"
            :key="opening.id"
            :opening="opening"
            @view-details="viewDetails(opening)"
            @share="share(opening)"
          />
        </div>
        <div
          ref="sentinel"
          class="flex justify-center py-4"
          style="margin-block-start: 30vh"
        >
          <div v-if="loading" role="status">
            <svg
              aria-hidden="true"
              class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        </div>
      </div>

      <!-- Detail View -->
      <div
        v-else-if="currentView === 'detail' && currentOpening"
        data-testid="opening-detail"
        tabindex="-1"
        class="focus:outline-none"
      >
        <!-- Loading state -->
        <div
          v-if="detailLoading"
          class="space-y-4"
          role="status"
          aria-label="Loading job details"
        >
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
        </div>

        <!-- Detail content -->
        <RecruitmentItemDetail
          v-else
          :opening="currentOpening"
          @share="share(currentOpening)"
          @back-to-list="backToList"
        />

        <div class="pt-4 ml-auto">
          <button
            type="button"
            style="cursor: pointer"
            class="text-blue-600 hover:text-blue-800 text-md"
            @click="backToList"
          >
            ← Back to listings
          </button>
        </div>
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
          >Logezy</a
        >
      </small>
    </footer>
  </div>
</template>
