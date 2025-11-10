import nextMDX from '@next/mdx'

import { recmaPlugins } from './mdx/recma.mjs'
import { rehypePlugins } from './mdx/rehype.mjs'
import { remarkPlugins } from './mdx/remark.mjs'

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins,
    rehypePlugins,
    recmaPlugins,
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  webpack: (config, { isServer }) => {
    // Ignorer le dossier registry-files lors du build
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ['**/node_modules', '**/public/registry-files'],
    }
    return config
  },
}

export default withMDX(nextConfig)
