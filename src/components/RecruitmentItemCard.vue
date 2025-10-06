<script setup lang="ts">
import type { Opening } from '../types/recruitment'
import { stripHtmlTags } from '../helpers/recruitment.helper'
import { useRate } from '../composables/useRate'

const props = defineProps<{
  opening: Opening;
}>()

const emit = defineEmits<{
  'view-details': [opening: Opening]
  'share': [opening: Opening]
}>()

const { displayRate } = useRate(props.opening)
</script>

<template>
  <div
    class="flex flex-col justify-between rounded-2xl border p-6 shadow-md transition-shadow duration-300 hover:shadow-lg"
    :style="{
      backgroundColor: `${opening.color}10`,
      borderColor: opening.color,
    }">
    <div class="flex-grow">
      <div class="flex items-start justify-between">
        <div class="pr-4">
          <h3 class="text-xl font-semibold text-gray-900">
            {{ opening.title }}
          </h3>
          <p class="capitalize mt-1 text-sm text-gray-500">
            {{ opening.job || opening.department }} ·
            {{ opening.type?.replace("_", " ") }}
          </p>
        </div>
        <div v-if="displayRate" class="text-right">
          <span class="inline-block rounded-md bg-green-100 px-2 py-1 capitalize font-bold text-green-700">
            {{ displayRate }}/{{ opening.timeSpan }}
          </span>
        </div>
      </div>
      <p v-if="opening.location" class="mt-4 capitalize text-base text-gray-600">
        {{ opening.location }}
      </p>
      <p v-if="opening.excerpt" class="mt-3 text-sm text-gray-700 line-clamp-3">
        {{ stripHtmlTags(opening.excerpt) }}
      </p>
    </div>
    <div class="mt-6 grid grid-cols-2 gap-4">
      <button type="button"
        class="inline-flex h-10 items-center justify-center rounded-md bg-indigo-600 px-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
        @click="emit('view-details', opening)">
        Details
      </button>
      <button type="button"
        class="inline-flex h-10 items-center justify-center rounded-md border border-indigo-200 bg-white px-4 text-sm font-medium text-indigo-600 shadow-sm transition-colors hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
        @click="emit('share', opening)">
        Share
      </button>
    </div>
  </div>
</template>
