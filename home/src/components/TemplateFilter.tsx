'use client'

import { createContext, useCallback, useContext, useRef, useState } from 'react'
import Link from 'next/link'
import clsx from 'clsx'

const TOTAL_PREMIUM_TEMPLATES = 16

type FilterType = 'all' | 'premium' | 'free'

type TemplateCounts = {
  all: number
  premium: number
  free: number
}

const TemplateFilterContext = createContext<{
  filter: FilterType
  setFilter: (filter: FilterType) => void
  registerTemplate: (id: string, protemplate: boolean) => void
  unregisterTemplate: (id: string) => void
  counts: TemplateCounts
}>({
  filter: 'all',
  setFilter: () => {},
  registerTemplate: () => {},
  unregisterTemplate: () => {},
  counts: { all: 0, premium: 0, free: 0 },
})

export function useTemplateFilter() {
  return useContext(TemplateFilterContext)
}

export function TemplateFilterProvider({ children }: { children: React.ReactNode }) {
  let [filter, setFilter] = useState<FilterType>('all')
  let [counts, setCounts] = useState<TemplateCounts>({ all: 0, premium: 0, free: 0 })
  let templatesRef = useRef<Map<string, boolean>>(new Map())

  let updateCounts = useCallback(() => {
    let premium = 0
    let free = 0
    templatesRef.current.forEach((protemplate) => {
      if (protemplate) premium++
      else free++
    })
    setCounts({ all: premium + free, premium, free })
  }, [])

  let registerTemplate = useCallback((id: string, protemplate: boolean) => {
    templatesRef.current.set(id, protemplate)
    updateCounts()
  }, [updateCounts])

  let unregisterTemplate = useCallback((id: string) => {
    templatesRef.current.delete(id)
    updateCounts()
  }, [updateCounts])

  return (
    <TemplateFilterContext.Provider value={{ filter, setFilter, registerTemplate, unregisterTemplate, counts }}>
      {children}
    </TemplateFilterContext.Provider>
  )
}

const filters: { value: FilterType; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'premium', label: 'Premium' },
  { value: 'free', label: 'Free' },
]

export function PremiumBanner() {
  let { filter, counts } = useTemplateFilter()

  let extraCount = TOTAL_PREMIUM_TEMPLATES - counts.premium

  if (filter !== 'premium' || extraCount <= 0) {
    return null
  }

  return (
    <div className="mx-auto mb-12 max-w-7xl px-6 lg:flex lg:px-8">
      <div className="lg:ml-96 lg:flex lg:w-full lg:justify-end lg:pl-32">
        <div className="mx-auto max-w-lg lg:mx-0 lg:w-0 lg:max-w-xl lg:flex-auto">
          <Link
            href="https://pro.lndevui.com/templates"
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-2xl border border-gray-200 bg-linear-to-br from-gray-50 to-white p-5 transition-colors hover:border-gray-300 hover:bg-gray-50 dark:border-white/10 dark:from-white/5 dark:to-transparent dark:hover:border-white/20 dark:hover:bg-white/5"
          >
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              Discover the {TOTAL_PREMIUM_TEMPLATES} premium templates
              <span className="font-normal text-gray-500 dark:text-white/60">
                {' '}
                ({counts.premium} here + {extraCount} more)
              </span>
            </p>
            <p className="mt-1 text-xs text-gray-600 dark:text-white/60">
              Get the full collection on{' '}
              <span className="text-gray-900 underline decoration-dotted underline-offset-2 group-hover:decoration-solid dark:text-white">
                pro.lndevui.com/templates
              </span>
              <span aria-hidden="true" className="ml-1 inline-block transition-transform group-hover:translate-x-0.5">→</span>
            </p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export function TemplateFilterButtons() {
  let { filter, setFilter, counts } = useTemplateFilter()

  let displayCounts: TemplateCounts = {
    premium: TOTAL_PREMIUM_TEMPLATES,
    free: counts.free,
    all: TOTAL_PREMIUM_TEMPLATES + counts.free,
  }

  return (
    <div className="mx-auto max-w-7xl px-6 lg:flex lg:px-8 absolute top-8 sm:top-12 left-0 right-0 z-10">
      <div className="lg:ml-96 lg:flex lg:w-full lg:justify-end lg:pl-32">
        <div className="mx-auto max-w-lg lg:mx-0 lg:w-0 lg:max-w-xl lg:flex-auto">
          <div className="flex gap-2">
            {filters.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setFilter(value)}
                className={clsx(
                  'rounded-full px-3 py-1 text-xs font-medium transition-colors',
                  filter === value
                    ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700',
                )}
              >
                {label} ({displayCounts[value]})
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
