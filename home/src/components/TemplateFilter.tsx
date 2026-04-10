'use client'

import { createContext, useContext, useState } from 'react'
import clsx from 'clsx'

type FilterType = 'all' | 'premium' | 'free'

const TemplateFilterContext = createContext<{
  filter: FilterType
  setFilter: (filter: FilterType) => void
}>({
  filter: 'all',
  setFilter: () => {},
})

export function useTemplateFilter() {
  return useContext(TemplateFilterContext)
}

export function TemplateFilterProvider({ children }: { children: React.ReactNode }) {
  let [filter, setFilter] = useState<FilterType>('all')

  return (
    <TemplateFilterContext.Provider value={{ filter, setFilter }}>
      {children}
    </TemplateFilterContext.Provider>
  )
}

const filters: { value: FilterType; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'premium', label: 'Premium' },
  { value: 'free', label: 'Free' },
]

export function TemplateFilterButtons() {
  let { filter, setFilter } = useTemplateFilter()

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
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
