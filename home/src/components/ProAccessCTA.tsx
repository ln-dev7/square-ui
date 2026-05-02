'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

function ArrowUpRightIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  )
}

function CheckIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

function CloseIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}

const PRO_BENEFITS = [
  'Source code for both Radix UI and Base UI variants',
  'Detailed AI Guide — drop-in CLAUDE.md / AGENTS.md per template',
  'Most templates ship with multiple fully built pages',
  '42 built-in color themes',
  'Commercial license for unlimited personal and client projects',
  'Lifetime updates with every new template added',
  'Direct support for ln-dev open source initiatives',
]

const BUY_URL = 'https://lndev.mychariow.shop/prd_ac6igu'
const PRICE = '$169'

export function ProAccessCTA() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('keydown', onKey)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  return (
    <>
      <div className="mt-6 flex flex-col items-center gap-3 lg:items-start">
        <Link
          href="https://pro.lndevui.com/pricing"
          target="_blank"
          className="relative isolate inline-flex items-center justify-center gap-2 rounded-full border border-amber-500/80 bg-amber-400 px-4 py-2 text-sm font-semibold text-amber-950 shadow transition-colors before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-amber-400 before:shadow after:absolute after:inset-0 after:-z-10 after:rounded-full hover:after:bg-white/25"
        >
          <span>Square UI Pro : Get Full Access • {PRICE}</span>
          <ArrowUpRightIcon className="size-4" />
        </Link>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="text-xs font-medium text-amber-300 underline decoration-amber-400/60 underline-offset-4 transition-colors hover:text-amber-200 hover:decoration-amber-300 lg:ml-4"
        >
          Why Square UI Pro?
        </button>
      </div>

      {isOpen && mounted && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="pro-modal-title"
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6"
        >
          <div
            aria-hidden="true"
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
          />
          <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-zinc-900 p-6 shadow-2xl sm:p-7">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close"
              className="absolute right-3 top-3 rounded-full p-1.5 text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
            >
              <CloseIcon className="size-4" />
            </button>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-300">
              Square UI Pro
            </div>
            <h2
              id="pro-modal-title"
              className="mt-3 font-display text-2xl font-light text-white"
            >
              Why upgrade to Pro?
            </h2>
            <p className="mt-2 text-sm/6 text-gray-400">
              The free pack gets you started. Pro is what you reach for when
              you&apos;re shipping real client work — more templates, both
              variants, full pages, and a license to ship.
            </p>
            <ul className="mt-5 space-y-2.5">
              {PRO_BENEFITS.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-start gap-2.5 text-sm/6 text-gray-200"
                >
                  <CheckIcon className="mt-1 size-3.5 flex-none text-amber-400" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            <Link
              href={BUY_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="relative isolate mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border border-amber-500/80 bg-amber-400 px-4 py-2.5 text-sm font-semibold text-amber-950 shadow transition-colors before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-amber-400 before:shadow after:absolute after:inset-0 after:-z-10 after:rounded-full hover:after:bg-white/25"
            >
              <span>Get Full Access — {PRICE}</span>
              <ArrowUpRightIcon className="size-4" />
            </Link>
            <p className="mt-3 text-center text-xs text-gray-500">
              One-time payment · Lifetime updates
            </p>
            <div className="mt-4 text-center">
              <Link
                href="https://pro.lndevui.com/templates"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-300 underline decoration-amber-400/60 underline-offset-4 transition-colors hover:text-amber-200 hover:decoration-amber-300"
              >
                Browse all templates
                <ArrowUpRightIcon className="size-3" />
              </Link>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  )
}
