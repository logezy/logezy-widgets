<script setup lang="ts">
import { computed, ref } from "vue";
import type { Opening } from "../types/recruitment";
import { stripHtmlTags } from "../helpers/recruitment.helper";
// import { fetchRecruitmentOpenings } from "@/services/recruitmentService";

interface Props {
  opening: Opening;
  onViewDetails: () => void;
  onShare: () => void;
}

const props = defineProps<Props>();

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
  <div
    class="rounded-lg border-2 border-dashed p-6 transition hover:border-opacity-80"
    :style="{
      backgroundColor: `${opening.color}10`,
      borderColor: opening.color,
    }"
    :aria-labelledby="`opening-title-${opening.id}`"
  >
    <!-- Title -->
    <div class="flex justify-between items-center flex-wrap gap-2">
      <!-- Title on the left -->
      <h3
        :id="`opening-title-${opening.id}`"
        class="text-lg font-semibold text-gray-800"
      >
        {{ opening.title }}
      </h3>

      <!-- Rate on the right -->
      <p v-if="displayRate" class="text-green-600 font-semibold text-lg">
        {{ displayRate }}/{{ opening.timeSpan }}
      </p>
    </div>

    <!-- Meta Info -->
    <p class="text-sm text-gray-500 capitalize mb-3">
      Role: {{ opening.role || opening.department }} | Job Type:
      {{ opening.type?.replace("_", " ") }}
    </p>

    <!-- Pay Rate -->

    <p v-if="opening.location" class="text-gray-700 mt-1 truncate w-full">
      <span class="font-medium">Location:</span> {{ opening.location }}
    </p>

    <!-- Description -->
    <p v-if="opening.excerpt" class="text-gray-600 mb-4 truncate w-full">
      <span class="font-medium">Description:</span>
      {{ stripHtmlTags(opening.excerpt) }}
    </p>

    <!-- Actions -->
    <div class="flex flex-wrap items-center gap-3">
      <button
        style="background-color: #60a5fa; cursor: pointer"
        type="button"
        class="inline-block px-4 py-2 text-sm font-medium text-white rounded-md transition"
        @click="onViewDetails"
      >
        Details
      </button>

      <button
        type="button"
        style="background-color: #4ade80; cursor: pointer"
        class="inline-block px-4 py-2 text-sm font-medium text-white rounded-md transition"
        @click="onShare"
      >
        Share
      </button>
    </div>
  </div>
</template>
