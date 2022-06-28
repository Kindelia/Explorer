import type { AppProps } from 'next/app'
import Head from 'next/head'

import '@kindelia/lib/ui/globals.css'
import { Main } from '@kindelia/lib/ui'
import { Header } from '@/components/Header'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Kindelia Sale</title>
      </Head>
      <>
        <Header />
        <Component {...pageProps} />
      </>
    </>
  )
}

export default MyApp
