<script setup lang="ts">
import type { Opening } from '../types/recruitment'
import { stripHtmlTags } from '../helpers/recruitment.helper'
import { useRate } from '../composables/useRate'

const props = defineProps<{
  opening: Opening
}>()

const emit = defineEmits<{
  share: [opening: Opening]
  'back-to-list': []
}>()

const { displayRate } = useRate(props.opening)

const applyUrl = props.opening.url ? `${props.opening.url}?id=${props.opening.id}` : ''
</script>

<template>
  <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
    <!-- Main Content -->
    <div class="rounded-2xl p-8 shadow-sm border lg:col-span-2" :style="{
      backgroundColor: `${opening.color}10`,
      borderColor: opening.color,
    }">
      <h2 class="text-3xl font-bold text-gray-900">{{ opening.title }}</h2>

      <div v-if="opening.description" class="mt-6 text-gray-700 leading-relaxed">
        <p>{{ stripHtmlTags(opening.description) }}</p>
      </div>

      <div v-if="opening.requirement" class="mt-8">
        <h4 class="text-lg font-semibold text-gray-900">Requirements</h4>
        <p class="mt-2 text-gray-700 leading-relaxed">
          {{ stripHtmlTags(opening.requirement) }}
        </p>
      </div>
    </div>

    <!-- Sidebar -->
    <aside class="lg:col-span-1">
      <div class="rounded-2xl bg-gray-50 p-6 shadow-sm lg:sticky lg:top-6">
        <h3 class="text-lg font-semibold text-gray-900">Overview</h3>

        <dl class="mt-4 space-y-3">
          <div class="flex justify-between">
            <dt class="text-sm text-gray-500">Job Type</dt>
            <dd class="text-sm font-medium text-gray-800 capitalize">{{ opening.type.replace('_', ' ') }}</dd>
          </div>
          <div class="flex justify-between">
            <dt class="text-sm text-gray-500">Rate</dt>
            <dd class="text-sm font-semibold text-green-600">{{ displayRate }}/{{ opening.timeSpan }}</dd>
          </div>
          <div class="flex justify-between">
            <dt class="text-sm text-gray-500">Job Role</dt>
            <dd class="text-sm font-medium text-gray-800">{{ opening.job }}</dd>
          </div>
          <div class="flex justify-between">
            <dt class="text-sm text-gray-500">Location</dt>
            <dd class="text-sm font-medium text-gray-800">{{ opening.location }}</dd>
          </div>
        </dl>

        <!-- Actions -->
        <div class="mt-6 flex flex-col gap-3">
          <a v-if="opening.url" :href="applyUrl" target="_blank" rel="noopener noreferrer"
            class="inline-flex h-11 items-center justify-center rounded-md bg-indigo-600 px-6 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer">
            Apply Now
          </a>

          <button type="button"
            class="inline-flex h-11 items-center justify-center rounded-md border border-indigo-200 bg-white px-6 text-sm font-medium text-indigo-600 shadow-sm hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
            @click="emit('share', opening)">
            Share
          </button>
        </div>
      </div>
    </aside>
  </div>
</template>
