import { Layout } from '@/components/Layout'
import { IconLink } from '@/components/IconLink'

export default function NotFound() {
  return (
    <Layout>
      <div className="flex w-full items-end flex-col justify-center p-10">
        <h1 className="text-4xl font-bold">404</h1>
        <IconLink href="/" className="mt-4">
          Go back home
        </IconLink>
      </div>
    </Layout>
  )
}

