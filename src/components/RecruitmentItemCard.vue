<template>
  <article
    class="relative rounded-[22px] border border-gray-200/70 bg-white p-5 shadow-md transition-shadow hover:shadow-lg focus-within:ring-2 focus-within:ring-slate-500 focus-within:ring-offset-2"
    :aria-labelledby="`opening-title-${opening.id}`"
  >
    <!-- Top-right pay badge -->
    <div
      v-if="displayRate"
      class="absolute right-4 top-4 rounded-md bg-gray-100 px-3 py-1 text-sm font-semibold text-slate-800"
      :aria-label="`Rate ${displayRate}`"
    >
      {{ displayRate }}
    </div>

    <!-- Title -->
    <h3 :id="`opening-title-${opening.id}`" class="text-xl font-semibold text-slate-900">
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
      <button
        type="button"
        class="inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500"
        @click="onViewDetails"
        :aria-describedby="`opening-title-${opening.id}`"
      >
        View Details
      </button>

      <a
        v-if="opening.url"
        :href="opening.url"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500"
        :aria-describedby="`opening-title-${opening.id}`"
      >
        Apply
        <svg class="ml-1 h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M7 17L17 7M17 7H7M17 7V17" />
        </svg>
      </a>

      <button
        type="button"
        class="inline-flex items-center justify-center rounded-lg bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
        @click="onShare"
        :aria-describedby="`opening-title-${opening.id}`"
      >
        Share
      </button>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Opening } from '../types/recruitment'

interface Props {
  opening: Opening
  onViewDetails: () => void
  onShare: () => void
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