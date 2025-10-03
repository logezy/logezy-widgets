import { computed } from 'vue'
import type { Opening } from '../types/recruitment'

export function useRate(opening: Opening) {
  const displayRate = computed((): string => {
    const amount =
      opening.rate ??
      opening.hourlyRate ??
      opening.salary ??
      opening.payRate ??
      null

    if (amount == null) {
      return ''
    }

    return `£${Number(amount).toFixed(2)}`
  })

  return {
    displayRate,
  }
}
