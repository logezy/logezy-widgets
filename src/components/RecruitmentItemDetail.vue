<template>
  <!-- Header section -->
  <header class="space-y-4">
    <!-- Pay badge -->
    <div v-if="displayRate" class="flex justify-end">
      <div
        class="rounded-md bg-gray-100 px-3 py-1 text-sm font-semibold text-slate-800"
        :aria-label="`Rate ${displayRate}`"
      >
        {{ displayRate }}
      </div>
    </div>

    <!-- Title -->
    <h1 :id="`detail-title-${opening.id}`" class="text-2xl font-bold text-slate-900">
      {{ opening.title }}
    </h1>

    <!-- Meta information -->
    <div class="flex flex-wrap gap-4 text-sm text-gray-600">
      <div v-if="opening.role || opening.department" class="flex items-center gap-2">
        <svg class="h-4 w-4 text-gray-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20 7h-4V6a4 4 0 10-8 0v1H4a2 2 0 00-2 2v8a3 3 0 003 3h14a3 3 0 003-3V9a2 2 0 00-2-2zM10 6a2 2 0 114 0v1h-4V6z"/>
        </svg>
        <span>{{ opening.role || opening.department }}</span>
      </div>

      <div v-if="opening.location" class="flex items-center gap-2">
        <svg class="h-4 w-4 text-gray-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"/>
        </svg>
        <span class="capitalize">{{ opening.location }}</span>
      </div>

      <div v-if="opening.type" class="flex items-center">
        <span class="inline-flex items-center rounded-md bg-slate-200/70 px-2.5 py-1 text-xs font-semibold text-slate-800">
          {{ opening.type.replace('_', ' ') }}
        </span>
      </div>
    </div>
  </header>

  <!-- Description -->
  <section v-if="opening.description || opening.excerpt" class="prose prose-sm max-w-none">
    <h2 class="sr-only">Job Description</h2>
    <div class="text-gray-700 leading-relaxed whitespace-pre-wrap">
      {{ opening.description || opening.excerpt }}
    </div>
  </section>

  <!-- Actions -->
  <footer class="flex flex-wrap items-center gap-3 pt-4 border-t border-gray-200">
    <a
      v-if="opening.url"
      :href="opening.url"
      target="_blank"
      rel="noopener noreferrer"
      class="inline-flex items-center justify-center rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500"
    >
      Apply for this position
      <svg class="ml-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path d="M7 17L17 7M17 7H7M17 7V17" />
      </svg>
    </a>

    <button
      type="button"
      class="inline-flex items-center justify-center rounded-lg bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
      @click="onShare"
    >
      Share
    </button>

    <button
      type="button"
      class="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500"
      @click="onBackToList"
    >
      <svg class="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
      Back to listings
    </button>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Opening } from '../types/recruitment'

interface Props {
  opening: Opening
  onShare: () => void
  onBackToList: () => void
}

const props = defineProps<Props>()

const displayRate = computed((): string => {
  const amount =
    props.opening.rate ??
    props.opening.hourlyRate ??
    props.opening.salary ??
    props.opening.payRate ??
    null
  
  if (amount == null) return ''
  
  const currency = props.opening.currency || 'GBP'
  
  try {
    const fmt = new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency,
      maximumFractionDigits: 2,
    })
    return fmt.format(Number(amount))
  } catch {
    const symbol = currency === 'GBP' ? '£' : currency === 'USD' ? '$' : ''
    return `${symbol}${Number(amount).toFixed(2)}`
  }
})
</script>

<style scoped>
.prose h2 {
  @apply text-lg font-semibold text-gray-900 mb-3;
}

.prose p {
  @apply mb-4;
}

.prose ul, .prose ol {
  @apply ml-4 mb-4;
}

.prose li {
  @apply mb-1;
}
</style>