import type { AppProps } from 'next/app'
import Head from 'next/head'

import '@kindelia/lib/ui/globals.css'
import { Main } from '@kindelia/lib/ui'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Main>
      <Head>
        <title>Kindelia Sale</title>
      </Head>
      <Component {...pageProps} />
    </Main>
  )
}

export default MyApp
