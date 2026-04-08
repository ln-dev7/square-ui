import { type Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'License',
  description:
    'ln-dev UI License — Terms and conditions for using Square UI components and templates.',
}

export default function LicensePage() {
  const currentYear = new Date().getFullYear()

  return (
    <div className="relative flex items-center justify-center px-4 py-10">
      <div className="mx-auto max-w-2xl lg:max-w-none">
        <article className="pb-16">
          <header className="flex flex-col">
            <h1 className="mt-6 font-display text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
              <Link
                href="/"
                className="text-sky-500 hover:underline mr-2"
              >
                Square UI
              </Link>
              License
            </h1>
            <p className="mt-4 text-sm/6 text-gray-500 dark:text-gray-400">
              Copyright &copy; {currentYear}{' '}
              <Link
                href="https://lndev.me"
                target="_blank"
                className="text-sky-500 hover:underline"
              >
                lndev
              </Link>
            </p>
          </header>

          <div className="mt-10 space-y-8 text-sm/7 text-gray-700 dark:text-gray-300">
            <p>
              Permission is granted to any individual or company that has
              obtained a valid copy of this software (the &quot;Components&quot;
              and &quot;Templates&quot;) to use them in personal and commercial
              projects.
            </p>

            <div>
              <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                You are allowed to:
              </h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-gray-400 dark:marker:text-gray-600">
                <li>
                  Use the Components and Templates to build unlimited personal
                  or commercial projects
                </li>
                <li>
                  Modify the Components and Templates to create derivative works
                </li>
                <li>
                  Use them in SaaS applications, websites, or client projects
                </li>
                <li>
                  Sell end products that are built using these Components and
                  Templates
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                You are NOT allowed to:
              </h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-gray-400 dark:marker:text-gray-600">
                <li>
                  Redistribute, share, or publish the Components or Templates
                  (or any derivatives) as standalone resources
                </li>
                <li>
                  Create or distribute a UI kit, component library, template
                  collection, or design system based on these Components or
                  Templates
                </li>
                <li>
                  Make the Components or Templates available in any repository,
                  marketplace, or website (free or paid)
                </li>
                <li>
                  Create a product whose primary purpose is to allow others to
                  build using these Components or Templates
                </li>
                <li>
                  Use the Components or Templates in a way that competes with
                  ln-dev UI or Square UI
                </li>
              </ul>
            </div>

            <p>
              An &quot;End Product&quot; is defined as a final application,
              website, or software where the Components or Templates are
              integrated and not the primary value being redistributed.
            </p>

            <p className="font-medium text-gray-900 dark:text-white">
              All rights not explicitly granted are reserved.
            </p>

            <p className="text-xs/6 tracking-wide text-gray-500 uppercase dark:text-gray-400">
              THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF
              ANY KIND.
            </p>
          </div>
        </article>
      </div>
    </div>
  )
}
