<script setup lang="ts">
import { computed } from "vue";
import type { Opening } from "../types/recruitment";
import { stripHtmlTags } from "../helpers/recruitment.helper";

interface Props {
  opening: Opening;
  onShare: () => void;
  onBackToList: () => void;
}

const props = defineProps<Props>();
const applyUrl = props.opening.url
  ? `${props.opening.url}?id=${props.opening.id}`
  : "";

const displayRate = computed((): string => {
  const amount =
    props.opening.rate ??
    props.opening.hourlyRate ??
    props.opening.salary ??
    props.opening.payRate ??
    null;

  if (amount == null) return "";

  const currency = props.opening.currency || "GBP";

  try {
    const fmt = new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    });
    return fmt.format(Number(amount));
  } catch {
    const symbol = currency === "GBP" ? "£" : currency === "USD" ? "$" : "";
    return `${symbol}${Number(amount).toFixed(2)}`;
  }
});
</script>
<template>
  <main class="mx-auto px-3 grid grid-cols-12 gap-8">
    <!-- Left Card: Description & Requirements -->
    <div
      class="col-span-12 lg:col-span-10 bg-white rounded-lg border-2 border-dashed p-6 transition"
      :style="{
        backgroundColor: `${opening.color}10`,
        borderColor: opening.color,
      }"
    >
      <!-- Title -->
      <h2
        :id="`detail-title-${opening.id}`"
        class="text-lg font-semibold text-gray-800 mb-4"
      >
        {{ opening.title }}
      </h2>

      <!-- Description -->
      <div v-if="opening.description" class="mb-4">
        <p class="font-medium text-gray-700">Description:</p>
        <p class="text-gray-600 whitespace-pre-wrap">
          {{ stripHtmlTags(opening.description) }}
        </p>
      </div>

      <!-- Requirements -->
      <div v-if="opening.requirement">
        <p class="font-medium text-gray-700">Requirement:</p>
        <p class="text-gray-600 whitespace-pre-wrap">
          {{ stripHtmlTags(opening.requirement) }}
        </p>
      </div>
    </div>

    <!-- Right Card: Overview & Actions -->
    <div
      class="col-span-12 lg:col-span-2 bg-blue-50 rounded-lg border-2 border-dashed p-6 transition h-[300px]"
      :style="{
        backgroundColor: `${opening.color}10`,
        borderColor: opening.color,
      }"
    >
      <h3 class="text-lg font-semibold text-gray-800 mb-4">Overview</h3>

      <p v-if="opening.type" class="text-sm text-gray-500 mb-1">
        {{ opening.type.replace("_", " ") }}
      </p>

      <p v-if="displayRate" class="text-green-600 font-semibold mb-4">
        {{ displayRate }}/{{ opening.timeSpan }}
      </p>

      <p v-if="opening.role" class="text-gray-700">
        <span class="font-medium">Role:</span> {{ opening.role }}
      </p>

      <p v-if="opening.location" class="text-gray-700 mt-1">
        <span class="font-medium">Location:</span> {{ opening.location }}
      </p>

      <!-- Buttons -->
      <div class="flex space-x-3 mt-6">
        <a
          v-if="opening.url"
          :href="applyUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-block px-4 py-2 text-sm font-medium bg-blue-400 text-white rounded-md hover:bg-blue-600 transition"
        >
          Apply
        </a>

        <button
          type="button"
          class="inline-block px-4 py-2 text-sm font-medium bg-green-400 text-white rounded-md transition"
          @click="onShare"
          style="cursor: pointer"
        >
          Share
        </button>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
