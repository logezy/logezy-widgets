import { ref, computed, nextTick, onMounted, watch, onUnmounted } from 'vue'
import type { Opening, ViewState } from '../types/recruitment'
import {
  fetchRecruitmentOpenings,
  fetchRecruitmentOpeningDetail,
} from '../services/recruitmentService'

const offset = ref(0)
const hasMore = ref(true)


export function useRecruitmentWidget(
  issuer: string,
  apiUrl: string,
  tenant: string
) {
  const currentView = ref<ViewState>('list')
  const currentOpening = ref<Opening | null>(null)
  const openings = ref<Opening[]>([])
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)
  const detailLoading = ref<boolean>(false)
  const detailError = ref<string | null>(null)
  const scrollPosition = ref<number>(0)
  const detailPageRefreshed = ref<boolean>(false)

  const currentOpeningId = computed(() => {
    if (typeof window === 'object') {
      const hash = window.location.hash
      const match = hash.match(/#opening=(.+)/)
      return match ? decodeURIComponent(match[1]) : null
    }

    return null
  })

  const saveScrollPosition = (): void => {
    scrollPosition.value = window.scrollY || document.documentElement.scrollTop
  }

  const restoreScrollPosition = (): void => {
    nextTick(() => {
      window.scrollTo(0, scrollPosition.value)
    })
  }

  const updateHash = (openingId?: string): void => {
    if (typeof window === 'object') {
      const hashed = openingId ? `#opening=${encodeURIComponent(openingId)}` : ''

      if (window.location.hash === hashed) {
        return
      }

      window.history.pushState(null, '', hashed || window.location.pathname)
    }
  }

  const loadOpenings = async (): Promise<void> => {
    if (loading.value) {
      return
    }

    if (hasMore.value === false) {
      return
    }

    loading.value = true
    error.value = null

    try {
      const items = await fetchRecruitmentOpenings(
        apiUrl,
        tenant,
        offset.value
      )

      if (items.length === 0) {
        hasMore.value = false
      } else {
        openings.value.push(...items)
        offset.value += items.length
      }
    } catch (err: any) {
      console.error('RecruitmentOpenings fetch error:', err)
      error.value = err?.message ?? String(err)
    } finally {
      loading.value = false
    }
  }

  const loadOpeningDetail = async (id: string): Promise<Opening | null> => {
    detailLoading.value = true
    detailError.value = null

    try {
      const item = await fetchRecruitmentOpeningDetail(
        issuer,
        apiUrl,
        tenant,
        id
      )

      return item
    } catch (err: any) {
      detailError.value = err?.message ?? 'Failed to load opening details'
      return null
    } finally {
      detailLoading.value = false
    }
  }

  const viewDetails = async (opening: Opening): Promise<void> => {
    saveScrollPosition()

    const detailedOpening = await loadOpeningDetail(opening.id)
    if (detailedOpening) {
      currentOpening.value = detailedOpening
      currentView.value = 'detail'
      updateHash(opening.id)

      nextTick(() => {
        const detailElement = document.querySelector(
          '[data-testid="opening-detail"]'
        ) as HTMLElement

        if (detailElement) {
          detailElement.focus()
        }
      })
    }
  }

  const backToOpenings = (): void => {
    currentView.value = 'list'
    currentOpening.value = null
    updateHash()
    restoreScrollPosition()

    nextTick(() => {
      const listElement = document.querySelector('[data-testid="openings-list"]') as HTMLElement

      if (listElement) {
        listElement.focus()
      }
    })
  }

  const share = async (opening: Opening): Promise<void> => {
    const url = opening.url || `${window.location.origin}${window.location.pathname}#opening=${encodeURIComponent(opening.id)}`
    const title = opening.title || 'Opening'
    const text = `${opening.title}${opening.location ? ' · ' + opening.location : ''}${opening.type ? ' · ' + opening.type : ''}`

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url })
        return
      } catch {
        // User cancelled or share not supported
      }
    }

    try {
      await navigator.clipboard.writeText(url)
    } catch {
      // Clipboard not supported
    }
  }

  const handleDeepLink = async (): Promise<void> => {
    const openingId = currentOpeningId.value

    if (!openingId) return

    let opening = openings.value.find((o) => o.id === openingId)

    if (!opening) {
      const fetchedOpening = await loadOpeningDetail(openingId)

      if (fetchedOpening) {
        opening = fetchedOpening
      }
    }

    if (opening) {
      currentOpening.value = opening
      currentView.value = 'detail'

      nextTick(() => {
        const detailElement = document.querySelector(
          '[data-testid="opening-detail"]'
        ) as HTMLElement
        if (detailElement) {
          detailElement.focus()
        }
      })
    }
  }

  const handlePopState = (): void => {
    const openingId = currentOpeningId.value

    if (openingId && currentView.value === 'list') {
      const opening = openings.value.find((o) => o.id === openingId)

      if (opening) {
        viewDetails(opening)
      }
    } else if (!openingId && currentView.value === 'detail') {
      backToOpenings()
    }
  }

  onMounted(async () => {
    const openingId = currentOpeningId.value

    if (openingId) {
      await handleDeepLink()
    }

    if (typeof window === 'object') {
      window.addEventListener('popstate', handlePopState)
    }
  })

  onUnmounted(() => {
    if (typeof window === 'object') {
      window.removeEventListener('popstate', handlePopState)
    }
  })

  watch(
    () => tenant,
    () => {
      openings.value = []
      offset.value = 0
      hasMore.value = true
      currentView.value = 'list'
      currentOpening.value = null
      updateHash()
      loadOpenings()
    }
  )

  return {
    currentView,
    currentOpening,
    openings,
    loading,
    error,
    detailLoading,
    detailError,
    detailPageRefreshed,
    viewDetails,
    backToOpenings,
    share,
    handlePopState,
    loadOpenings,
    hasMore,
  }
}
