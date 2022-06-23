import type { AppProps } from 'next/app'
import Head from 'next/head'

import '@kindelia/lib/ui/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-white dark:bg-black">
      <div className="mx-auto max-w-full lg:max-w-4xl p-2 sm:p-5">
        <Head>
          <title>Kind Sale</title>
        </Head>
        <Component {...pageProps} />
      </div>
    </div>
  )
}

export default MyApp
