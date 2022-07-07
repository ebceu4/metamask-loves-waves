import type { NextPage } from 'next'
import dynamic from 'next/dynamic'

const PageWithNoSSR = dynamic(() => import('components/Page'), {
  ssr: false
})

const Home: NextPage = () => {
  return (
    <PageWithNoSSR />
  )
}

export default Home