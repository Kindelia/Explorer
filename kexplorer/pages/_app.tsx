import type { AppProps } from 'next/app'
import Head from 'next/head'

import Navbar from '@/components/Navbar/'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import '@kindelia/lib/ui/globals.css'
import '@/styles/utils.css'
import '@/styles/statement.css'

config.autoAddCss = false

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-white dark:bg-black">
      <Navbar />
      <div className="mx-auto max-w-full lg:max-w-4xl p-2 sm:p-5">
        <Head>
          <title>Kind Explorer</title>
          <link rel="shortcut icon" href="/kindelia_icon.svg" />
        </Head>
        <Component {...pageProps} />
      </div>
    </div>
  )
}

export default MyApp
